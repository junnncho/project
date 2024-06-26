// import { FileStream, LocalFile, OpenSeaMeta } from "../gql";
import { Id, LoadService } from '@nogql/util-server';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSize = require('image-size');
const sizeOf = promisify(imageSize);
import * as File from './file.model';
import * as fs from 'fs';
import * as model from '../model';
import sharp = require('sharp');
import { S3Service } from '../s3/s3.service';
import { Utils } from '@nogql/util';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class FileService extends LoadService<File.Mdl, File.Doc> {
  localDir = `./data`;
  constructor(@InjectModel(File.name) private readonly File: File.Mdl, private readonly s3Service: S3Service) {
    super(FileService.name, File);
  }
  async generate(): Promise<File.Doc> {
    const fileStream = (): model.FileStream => ({
      filename: 'sample.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      createReadStream: () => fs.createReadStream(`./libs/nogql/module/src/file/sample.jpg`),
    });
    return (
      (await this.File.findOne({ filename: 'sample.jpg' })) ??
      (await this.#addFile(fileStream(), 'generate', 'generate'))
    );
  }
  async addFiles(fileStreams: model.FileStream[], purpose: string, group = 'default'): Promise<File.Doc[]> {
    const files = await Promise.all(
      fileStreams.map(async (fileStream) => await this.#addFile(fileStream, purpose, group))
    );
    return files;
  }
  async addFileFromUri(
    uri: string,
    purpose: string,
    group: string,
    header: AxiosRequestConfig = {},
    forceUpdate = false
  ): Promise<File.Doc | null> {
    try {
      const file = forceUpdate && (await this.File.findOne({ origin: uri }));
      if (file) return file;
      const localFile = await this.saveImageFromUri(uri, { header });
      return await this.addFileFromLocal(localFile, purpose, group, uri);
    } catch (err) {
      this.logger.warn(`Failed to add file from URI - ${uri}`);
      return null;
    }
  }

  async sliceImage(fileId: Id, tileSize: number, purpose: string, group: string) {
    const file = await this.File.pickById(fileId);
    const [xNum, yNum] = [Math.floor(file.imageSize[0] / tileSize), Math.floor(file.imageSize[1] / tileSize)];
    if (!file.imageSize[0] || !file.imageSize[1] || !xNum || !yNum) throw new Error('Image Size is Not Detected');
    else if (xNum * yNum > 100) throw new Error('Too many tiles');
    const localFile = await this.saveImageFromUri(file.url);
    const extension = `.${localFile.localPath.split('.').at(-1)}`;
    const files: File.Doc[][] = await Promise.all(
      Array.from(Array(yNum).keys()).map(async (y) => {
        return await Promise.all(
          Array.from(Array(xNum).keys()).map(async (x) => {
            const filename = localFile.filename.replace(extension, `-${x}-${y}${extension}`);
            const localPath = localFile.localPath.replace(extension, `-${x}-${y}${extension}`);
            await sharp(localFile.localPath)
              .extract({
                left: x * tileSize,
                top: y * tileSize,
                width: tileSize,
                height: tileSize,
              })
              .toFile(localPath);
            const file: File.Doc = await this.addFileFromLocal({ ...localFile, filename, localPath }, purpose, group);
            return file;
          })
        );
      })
    );
    return files;
  }
  async #addFile(fileStream: model.FileStream, purpose: string, group: string | null) {
    const localFile = await this.#saveLocalStorage(fileStream);
    return await this.addFileFromLocal(
      localFile,
      purpose?.length ? purpose : 'default',
      group?.length ? group : 'default'
    );
  }

  async resolveUrl(fileId: Id): Promise<string | undefined> {
    const file = await this.load(fileId);
    return file?.url;
  }

  async addFileFromLocal(
    localFile: model.LocalFile,
    purpose: string,
    group = 'default',
    origin?: string
  ): Promise<File.Doc> {
    const url = await this.s3Service.uploadFile({
      path: `${purpose}/${group}/${localFile.filename}`,
      localPath: localFile.localPath,
    });
    const { width, height } = localFile.mimetype.includes('image')
      ? await sizeOf(localFile.localPath)
      : { width: 0, height: 0 };
    return await this.File.create({
      ...localFile,
      imageSize: [width, height],
      url,
      origin,
    });
  }

  async addFileJustUrl(url: string, name: string, origin?: string): Promise<File.Doc> {
    const width = 0;
    const height = 0;
    return await this.File.create({
      encoding: '7bit',
      mimetype: 'image/remote',
      filename: name,
      imageSize: [width, height],
      url,
      origin,
    });
  }

  async saveImageFromUri(
    uri: string,

    { cache, rename, header }: { cache?: boolean; rename?: string; header?: AxiosRequestConfig } = {}
  ): Promise<model.LocalFile> {
    if (uri.indexOf('data:') === 0) return this.#saveEncodedData(uri);
    const response = await axios.get(uri, {
      ...header,
      responseType: 'stream',
    });
    const filename = rename ?? this.#convertFileName(`${uri.split('/').at(-1)?.split('?')[0]}`);
    // const dirname = `${this.localDir}/uriDownload`;
    const dirname = this.localDir;
    const localPath = `${dirname}/${filename}`;
    if (cache && fs.existsSync(localPath)) return { filename, localPath, mimetype: 'image/png', encoding: '7bit' };
    !fs.existsSync(dirname) && fs.mkdirSync(dirname, { recursive: true });
    const w: fs.ReadStream = response.data.pipe(fs.createWriteStream(localPath));
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject('File Download Timeout'), 60000);
      w.on('finish', () => {
        clearTimeout(timeout);
        resolve({
          filename,
          encoding: '7bit',
          mimetype: this.#getMimetype(filename),
          localPath,
        });
        w.destroy();
      });
    });
  }
  #saveEncodedData(data: string): model.LocalFile {
    const mimetype = data.split(';')[0].replace('data:', '');
    const encoding = data.split(',')[0].split(';')[1] as 'base64' | 'utf-8';
    const encoded = data.split(',')[1];
    const extension = mimetype.split('/')[1].split('+')[0];
    const filename = this.#convertFileName(`${data.slice(-15, 0)}.${extension}`);
    const localPath = `${this.localDir}/uriDownload/${filename}`;
    fs.writeFileSync(localPath, Buffer.from(encoded, encoding).toString());
    return { filename, encoding: '7bit', mimetype, localPath };
  }
  async #saveLocalStorage(file: model.FileStream): Promise<model.LocalFile> {
    const { filename, mimetype, encoding, createReadStream } = await file;
    fs.mkdirSync(this.localDir, { recursive: true });
    const localPath = `${this.localDir}/${filename}`;
    const rename = this.#convertFileName(filename);
    const renamePath = `${this.localDir}/${rename}`;
    const stream = createReadStream();
    stream.pipe(fs.createWriteStream(localPath));
    return new Promise((resolve, reject) => {
      stream.on('end', () => {
        fs.existsSync(localPath) && fs.renameSync(localPath, renamePath);
        resolve({
          filename: rename,
          mimetype,
          encoding,
          localPath: renamePath,
        });
        stream.destroy();
      });
      stream.on('error', (error) => reject(error));
    });
  }
  #convertFileName(filename: string) {
    return `file-${new Date().getTime()}-${filename.slice(filename.length - 15)}`;
  }
  #getMimetype(filename: string) {
    return filename.includes('.png')
      ? 'image/png'
      : filename.includes('.jpg')
      ? 'image/jpeg'
      : filename.includes('.jpeg')
      ? 'image/jpeg'
      : filename.includes('.jfif')
      ? 'image/jfif'
      : filename.includes('.gif')
      ? 'image/gif'
      : 'unknown';
  }
  async migrate(file: File.Doc) {
    const root = this.s3Service.root;
    const localFile = await this.saveImageFromUri(file.url);
    await Utils.sleep(100);
    const cloudPath = file.url.split('/').slice(3).join('/').split('?')[0];
    const path = root ? cloudPath.replace(`${root}/`, '') : cloudPath;
    const url = await this.s3Service.uploadFile({
      path,
      localPath: localFile.localPath,
    });
    return await file.merge({ url }).save();
  }
}
