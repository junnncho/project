import * as gql from "../gql";
import { Allow, BaseResolver } from "@shared/util-server";
import { Args, ID, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { FileService } from "../file/file.service";
import { ProductService } from "./product.service";
import { UseGuards } from "@nestjs/common";

@Resolver(() => gql.Product)
export class ProductResolver extends BaseResolver(
  gql.Product,
  gql.ProductInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(private readonly productService: ProductService, private readonly fileService: FileService) {
    super(productService);
  }
  @Mutation(() => [gql.File])
  @UseGuards(Allow.Admin)
  async addProductFiles(
    @Args({ name: "files", type: () => [gql.FileUpload] })
    files: gql.FileUpload[],
    @Args({ name: "productId", type: () => ID, nullable: true })
    productId?: string
  ) {
    return await this.fileService.addFiles(files, "product", productId);
  }
  @ResolveField(() => gql.File)
  async image(@Parent() product: gql.Product) {
    return await this.fileService.load(product.image);
  }
}
