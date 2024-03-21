import { Doc as Betting } from '../module/betting/betting.model';
import { Doc as Game } from '../module/game/game.model';
export const dashboardFilter = async (b: Betting, g: Game) =>
  await b.merge({ choice: 'HIGH' }).save();
