import { cnst, Utils } from '@shared/util';
import { env } from '../../../environments/env';
import { bettingIcon } from '../../game/game.message';
import { Doc as User } from '../../user/user.model';
import { Doc as Betting } from '../../betting/betting.model';
import { messageForm } from './message';
export const buttonPack = {
  mainMenu: '👤 Main Menu',
  referral: '🫂 Referral',
  deposit: '📥 Deposit',
  withdraw: '📤 Withdraw',
  help: '❓ Help',
  language: '🌐 Language',
  helpMenu1: '1. How to play',
  helpMenu2: '2. How to make a deposit',
  helpMenu3: '3. How to withdraw',
  helpMenu4: '4. How to earn commision',
  setAddress: '⚙️ Set Withdraw Address',
  withdrawApply: '➡️ Withdraw',
  back: '< Back',
  depositCheck: '➕ Deposit Check',
  specielReferral: '✍️ Input Special Referral',
  levelUp: '🆙 Level Up',
  exchange: '➡️ Exchange',
  goChannel: 'Go to Game Channel',
  referralView: 'Referral Overview(xlsx)',
  lev2: 'lv2',
  lev3: 'lv3',
  lev4: 'lv4',
  highProfit: 'highProfit',
  zeroFee: 'zeroWithdrawFee',
};

export const completeDepositMessage = (amount: number) =>
  messageForm(
    `Complete to check your deposit: ${Utils.decimalSlice(amount)} SOL`
  );

export const completeWithdrawMessage = (amount: number) =>
  messageForm(`Complete to apply withdraw: ${Utils.decimalSlice(amount)} SOL`);

export const completeExchangeMessage = (amount: number) =>
  messageForm(`Complete to exchange: ${Utils.decimalSlice(amount)} SOL`);

export const completeLevelUpMessage = (spend: number, level: number) =>
  messageForm(
    `Spend ${spend} SOL
Complete to level up Lev:${level}`
  );

export const mainWalletMessage = (balance: number, address: string) =>
  messageForm(`MAIN WALLET
<pre>= = = = = = = = = = = = = = =</pre>
Main Wallet Address: ${address}
Main Wallet Balance: ${balance} SOL`);

export const setAmountMessage = (amount: number) =>
  messageForm(`Bet unit settings saved.
<pre>= = = = = = = = = = = = = = =</pre>
Current bet unit : ${amount}SOL
<pre>= = = = = = = = = = = = = = =</pre>

Try enter betting amount.
MIN : 1 SOL ~ MAX : 40 SOL
`);

export const dashboardMessage = (user: User) =>
  messageForm(`TID : <tg-spoiler>${user.telegramId}</tg-spoiler>
PNL : <tg-spoiler>${user.win} / ${user.lose} (${Utils.decimalSlice(
    user.win === 0 ? 0 : (user.win / (user.win + user.lose)) * 100
  )}%)</tg-spoiler>
<pre>= = = = = = = = = = = = = = =</pre>
Available Balance : <tg-spoiler>${Utils.decimalSlice(
    user.point
  )}</tg-spoiler> SOL
Bet Unit : ${user.bettingAmount} SOL
<pre>= = = = = = = = = = = = = = =</pre>
My Referral Code : t.me/${env.dashboard}?start=${user.referralCode}

My Commission : <tg-spoiler>0.0</tg-spoiler> SOL
My Commission Ratio : Lv.${user.level}
My Specials: ${user.specials.join(',')}`);

export const depositMessage = (user: User) =>
  messageForm(`📥 Deposit : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Available Balance : ${user.point} SOL
▫️ Referral Balance : ${user.referralPoint} SOL

 ▫️ Solana Deposit Address:
${user.gameWallet || 'Retry Please'}

<pre>= = = = = = = = = = = = = = =</pre>
▫️ Please only deposit SOL.
▫️ After depositing SOL,  Press ➕ Deposit check button  to see your deposit status.

   <pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Check Deposits (Solscan)</a>
 `);

export const depositRootMessage = (user: User) =>
  messageForm(`📥 Deposit : SOL(Root Version)
<pre>= = = = = = = = = = = = = = =</pre>
▫️ Solana Root Deposit Address:
${user.gameWallet || 'Retry Please'}

<pre>= = = = = = = = = = = = = = =</pre>
▫️ Please only deposit SOL.
▫️ After depositing SOL,  Press ➕ Deposit check button  to see your deposit status.

   <pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Check Deposits (Solscan)</a>
`);

export const withdrawMessage = (user: User) =>
  messageForm(`📤 Withdraw : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Available Balance : ${user.point} SOL
▫️ Referral Balance : ${user.referralPoint} SOL

<pre>= = = = = = = = = = = = = = =</pre>

✅ Please register withdrawal address(You must enter a valid SOL address.) 

<pre>= = = = = = = = = = = = = = =</pre>

Withdrawal address is
${user.myWallet || 'Not registered Yet'}
`);

export const withdrawConfirmMessage = (user: User) =>
  messageForm(`➡️ Withdraw
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Available Balance : ${user.point} SOL

<pre>= = = = = = = = = = = = = = =</pre>

Please Enter withdrawal amount.

Minimum amount : ${env.minimumWithdraw} SOL

Withdrawal fee : ${env.withdrawFee} SOL`);

