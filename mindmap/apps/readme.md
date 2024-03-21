# App이란?

Nx 모노리포 상에서 app이란 library 패키지들을 재사용 + 특화된 로직을 탑재해 실제 서비스를 만드는 것입니다.

# 시작 방법

1. Nx를 통해 앱을 생성한다.

```
nx g @nrwl/nest:app <앱이름>/backend
nx g @nrwl/next:app <앱이름>/frontend
```

1. VSCode상에서 <앱이름>-backend를 검색하여 모두 <앱이름>/backend로 변경한다. (Devops편의를 위해)
2. VSCode상에서 <앱이름>-frontend를 검색하여 모두 <앱이름>/frontend로 변경한다. (Devops편의를 위해)
3. 최상단 tsconfig.base.json에서 다음 내용을 paths에 추가한다.

```
"@<앱이름>/backend/*": ["apps/<앱이름>/backend/*"],
"@<앱이름>/frontend/*": ["apps/<앱이름>/frontend/*"],
```

4. 테스트로 백엔드와 프론트엔드를 실행시켜본다.

```
nx serve <앱이름>/backend
nx serve <앱이름>/frontend
```

5. [Codegen](../libs/codegen/src/generators/service/schema.json)의 "properties.modulePath.x-prompt.items"에 앱을 등록한다.

```
{
    "value": "apps/<앱이름>/backend/src/module",
    "label": "<앱이름>/backend"
},
```

6. Codegen으로 서비스 템플릿을 생성한다.

```
nx g @codegen:service
```

# FAQ

- 코드를 App에 넣어야할지, Lib에 넣어야 할지 모르겠어요. => 소스코드를 app <-> lib 간 이전을 어렵지 않으므로, 크게 고민할 필요는 없음. 일반적인 프로그램들이 많이 사용하는 영역이라면 Lib상에 배치하도록 노력이 필요함.
- 생성한 앱을 지우고 싶을 때는 어케하나요 => 다음 코드를 실행합니다.

```
nx g rm <해당 이름>
```
