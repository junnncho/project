import { Inject, Injectable } from "@nestjs/common";
// import * as dto from "./ipfs.dto";
import { IpfsOptions } from "../option";
import { LogService } from "@shared/util-server";

@Injectable()
export class IpfsService extends LogService {
  constructor(@Inject("IPFS_OPTIONS") private options: IpfsOptions) {
    super(IpfsService.name);
  }
  getHttpsUri(uri: string) {
    return uri.replace("ipfs://", `${this.options.endpoint}/`);
  }
}
