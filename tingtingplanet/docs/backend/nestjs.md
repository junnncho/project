# [Nestjs](https://docs.nestjs.com/)란?

모듈 기반으로 이루어진 Javascript 백엔드 프레임워크로, 확장성이 매우 높은 편임.
TingTing에서는 각종 시스템을 모듈 기반으로 구성하여 재사용성과 테스트하기 쉬운 구조로 만드는 데 사용함.
데코레이터 문법을 기반으로 작동하며, 다음 내용을 참고하기 바람.

# 서버부팅

[Nest기반 서버 부팅](../../libs/shared/util-server/src/boot.ts)

# 파일 구조

모듈

### [admin.gql.ts](../../libs/shared/module/src/admin/admin.gql.ts)

graphQL + MongoDB 스키마를 설계하는 부분으로, 가장 먼저 구현되는 부분. 데이터의 형태를 정의하게 된다.

### [admin.sample.ts](../../libs/shared/module/src/admin/admin.sample.ts)

테스트용으로 사용하기 위해 샘플데이터 생성 로직을 제작한다.

### [admin.model.ts](../../libs/shared/module/src/admin/admin.model.ts)

데이터를 위한 유틸리티 함수를 작성한다. 유틸리티 함수로써는 [Methods, Statics, QryHelps](https://medium.com/@omnyx2/mongoose-node-mongodb-%EC%82%AC%EC%9A%A9%EA%B8%B0-2%ED%8E%B8-instance-methods-62b5a1e67c07)가 존재한다.

### [admin.service.ts](../../libs/shared/module/src/admin/admin.service.ts)

실제 비즈니스 로직을 작성한다.

### [admin.module.ts](../../libs/shared/module/src/admin/admin.module.ts)

이하 내용들을 모두 합쳐 하나의 모듈화를 진행한다. env 설정이 필요한 경우 [register](../../libs/shared/module/network/../src/network/network.module.ts)를 진행한다.

### [admin.service.spec.ts](../../libs/shared/module/src/admin/admin.service.spec.ts)

해당 모듈의 비즈니스 로직의 테스트코드를 작성한다. TDD로 작성하고 진행해도 좋음.

### [admin.readme.md](../../libs/shared/module/src/admin/admin.readme.md)

[작성 필요]
