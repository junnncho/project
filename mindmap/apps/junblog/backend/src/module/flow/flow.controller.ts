import { Controller, Injectable } from '@nestjs/common';
import { KeyringService } from '@nogql/module/srv';
import { FlowService } from './flow.service';

// export class NewNodePostDto {
//   @IsString()
//   label: string;

//   @IsNotEmpty()
//   @IsIn(cnst.flowStatuses)
//   type: cnst.FlowStatus;

//   @IsNotEmpty()
//   @IsInt()
//   goal: number;

//   @IsMongoId()
//   parentNode?: Id;

//   @IsArray()
//   @ArrayNotEmpty()
//   @IsInt({ each: true })
//   @ArrayMinSize(2)
//   @ArrayMaxSize(2)
//   position: [number, number];
// }

@Injectable()
@Controller('node')
export class FlowController {
  constructor(private readonly keyringService: KeyringService, private readonly flowService: FlowService) {}

  // @Post("new")
  // @UseGuards(Allow.User)
  // async newNode(@RequiredAuth() account: Account, @Body() body: NewNodePostDto) {
  //   const node = await this.nodeService.addNode(account._id, body);
  //   const edge = body.parentNode && await this.edgeService.addEdge(account._id, body.parentNode, node._id);
  //   return node;
  // }

  // @Get("get")
  // @UseGuards(Allow.User)
  // async getNodes(
  //   @RequiredAuth()
  //   account: Account
  // ) {
  //   return await this.nodeService.getNodes(account._id);
  // }
}
