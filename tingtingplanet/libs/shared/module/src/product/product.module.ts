import * as Product from "./product.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Product.name, useFactory: Product.middleware() }])],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
