import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log("hello");
    return { message: "Hello API" };
  }
}
