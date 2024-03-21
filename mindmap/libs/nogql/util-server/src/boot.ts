import { auth } from "./middlewares/authentication";
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
declare const module: any;

export const boot = async (app: INestApplication, options) => {
  //   if (options.globalPrefix) app.setGlobalPrefix(options.globalPrefix);
  const urls = options.environment.serves.map((item:string)=>(item==="localhost") ? "http://localhost:4200" : `https://${item}`)
  app.enableCors({
    origin: urls,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders:
      "DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,signmessage,signchain,signaddress,geolocation",
  });
  app.use(cookieParser());
  //   const authMiddleware = new AuthMiddleware(options.security.jwtSecret);
  //   console.log("!!!!")
  app.use(auth(options.security.jwtSecret));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis(`redis://${options.redis.host}:${options.redis.port}`);
  // app.useWebSocketAdapter(redisIoAdapter);
  const port = options.port;
  await app.listen(port);
  Logger.log(`🚀 Server is running on: ${await app.getUrl()}`);
};

export const bootBatch = async (app: INestApplication, options) => {
  // TODO: 여러 개 서버가 켜지면 하나만 작동하는 기능 구현
  await app.init();
  Logger.log(`🚀 Batch Server is running`);
};
