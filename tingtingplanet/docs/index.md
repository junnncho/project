# (작성중)

# 문서 개요

확장가능하고 재사용가능한 코드 시스템을 만들어 매 번 실패하는 서비스를 만들어도 다음 재시작의 도움이 되는 구조를 만들고자 합니다.

TingTing 시스템은 다음과 같은 스택을 사용합니다. 시스템은 운영하기 위해서는 다음과 같은 지식을 갖추어 운영해야함. 아래 스택에 대한 지식이 없거나 부족하다면 풀스택 개발자가 아닌 수준이니 공부 열심히 해야합니다.

- 공통: Typescript, Apollo GraphQL
- 웹: React, Next.js, tailwindcss, zustand
- 앱: React Native
- 서버: Nest.js, MongoDB
- 데브옵스: Docker, Jenkins, Github, Nx

# Current Version

현재 시스템은 지속적으로 개선중이며, 구성된 구조는 다음과 같습니다.
프로그램 구조는 1)스타일링, 2)상태관리, 3)비즈니스 로직, 4)데이터베이스 모델, 5)유틸리티,로 나뉘어 운영됩니다.

# 코딩 규칙

- 각자 fork한 개인 레포에서 작업중인 브랜치(debug, feature/... 등)에서 upstream인 tingting/junnncho:debug 브랜치로 PR을 생성 후 작업한다.
- 생성 후 자주 커밋로그를 origin에 올리고, github상에 코멘트를 통해 코드 퀄리티, 로직 등과 관련된 의사소통을 한다.

# 필수 정독 리스트

- [Nx Docs](https://nx.dev/getting-started/intro)
- [Apollo GraphQL](https://www.apollographql.com/docs/)
- [Type Challenge](https://github.com/type-challenges/type-challenges)
- [React](https://reactjs.org/docs/getting-started.html)
- [Tailwind](https://tailwindcss.com/docs/installation)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Nestjs](https://docs.nestjs.com/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [MongoDB](https://www.mongodb.com/docs/manual/introduction/)
- 국내 유튜버: [노마드코더](https://www.youtube.com/@nomadcoders), [코딩애플](https://www.youtube.com/@codingapple)
- 해외 유튜버: [Fireship](https://www.youtube.com/@Fireship)

# 심화 정독 리스트

- 해외 유튜버: [Theo](https://www.youtube.com/@t3dotgg), [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified), [Nana](https://www.youtube.com/@TechWorldwithNana)
