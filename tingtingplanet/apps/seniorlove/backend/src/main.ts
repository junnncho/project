import { AppModule, BatchAppModule } from "./module/app.module";
import { NestFactory } from "@nestjs/core";
import { boot, bootBatch } from "@shared/util-server";
import { environment } from "./environments/environment";

const bootstrap = async () => {
  const serverMode = process.env.SERVER_MODE as "federation" | "batch" | "socket" | "all" | null;
  if (serverMode === "federation") {
    const app = await NestFactory.create(AppModule.register(environment));
    await boot(app, environment);
    //* 모든 course 수정
    // const courseService = app.get<CourseService>(CourseService);
    // const courses = await courseService.list({});
    // for (let i = 0; i < courses.length; i++) {
    //   console.log("=======i", i);
    //   const course = courses[i];
    //   const { studyNum, examNum, toonNum } = await courseService.getNumOfLearns(course);
    //   const firstLearn = await courseService.getFirstLearn(course);
    //   await course.merge({ ...course, studyNum, examNum, toonNum, firstLearn }).save();
    // }
    //* study 1개 포함된 course 추가 (100개)
    // const courseService = app.get<CourseService>(CourseService);
    // const studyService = app.get<StudyService>(StudyService);
    // const studies = await studyService.list({});
    // for (let i = 0; i < studies.length; i++) {
    //   console.log("=======i", i);
    //   await courseService.create({
    //     title: `only study - ${studies[i].title}`,
    //     author: studies[i].author,
    //     learns: [{ type: "study", study: studies[i]._id }],
    //   });
    // }
  } else if (serverMode === "batch") {
    const app = await NestFactory.create(BatchAppModule.register(environment));
    await bootBatch(app, environment);
    // } else if (serverMode === "socket") {
    //   const app = await NestFactory.create(AppModule.register(environment));
    // await bootSocket(app, environment);
  } else if (serverMode === "all") {
    const app = await NestFactory.create(BatchAppModule.register(environment));
    await boot(app, environment);
  } else throw new Error("SERVER_MODE environment variable is not defined");
};

bootstrap();
