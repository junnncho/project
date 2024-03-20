import {
  BaseGql,
  Field,
  InputType,
  Int,
  ObjectType,
  PickType,
  ProtoFile,
  createGraphQL,
} from "@shared/util-client";

@InputType("FileInput")
export class FileInput {}

@ObjectType("File", { _id: "id" })
export class File extends BaseGql(FileInput) implements ProtoFile {
  @Field(() => String)
  filename: string;

  @Field(() => [Int])
  imageSize: [number, number];

  @Field(() => String)
  url: string;
}
@ObjectType("LightFile", { _id: "id", gqlRef: "File" })
export class LightFile extends PickType(File, ["filename", "imageSize", "url"] as const) {}

@ObjectType("FileSummary")
export class FileSummary {
  @Field(() => Int)
  totalFile: number;
}

export const fileQueryMap = {
  totalFile: { status: { $ne: "inactive" } },
};

export const fileGraphQL = createGraphQL("file" as const, File, FileInput, LightFile);
export const {
  getFile,
  listFile,
  fileCount,
  fileExists,
  createFile,
  updateFile,
  removeFile,
  fileFragment,
  purifyFile,
  crystalizeFile,
  lightCrystalizeFile,
  defaultFile,
  mergeFile,
} = fileGraphQL;
