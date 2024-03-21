import { cnst, Utils } from '@shared/util';
import { BettingProps } from '../betting/betting.service';
import { HistoryProps } from '../game/game.service';
import { BlockStat } from '../history/history.model';
import { Doc as Betting } from '../betting/betting.model';
import { Doc as User } from '../user/user.model';

export const gameMessage = (
  history: HistoryProps,
  current: BlockStat,
  betting: BettingProps,
  statistic: cnst.MixGameChoice[],
  result?: cnst.MixGameChoice
) => {
  return `<code>= BET ON THE LAST # OF HASH =</code>
<b>              <u> ─ ${
    history.endBlock.blockNumber - current.blockNumber
  } BLOCKS LEFT ─</u></b>

    <b> Start  Block </b>      <b> Current Block </b>
      <code>${history.startBlock.blockNumber}</code>            <code>${
    current.blockNumber
  }</code>
      <b>${history.startBlock.blockHash}</b>            <b>${
    current.blockHash
  }</b>

    <b> Close  Block </b>      <b> Result Block </b>
      <code>${history.closeBlock.blockNumber}</code>            <code>${
    history.endBlock.blockNumber
  }</code>
      <b>${history.closeBlock.blockHash}</b>            <b>${
    history.endBlock.blockHash
  }</b>

<b>    </b><a href="https://www.etherchain.org/blocks">👉Browse The Latest ETH Blocks</a>

<b>${makeGameGraphs(statistic)}</b>

<code>┏――――――――</code><b>Betting Stats</b><code>――――――――┓</code>
<code>   🔵   </code><b>${betting.amount.low}</b><code> SOL   </code><b>${
    betting.people.low
  }</b><code> PEOPLE </code>
<code>   🔴   </code><b>${betting.amount.high}</b><code> SOL   </code><b>${
    betting.people.high
  }</b><code> PEOPLE </code>
<code>   🟢   </code><b>${betting.amount.even}</b><code> SOL   </code><b>${
    betting.people.even
  }</b><code> PEOPLE </code>
<code>   🟡   </code><b>${betting.amount.odd}</b><code> SOL   </code><b>${
    betting.people.odd
  }</b><code> PEOPLE </code>
<code>┗――――――――――――――――――――――――――┛</code>

<b>High / Low RESULT = ${result ? bettingIcon(result[0]) : '?'}</b>
<b>Odd / Even RESULT = ${result ? bettingIcon(result[1]) : '?'}</b>

<code>= = = = BETTING RULES = = = =
🔵LOW :0, 1, 2, 3, 4, 5, 6, 7
🔴HIGH:8, 9, a, b, c, d, e, f</code>

<code>= = = = BETTING RULES = = = =
🟡ODD :1, 3, 5, 7, 9, b, d, f
🟢EVEN:0, 2, 4, 6, 8, a, c, e</code>

<pre>SOLANA</pre>
`;
};

export const spoilerForm = (text: string, spoiler) =>
  `${spoiler ? '<tg-spoiler>' : ''}${text}${spoiler ? '</tg-spoiler>' : ''}`;

interface StatisticProps {
  string: string;
  result: {
    number: { high: number; low: number };
    percent: { high: number; low: number };
  };
}

export const bettingComplete = (betting: Betting) => {
  return `BET SUCCESS : ${bettingIcon(betting.choice)} ${betting.choice}  / ${
    betting.amount
  } SOL`;
};

export const gameResult = (
  betting: Betting,
  user: User,
  result: cnst.GameChoice[],
  profit: number
) => {
  return `<pre>= = = = = = = = = = = = = = =</pre>
RESULT : ${result.includes(betting.choice) ? 'WIN' : 'LOSE'}
<pre>= = = = = = = = = = = = = = =</pre>
<code>Your bet</code> : ${bettingIcon(betting.choice)} ${betting.choice} / ${
    betting.amount
  } SOL
<code>Profits :</code> ${
    result.includes(betting.choice)
      ? Utils.decimalSlice(profit - betting.amount)
      : -betting.amount
  } SOL
<code>Available Balance :</code> ${Utils.decimalSlice(user.point)} SOL
<pre>= = = = = = = = = = = = = = =</pre>`;
};

export const makeStatistic = (statistic: cnst.GameChoice[]): StatisticProps => {
  let string = '';
  statistic.forEach((value, index) => {
    index !== 0 && (string += index % 11 === 0 ? '\n' : '');
    string += value === 'HIGH' ? '🔴' : '🔵';
  });
  const high = statistic.filter((value) => value === 'HIGH').length;
  const low = statistic.filter((value) => value === 'LOW').length;

  const result = {
    number: { high, low },
    percent: {
      high: Utils.decimalSlice((high / (high + low)) * 100, 1),
      low: Utils.decimalSlice((low / (high + low)) * 100, 1),
    },
  };
  return { string, result };
};

const makeGameGraphs = (statistic: cnst.MixGameChoice[]) => {
  const result: [number[], number[]] = [[], []];
  const recent = statistic[0].slice();

  const temp = [0, 0];
  // statistic.forEach((value, index) => {

  for (const value of statistic) {
    if (result[0].length < 11) {
      if (recent[0] === value[0]) {
        temp[0]++;
      } else {
        result[0].push(temp[0]);
        temp[0] = 1;
        recent[0] = value[0];
      }
    }
    if (result[1].length < 11) {
      if (recent[1] === value[1]) {
        temp[1]++;
      } else {
        result[1].push(temp[1]);
        temp[1] = 1;
        recent[1] = value[1];
      }
    }
    if (result[0].length === 11 && result[1].length === 11) {
      break;
    }
  }
  return makeGraph(result, statistic[0].slice());
};

const makeGraph = (result, recent): string => {
  const reverse_recent = [
    recent[0] === 'HIGH' ? 'LOW' : 'HIGH',
    recent[1] === 'ODD' ? 'EVEN' : 'ODD',
  ];
  const reverse_result = [result[0].reverse(), result[1].reverse()];
  const max = [Math.max(...result[0]), Math.max(...result[1])];
  let string = '';
  string += '=  = High / Low CHART =  =';
  for (let line = max[0]; line > 0; line--) {
    string += '\n';
    reverse_result[0].forEach((value, index) => {
      const now = index % 2 === 0 ? recent[0] : reverse_recent[0];
      value >= line ? (string += bettingIcon(now)) : (string += '🦯');
    });
  }
  string += '\n\n=  = Odd / Even CHART =  =';
  for (let line = max[1]; line > 0; line--) {
    string += '\n';
    reverse_result[1].forEach((value, index) => {
      const now = index % 2 === 0 ? recent[1] : reverse_recent[1];
      value >= line ? (string += bettingIcon(now)) : (string += '🦯');
    });
  }
  return string;
};

export const bettingIcon = (choice?: cnst.GameChoice) => {
  switch (choice) {
    case 'HIGH':
      return '🔴';
    case 'LOW':
      return '🔵';
    case 'EVEN':
      return '🟢';
    case 'ODD':
      return '🟡';
    default:
      return '?';
  }
};
