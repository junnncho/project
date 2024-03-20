import * as Product from "./product.model";
import * as gql from "../gql";
import { FileService } from "../file/file.service";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { LoadService } from "@shared/util-server";
@Injectable()
export class ProductService extends LoadService<Product.Mdl, Product.Doc, Product.Input> {
  constructor(
    @InjectModel(Product.name)
    private readonly Product: Product.Mdl,
    private readonly fileService: FileService
  ) {
    super(ProductService.name, Product);
  }
  //!remove시 유저 인벤토리에서 삭제 필요
  async summarize(): Promise<gql.ProductSummary> {
    return {
      totalProduct: await this.Product.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }
}
