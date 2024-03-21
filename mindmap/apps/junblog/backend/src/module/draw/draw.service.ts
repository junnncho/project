import * as Draw from './draw.model';
import { Id, LoadService } from '@nogql/util-server';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UpdateDrawDto } from './draw.controller';
import { UserService } from '../srv';

interface addFileBody {
  dataURL: string;
  mimeType: string;
  id: string;
  created: number;
  lastRetrieved?: number;
}

@Injectable()
export class DrawService extends LoadService<Draw.Mdl, Draw.Doc> {
  constructor(
    @InjectModel(Draw.name)
    private readonly Draw: Draw.Mdl,
    private readonly userService: UserService
  ) {
    super(DrawService.name, Draw);
  }

  async getDraw(userId: Id, node: string): Promise<Draw.Doc> {
    const result = await this.Draw.findOne({ user: userId, node });
    if (!result) throw new Error('noDraw');
    return result;
  }

  async updateDraw(userId: Id, body: UpdateDrawDto): Promise<void> {
    if (body.elements.length === 0) throw new Error('emptyNodes');
    console.log(body.node);
    await this.Draw.updateOne({ user: userId, node: body.node }, body, { upsert: true });
  }

  async addFile(userId: Id, node: string, body: addFileBody): Promise<void> {
    console.log('ADD', body);
    await this.Draw.updateOne({ user: userId, node }, { $push: { files: body } });
  }
}
