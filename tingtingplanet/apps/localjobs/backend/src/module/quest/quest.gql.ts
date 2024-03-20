import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/module";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => String)
  @Prop({ type: String, required: true, index: true })
  name: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true, index: true, default: new Date() })
  due: Date;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0 })
  point: number;

  @Field(() => [shared.File], { nullable: true })
  @Prop([{ type: ObjectId, required: true, ref: "file" }])
  thumbnails?: Id[];

  @Field(() => String)
  @Prop({ type: String, required: true, default: "" })
  content: string;

  @Field(() => [shared.File])
  @Prop([{ type: ObjectId, required: true, ref: "file" }])
  contentFiles: Id[];
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {
  @Field(() => [ID])
  contentFiles: Id[];

  @Field(() => [ID])
  thumbnails: Id[];
}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.questStatuses,
    required: true,
    default: "active",
  })
  status: cnst.QuestStatus;
}

// * 최종 생성 모델
@InputType()
export class QuestInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class Quest extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class QuestSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class QuestSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalQuest: number;
}