export const referralMessage = (user: User) =>
  messageForm(`<code>Referral</code>
<code>= = = = = = = = = = = = = = =</code>
▫️ Your Referral Code : ${user.referralCode}
▫️ Your Referral Balance : <tg-spoiler>${Utils.decimalSlice(
    user.referralPoint
  )}</tg-spoiler> SOL
▫️ Minimum Exchange : ${env.minimumExchange} SOL
▫️ Your Referral Level : Lv.${user.level} / ${Utils.decimalSlice(
    env.referral[user.level - 1].percent * 100,
    1
  )}%
<pre>= = = = = = = = = = = = = = =</pre>
<b><u>Level Price</u></b>
${env.referral.map((_, i) =>
  i === 0
    ? ``
    : `<code>Level${i} ➡️ Level${i + 1} :</code> ${env.referral[i].price}SOL`
).join(`
`)}
`);

export const helpMessage1 = `The product can be found on the https://t.me/${env.channel}.

The game is based on real-time Ethereum block generation, with the first six lines showing the current status of block creation, where the format 0x00-0000 represents the hash value of each block.

To play the game, you need to predict the last number of hash in the next block, and if it falls between 0 and 7, it becomes the LOW result, and if it falls between 8 and F, it becomes the HIGH result. If 1, 3, 5, 7, 9, b, d, f are the results, then it's a hole, and if 0, 2, 4, 6, 8, a, c, and e are the results, it's a pair. Recent results and batting statistics provide historical results data to help you predict the following results.

To place a bet, simply click the button. If you cannot place a bet, deposit Sol on the dashboard and set your betting amount.`;

export const helpMessage2 = `If you click on the "Deposit" button on the Main menu, an Solana address will be displayed. Please deposit Solana to that address. (SOL)

After depositing Solana, you must click the "➕ Deposit check" button to update your balance after 5 minutes.`;

export const helpMessage3 = `To withdraw, click on the "Withdraw" button on the dashboard and click "⚙️ Set Withdraw address" to enter your personal Solana address (personal wallet or exchange wallet).

If you have a registered withdrawal address, you can click the "➡️ Withdraw" button and enter the amount of Solana to apply for a withdrawal. When making a withdrawal request, only numbers should be entered.`;

export const helpMessage4 = `You can earn a large amount of Solana by using your referral code.

Your referral code is a URL of the form "https://t.me/${env.dashboard}?start=(유저의 개인 레퍼럴 코드)" that is listed on the dashboard. You can also go to "https://t.me/${env.dashboard}" and enter the (유저의 개인 레퍼럴 코드) code to register.

Even if your downline member loses, you can still earn a certain percentage of their betting amount as commission.

You can use the menu menu button to exchange the earn sol.Minimum amount for withdrawal is 50 Sol.

For more fees, you can increase the fee by pressing "Referral" on the main menu and pressing the "Level Up" button. It uses Sol.

You can check your downline member's game status by clicking the "👥 Referral Overview (.xlsx)" button to upload the Excel file.`;

export const bettingCompleteMessage = (betting: Betting) => {
  return messageForm(
    `BET SUCCESS : ${bettingIcon(betting.choice)} ${betting.choice}  / ${
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
  return messageForm(`RESULT : ${
    result.includes(betting.choice) ? 'WIN' : 'LOSE'
  }
<pre>= = = = = = = = = = = = = = =</pre>
<code>Your bet</code> : ${bettingIcon(betting.choice)} ${betting.choice} / ${
    betting.amount
  } SOL
<code>Profits :</code> ${
    result.includes(betting.choice)
      ? Utils.decimalSlice(profit - betting.amount)
      : -betting.amount
  } SOL
<code>Available Balance :</code> ${Utils.decimalSlice(
    result.includes(betting.choice) ? user.point + profit : user.point
  )} SOL`);
};

export const messagePack = {
  restrict: `You are now restricted`,
  selectLanguage: 'Please select language',
  completeLanguage: 'Complete to change language',
  amountError: 'Error:Please ReEnter the amount',
  select: 'Please select menu',
  checkDeposit: 'Checking your deposit',
  anyDeposit: "You don't have any deposit: Retry Please",
  noExchange: "Don't meet the condition to exchange",
  enterReferral: 'Please enter your referral code.',
  processing: 'Processing...',
  signUp: 'Complete to signUp with referral',
  registerSpecial: 'Complete to register special referral',
  anyReferral: 'Not found this referral code: reenter code',
  enterAddress: '⚙️ Enter withdrawal address.',
  cancelAddress: 'Withdrawal address registration cancelled.',
  cancelWithdraw: 'Withdraw cancelled.',
  completeAddress: 'Complete to apply SOLANA wallet',
  retry: `Error: retry please.`,
  help: 'Please select a help topic.',
  invalidAddress: 'Invalid wallet address. Please check again.',
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
  levelMaxError: 'You already reached the maximum level',
  notEnoughSol: "You don't have enough SOL",
  underMinimumSol: 'Under the minumum withdrawPoint',
  notRegisterdAddress: 'You have not registered your withdrawal address yet',
  wrong: 'Something went wrong. Please try again later.',
  bettingComplete: bettingCompleteMessage,
  gameResult: gameResultMessage,
};
