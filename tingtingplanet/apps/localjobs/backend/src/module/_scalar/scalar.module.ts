import { Global, Module } from "@nestjs/common";
@Global()
@Module({
  providers: [],
  // providers: [ProblemResolver, LearnResolver, StudyContentResolver],
})
export class ScalarModule {}
