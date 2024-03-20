# Redis란?

단순히 Key-Value로 저장할 수 있고, 간단한 쿼리 기능을 지원하는 겁나 빠른 인메모리 데이터베이스임.

# 사용법

- docker pull redis
- docker run -d --name redis --port 6379:6379 redis
- docker exec -it redis redis-cli

```
SET testkey testvalue
GET testkey
```

- (종료 시) docker stop redis && docker rm redis
