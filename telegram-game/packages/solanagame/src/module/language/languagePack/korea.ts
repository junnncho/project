import { cnst, Utils } from '@shared/util';
import { env } from '../../../environments/env';
import { bettingIcon } from '../../game/game.message';
import { Doc as User } from '../../user/user.model';
import { Doc as Betting } from '../../betting/betting.model';
import { messageForm } from './message';
export const buttonPack = {
  mainMenu: '👤 메인 메뉴',
  referral: '🫂 추천',
  deposit: '📥 입금',
  withdraw: '📤 출금',
  help: '❓ 도움말',
  language: '🌐 언어',
  helpMenu1: '1. 게임 방법',
  helpMenu2: '2. 입금 방법',
  helpMenu3: '3. 출금 방법',
  helpMenu4: '4. 수수료 얻는 방법',
  setAddress: '⚙️ 출금 주소 설정',
  withdrawApply: '➡️ 출금',
  back: '< 뒤로',
  depositCheck: '➕ 입금 확인',
  specielReferral: '✍️ 특별 추천 입력',
  levelUp: '🆙 레벨 업',
  exchange: '➡️ 교환',
  goChannel: '👈 게임 채널로 이동',
  referralView: '🫂 추천 개요(xlsx)',
  lev2: '2레벨',
  lev3: '3레벨',
  lev4: '4레벨',
  highProfit: '높은 수익',
  zeroFee: '출금 수수료 없음',
};

export const completeDepositMessage = (amount: number) =>
  messageForm(`입금 확인 완료: ${Utils.decimalSlice(amount)} SOL`);

export const completeWithdrawMessage = (amount: number) =>
  messageForm(`출금 신청 완료: ${Utils.decimalSlice(amount)} SOL`);

export const completeExchangeMessage = (amount: number) =>
  messageForm(`교환 완료: ${Utils.decimalSlice(amount)} SOL`);

export const completeLevelUpMessage = (spend: number, level: number) =>
  messageForm(`지출 ${spend} SOL
레벨 업 완료, 레벨:${level}`);

export const mainWalletMessage = (balance: number, address: string) =>
  messageForm(
    `메인 월렛 <pre>= = = = = = = = = = = = = = =</pre> 메인 월렛 주소: ${address} 메인 월렛 잔액: ${balance} SOL`
  );

export const setAmountMessage = (amount: number) =>
  messageForm(`배팅 단위 설정이 저장되었습니다.
<pre>= = = = = = = = = = = = = = =</pre>
현재 배팅 단위 : ${amount}SOL
<pre>= = = = = = = = = = = = = = =</pre>
  
배팅 금액을 입력해보세요.
최소 : 1 SOL ~ 최대 : 40 SOL
`);

export const dashboardMessage = (user: User) =>
  messageForm(`TID : <tg-spoiler>${user.telegramId}</tg-spoiler>
PNL : <tg-spoiler>${user.win} / ${user.lose} (${Utils.decimalSlice(
    user.win === 0 ? 0 : (user.win / (user.win + user.lose)) * 100
  )}%)</tg-spoiler>
<pre>= = = = = = = = = = = = = = =</pre>
사용 가능한 잔액 : <tg-spoiler>${Utils.decimalSlice(
    user.point
  )}</tg-spoiler> SOL
배팅 단위 : ${user.bettingAmount} SOL
<pre>= = = = = = = = = = = = = = =</pre>
내 추천 코드 : t.me/${env.dashboard}?start=${user.referralCode}

내 수수료 : <tg-spoiler>0.0</tg-spoiler> SOL
내 수수료 비율 : Lv.${user.level}
나의 특기: ${user.specials.join(',')}`);

export const depositMessage = (user: User) =>
  messageForm(`📥 입금 : SOL
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ 사용 가능한 잔액 : ${user.point} SOL
▫️ 추천 잔액 : ${user.referralPoint} SOL
  
▫️ Solana 입금 주소: ${user.gameWallet || '다시 시도해주세요'}
  
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ SOL만 입금해주세요.
  
▫️ SOL을 입금한 후,
➕ 입금 확인 버튼을 클릭해
입금 상태를 확인하세요.
  
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>입금 확인 (Solscan)</a>
  `);

