// import { INestApplication, Logger } from '@nestjs/common';
// import { LoggingInterceptor } from './middlewares';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// declare const module: any;

// export const boot = async (app: INestApplication, options) => {
//   // if (options.globalPrefix) app.setGlobalPrefix(options.globalPrefix);
//   app.enableCors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     allowedHeaders:
//       'DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,signmessage,signchain,signaddress,geolocation',
//   });
//   // const redisIoAdapter = new RedisIoAdapter(app);
//   // await redisIoAdapter.connectToRedis(`redis://${options.redis.host}:${options.redis.port}`);
//   // app.useWebSocketAdapter(redisIoAdapter);
//   app.useGlobalInterceptors(new LoggingInterceptor());
//   const config = new DocumentBuilder()
//     .setTitle('Decentverse API')
//     .setDescription('Decentverse API Description')
//     .setVersion('1.0')
//     .addTag('users')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);
//   const port = options.port;
//   await app.listen(port);
//   Logger.log(`🚀 Server is running on: ${await app.getUrl()}`);
// };

// export const bootBatch = async (app: INestApplication, options) => {
//   // TODO: 여러 개 서버가 켜지면 하나만 작동하는 기능 구현
//   await app.init();
//   Logger.log(`🚀 Batch Server is running`);
// };
