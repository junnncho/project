import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Utils } from '@shared/util';
import { LoadService } from '@shared/util-server';
import * as History from './history.model';
@Injectable()
export class HistoryService extends LoadService<History.Mdl, History.Doc> {
  constructor(
    @InjectModel(History.name)
    private readonly History: History.Mdl
  ) {
    super(HistoryService.name, History);
  }

  async writeHistory(query: Partial<History.Raw>) {
    await this.History.create(query);
  }

  async getHistorys() {
    const historys = await this.History.find({})
      .sort({ createdAt: 'desc' })
      .limit(50);
    return historys.map((history) => history.result);
  }

  async histories2Xlsx() {
    const historyList = await this.History.find();
    const newHistoryList = historyList.map((history) => {
      return {
        ...history,
        gameId: history.gameId.toString(),
        startBlock: history.startBlock.blockNumber,
        closeBlock: history.closeBlock.blockNumber,
        endBlock: history.endBlock.blockNumber,
        result: history.result.toString(),
      };
    });

    return await Utils.doc2Xlsx(newHistoryList, {
      gameId: 'Game Id',
      createdAt: 'Game End Time',
      result: 'Result',
      startBlock: 'Start BlockNum',
      closeBlock: 'Close BlockNum',
      endBlock: 'End BlockNum',
      win: 'Win Amount(SOL)',
      lose: 'Lose Amount(SOL',
    });
  }
}
