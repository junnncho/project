import * as Summary from "./summary.model";
import * as gql from "../gql";
import { AdminService } from "../admin/admin.service";
import { CurrencyService } from "../currency/currency.service";
import { FileService } from "../file/file.service";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { KeyringService } from "../keyring/keyring.service";
import { LoadService } from "@shared/util-server";
import { NotificationService } from "../notification/notification.service";
import { ProductService } from "../product/product.service";
import { ThingService } from "../thing/thing.service";
import { UserService } from "../user/user.service";
@Injectable()
export class SummaryService<
  Mdl extends Summary.Mdl = Summary.Mdl,
  Doc extends Summary.Doc = Summary.Doc,
  Input extends Summary.Input = Summary.Input
> extends LoadService<Mdl, Doc, Input> {
  constructor(
    @InjectModel(Summary.name) private Summary: Mdl,
    private readonly adminService: AdminService,
    private readonly currencyService: CurrencyService,
    private readonly fileService: FileService,
    private readonly keyringService: KeyringService,
    private readonly productService: ProductService,
    private readonly thingService: ThingService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) {
    super(SummaryService.name, Summary);
  }
  async getSharedSummary(): Promise<gql.SummaryInput> {
    return {
      ...(await this.adminService.summarize()),
      ...(await this.notificationService.summarize()),
      ...(await this.currencyService.summarize()),
      ...(await this.fileService.summarize()),
      ...(await this.keyringService.summarize()),
      ...(await this.productService.summarize()),
      ...(await this.thingService.summarize()),
      ...(await this.userService.summarizeShared()),
    };
  }
  async getActiveSummary() {
    return await this.Summary.pickOne({ status: "active" });
  }
}
