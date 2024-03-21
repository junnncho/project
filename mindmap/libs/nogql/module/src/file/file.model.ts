import { Document, Model, Query, Schema as Sch, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { cnst } from '@nogql/util';
import { dbConfig } from '@nogql/util-server';

@Schema()
class Base {
  @Prop({ type: String, required: true, index: true })
  filename: string;

  @Prop({ type: String, required: true })
  mimetype: string;

  @Prop({ type: String, required: true })
  encoding: string;

  @Prop([{ type: Number, required: true }])
  imageSize: number[];

  @Prop({ type: String, required: true, unique: true })
  url: string;

  @Prop({ type: String, required: false, index: true })
  origin?: string;
}
@Schema()
class Tail extends Base {
  @Prop({
    type: String,
    enum: cnst.fileStatuses,
    required: true,
    default: 'active',
  })
  status: cnst.FileStatus;
}

// * 4. 데이터 모니터링을 위한 Summary 모델
@Schema()
export class FileSummary {
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalFile: number;
}

@Schema(dbConfig.defaultSchemaOptions)
class File extends Tail {}
export const name = File.name;
export type Raw = File;
export interface DocType extends Document<Types.ObjectId, QryHelps, Raw>, DocMtds, Omit<Raw, 'id'> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export interface Mdl extends Model<Doc>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> = SchemaFactory.createForClass<Raw, Doc>(
  File
) as any;
schema.index({ filename: 'text' });

/**
 * * 5. 유틸리티 설계: 스키마를 손쉽게 사용할 유틸리티를 작성하세요.
 * ? 도큐먼트의 유틸리티를 위한 document method를 작성하세요.
 * ? 모델의 유틸리티를 위한 model statics를 작성하세요.
 * ? 모델의 유틸리티를 위한 query helpers를 작성하세요.
 */

// * 5. 1. Document Methods
interface DocMtds extends dbConfig.DefaultDocMtds<Doc> {
  dumb: () => Doc;
}
schema.methods.dumb = function (this: Doc) {
  return this;
};

// * 5. 2. Model Statics
interface MdlStats extends dbConfig.DefaultMdlStats<Doc, Raw> {
  dumb: () => Promise<Doc>;
}
schema.statics.dumb = async function () {
  const doc = this.pickOne({});
  return doc;
};

// * 5. 3. Model Statics
interface QryHelps extends dbConfig.DefaultQryHelps<Doc, QryHelps> {
  dumb: () => Query<any, Doc, QryHelps> & QryHelps;
}
schema.query.dumb = function () {
  return this.find({});
};
export const middleware = () => () => {
  /**
   * * 미들웨어 설계: 스키마 데이터 관리 시 사용할 미들웨어를 작성하세요.
   * ? save 시 자동으로 적용할 알고리즘을 적용하세요.
   */
  schema.pre<Doc>('save', async function (next) {
    const model = this.constructor as Mdl;
    if (this.isNew) model.addSummary(['total', this.status]);
    else if (this.status === 'inactive' && this.isModified('status')) model.subSummary(['total', this.status]);
    // else model.moveSummary(this.getChanges().$set?.status, this.status);
    next();
  });
  return schema;
};
