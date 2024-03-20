# MongoDB란?

몽고디비는 NoSQL로 본 프로젝트에서 Primaray DB로 사용하는 데이터베이스임.
Node.js기반 자바스크립트로 코드상에서 스키마 설정이 가능하고, JSON기반으로 데이터를 저장, 입출력할 수 있음.

# 사용법

- docker pull mongo
- docker run -d --name mongo --port 27017:27017 mongo
- docker exec -it mongo mongosh

```
use test
db.createCollection("mymodels")
db.mymodels.create({ name: "foo", age: 10 })
db.mymodels.find({})
```

- (종료 시) docker stop mongo && docker rm mongo

# [MongoDB Compass(GUI)](https://www.mongodb.com/try/download/compass) 설치

- compass 설치 후 localhost에 연결

# 스키마 설계하는 법

## 모델 설계

데이터베이스 모델 설계는 모든 시스템 개발에 있어서 가장 먼저 진행되는 부분으로, 가장 신중히 설계와 개발이 이루어져야함. 이후에 수정하게 되면 들어가는 비용이 매우매우 크게 됨.
모델 설계법: Mongoose 스키마 타입을 기반으로 데코레이터를 설계함. 설계 시 [GraphQL](./graphql.md)과 함께 진행하므로, 이를 참고하여 모델 설계를 진행함.

- [Mongoose 스키마 타입 관련 내용](https://mongoosejs.com/docs/schematypes.html)
- [NestJs MongoDB 관련 내용](https://docs.nestjs.com/techniques/mongodb)

예시

```
@Schema()
class Base {
  @Prop({ type: String, required: true, unique: true, index: true })
  accountId: string;

  @Prop({ type: String, validate: validate.email, required: true, index: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password?: string;
}
```

### 설계 규칙

- Boolean타입은 최대한 사용하지 않는다. 대신, enum 타입 등을 사용한다. [policy 필드 참조](../../libs/social/module/src/board/board.gql.ts)
- 상대적 시간과 관련된 값은 밀리초를 기준으로 사용한다. (재생시간: 60초라면 60000으로 설정)
- [one-to-N 규칙](https://velog.io/@matisse/MongoDB-%EC%8A%A4%ED%82%A4%EB%A7%88-%EB%94%94%EC%9E%90%EC%9D%B8-one-to-N-%EA%B4%80%EA%B3%84-9fu0ttfr)을 따른다.
- Query key로 사용할 필드들에 대해서는 index: true값을 적용한다.
- 변경되면 큰일나는 필드들은 immutable: true를 적용한다.
- 겹치면 큰일나는 필드들은 unique: true를 적용한다.
- 최대한 optional 필드(required: true)는 없앤다. 기본값을 지정하거나, array 형태로 변형하거나