export const depositRootMessage = (user: User) =>
  messageForm(`📥 입금 : SOL(Root 버전)
<pre>= = = = = = = = = = = = = = =</pre>
  
  ▫️ Solana Root 입금 주소:
  ${user.gameWallet || '다시 시도해주세요'}
  
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ SOL만 입금해주세요.

▫️ SOL을 입금한 후,
➕ 입금 확인 버튼을 클릭해
입금 상태를 확인하세요.
  
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>입금 확인 (Solscan)</a>
  `);

export const withdrawMessage = (user: User) =>
  messageForm(`📤 출금 : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ 사용 가능한 잔액 : ${user.point} SOL
▫️ 추천 잔액 : ${user.referralPoint} SOL
  
<pre>= = = = = = = = = = = = = = =</pre>
  
✅ 출금 주소를 등록하세요
(유효한 SOL 주소를 입력해야 합니다.)
  
<pre>= = = = = = = = = = = = = = =</pre>
  
출금 주소는 다음과 같습니다.
${user.myWallet || '아직 등록되지 않았습니다'}`);

export const withdrawConfirmMessage = (user: User) =>
  messageForm(`➡️ 출금
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ 사용 가능한 잔액 : ${user.point} SOL
  
<pre>= = = = = = = = = = = = = = =</pre>
  
출금 금액을 입력해주세요.
  
최소 금액 : ${env.minimumWithdraw} SOL
  
출금 수수료 : ${env.withdrawFee} SOL`);

export const referralMessage = (user: User) =>
  messageForm(
    `<code>추천</code>
<code>= = = = = = = = = = = = = = =</code>
▫️ 나의 추천 코드 : ${user.referralCode}
▫️ 나의 추천 잔액 : <tg-spoiler>${Utils.decimalSlice(
      user.referralPoint
    )}</tg-spoiler> SOL
▫️ 최소 교환 금액 : ${env.minimumExchange} SOL 
▫️ 나의 추천 레벨 : Lv.${user.level} / ${Utils.decimalSlice(
      env.referral[user.level - 1].percent * 100,
      1
    )}%
<pre>= = = = = = = = = = = = = = =</pre>
<b><u>레벨 가격</u></b> 
${env.referral.map((_, i) =>
  i === 0
    ? ``
    : `<code>레벨${i} ➡️ 레벨${i + 1} :</code> ${env.referral[i].price}SOL`
).join(`
`)}
`
  );

export const helpMessage1 = `제품은 https://t.me/${env.channel}에서 찾을 수 있습니다.
  
게임은 실시간 이더리움 블록 생성을 기반으로하며, 첫 6 줄은 각 블록의 해시 값인 형식 0x00-0000을 표시합니다.

게임을 플레이하려면, 다음 블록의 해시의 마지막 숫자를 예측해야하며, 0에서 7 사이에 떨어지면 LOW 결과가되고, 8에서 F 사이의 숫자는 HIGH 결과가됩니다. 1, 3, 5, 7, 9, b, d, f가 결과라면 홀이고, 0, 2, 4, 6 , 8, a, c, e가 결과라면 짝입니다. 최근 결과 및 배팅 통계는 다음 결과를 예측하는 데 도움이되는 과거 결과 데이터를 제공합니다.

배팅을하려면 버튼을 클릭하면됩니다. 배팅을 할 수 없는 경우 대시 보드에 SOL을 입금하고 배팅 금액을 설정하십시오.`;

export const helpMessage2 = `메인 메뉴의 "입금" 버튼을 클릭하면 Solana 주소가 표시됩니다. 해당 주소로 Solana를 입금하십시오. (SOL)
  
Solana를 입금 한 후, 5 분 후에 "➕ 입금 확인" 버튼을 클릭하여 잔액을 업데이트해야합니다.`;

export const helpMessage3 = `출금하려면 대시 보드의 "출금" 버튼을 클릭 한 다음 "⚙️ 출금 주소 설정"을 클릭하여 개인 Solana 주소 (개인 지갑 또는 거래소 지갑)를 입력하십시오.
  
등록 된 출금 주소가있는 경우 "➡️ 출금" 버튼을 클릭하고 출금을 신청 할 Solana 금액을 입력하십시오. 출금 요청시 숫자 만 입력해야합니다.`;

