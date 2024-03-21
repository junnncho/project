import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ReadStream } from "fs";

export type FileStream = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
};
export type LocalFile = {
  filename: string;
  mimetype: string;
  encoding: string;
  localPath: string;
};

export class AccessToken {
  jwt: string;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}

// * OpenSea Attribute Schema Definition

@Schema()
export class AccessStat {
  @Prop({ type: Number, required: true, default: 0 })
  request: number;

  @Prop({ type: Number, required: true, default: 0 })
  device: number;

  @Prop({ type: Number, required: true, default: 0 })
  ip: number;

  @Prop({ type: Number, required: true, default: 0 })
  country: number;
}
export class AccessStatInput extends AccessStat {}
export const AccessStatSchema = SchemaFactory.createForClass(AccessStat);

@Schema()
export class Coordinate {
  @Prop({ type: String, required: true, enum: ["Point"], default: "Point" })
  type: "Point";

  @Prop([{ type: Number, required: true }])
  coordinates: number[];
}

export class CoordinateInput extends Coordinate {}
export const CoordinateSchema = SchemaFactory.createForClass(Coordinate);

@Schema()
export class AccessLog {
  @Prop({ type: Number, required: true, default: 0 })
  period: number;

  @Prop({ type: String, required: false })
  countryCode?: string;

  @Prop({ type: String, required: false })
  countryName?: string;

  @Prop({ type: String, required: false })
  city?: string;

  @Prop({ type: Number, required: false })
  postal?: number;

  @Prop({ type: CoordinateSchema, required: false, index: "2dsphere" })
  location?: Coordinate;

  @Prop({ type: String, required: false })
  ipv4?: string;

  @Prop({ type: String, required: false })
  state?: string;

  @Prop({ type: String, required: false })
  userAgent?: string;

  @Prop({ type: Date, required: true, default: () => new Date() })
  at: Date;
}
export class AccessLogInput extends AccessLog {}
export const AccessLogSchema = SchemaFactory.createForClass(AccessLog);

@Schema()
export class ServiceReview {
  @Prop({ type: Number, min: 0, default: 0, required: true })
  score: number;

  @Prop({ type: String, required: false })
  comment?: string;
}

export class ServiceReviewInput extends ServiceReview {}
export const ServiceReviewSchema = SchemaFactory.createForClass(ServiceReview);
