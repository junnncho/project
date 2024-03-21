# App이란?

Nx 모노리포 상에서 libs란 재사용 가능한 로직과 모델을 탑재해 서비스를 위한 레고블럭을 만듭니다.

# 시작 방법

1. Codegen으로 서비스 템플릿을 생성한다.

```
nx g @codegen:service
```

2. 백엔드 개발 진행 순서

- model.readme.md
- model.gql.ts
- model.service.ts
- model.resolver.ts

3. 프론트엔드 개발 진행순서

- model.gql.ts
- model.locale.ts
- model.slice.ts
- model.store.ts
- Model.Edit.ts
- ... 나머지 모델 컴포넌트
- Page