export const helpMessage4 = `당신은 추천 코드를 사용하여 대량의 Solana를 얻을 수 있습니다.
  
당신의 추천 코드는 "https://t.me/${env.dashboard}?start=(유저의 개인 레퍼럴 코드)" 형식의 URL로 대시보드에 나열되어 있습니다. "https://t.me/${env.dashboard}"로 이동하여 (유저의 개인 레퍼럴 코드) 코드를 입력하여 등록할 수도 있습니다.
  
당신의 다운라인 회원이 패배해도, 당신은 그들의 베팅 금액의 일정 비율을 수수료로 받을 수 있습니다.

Earn sol을 교환하려면 메뉴 버튼을 사용할 수 있습니다. 인출 가능한 최소 금액은 50 Sol입니다.

추천 메뉴에서 "Level Up" 버튼을 누르면 수수료를 높일 수 있습니다. 이것은 Sol을 사용합니다.

"👥 Referral Overview (.xlsx)" 버튼을 클릭하여 엑셀 파일을 업로드하여 당신의 다운라인 회원의 게임 상태를 확인할 수 있습니다.`;

export const bettingCompleteMessage = (betting: Betting) => {
  return messageForm(
    `베팅 완료 : ${bettingIcon(betting.choice)} ${betting.choice}  / ${
      betting.amount
    } SOL`
  );
};

export const gameResultMessage = (
  betting: Betting,
  user: User,
  result: cnst.GameChoice[],
  profit: number
) => {
  return messageForm(
    `결과 : ${result.includes(betting.choice) ? '승' : '패'}
<pre>= = = = = = = = = = = = = = =</pre> 
<code>나의 베팅</code> : ${bettingIcon(betting.choice)} ${betting.choice} / ${
      betting.amount
    } SOL
<code>이익 :</code> ${
      result.includes(betting.choice)
        ? Utils.decimalSlice(profit - betting.amount)
        : -betting.amount
    } SOL
<code>잔액 :</code> ${Utils.decimalSlice(
      result.includes(betting.choice) ? user.point + profit : user.point
    )} SOL`
  );
};

export const messagePack = {
  restrict: `계정이 제한되었습니다`,
  selectLanguage: '언어를 선택해주세요',
  completeLanguage: '언어 변경이 완료되었습니다',
  amountError: '오류: 금액을 다시 입력해주세요',
  select: '메뉴를 선택해주세요',
  checkDeposit: '입금 내역을 확인하는 중입니다',
  anyDeposit: '입금 내역이 없습니다. 다시 시도해주세요',
  noExchange: '교환 조건이 충족되지 않았습니다',
  enterReferral: '추천 코드를 입력해주세요.',
  processing: '처리 중...',
  signUp: '추천 코드로 가입이 완료되었습니다',
  registerSpecial: '특별 추천 코드로 가입이 완료되었습니다',
  anyReferral: '이 추천 코드를 찾을 수 없습니다. 코드를 다시 입력해주세요',
  enterAddress: '⚙️ 출금 주소를 입력해주세요.',
  cancelAddress: '출금 주소 등록이 취소되었습니다.',
  cancelWithdraw: '출금이 취소되었습니다.',
  completeAddress: 'SOLANA 지갑 신청이 완료되었습니다',
  retry: '오류: 다시 시도해주세요.',
  help: '도움말 주제를 선택해주세요',
  invalidAddress: '유효하지 않은 지갑 주소입니다. 다시 확인해주세요.',
  completeDeposit: completeDepositMessage,
  completeWithdraw: completeWithdrawMessage,
  completeExchange: completeExchangeMessage,
  completeLevelUp: completeLevelUpMessage,
  mainWallet: mainWalletMessage,
  setAmount: setAmountMessage,
  dashboard: dashboardMessage,
  deposit: depositMessage,
  depositRoot: depositRootMessage,
  withdraw: withdrawMessage,
  withdrawConfirm: withdrawConfirmMessage,
  referral: referralMessage,
  help1: helpMessage1,
  help2: helpMessage2,
  help3: helpMessage3,
  help4: helpMessage4,
  levelMaxError: '이미 최대 레벨에 도달했습니다',
  notEnoughSol: 'SOL이 충분하지 않습니다',
  underMinimumSol: '최소 출금 금액보다 적습니다',
  notRegisterdAddress: '출금 주소를 등록하지 않았습니다',
  wrong: '오류가 발생했습니다. 나중에 다시 시도해주세요.',
  bettingComplete: bettingCompleteMessage,
  gameResult: gameResultMessage,
};
