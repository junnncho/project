import { Utils } from '@shared/util';
import { bold, FmtString, pre, spoiler } from 'telegraf/typings/format';
import { env } from '../../environments/env';
import { Doc as User } from '../user/user.model';
import { BankSummary } from '../waiting/waiting.service';

export const mainWalletMessage = (
  balance: number,
  address: string,
  result: BankSummary
) =>
  postFix(`<pre>= = = = = = = = = = = = = = =</pre>
MAIN WALLET
<pre>= = = = = = = = = = = = = = =</pre>
Main Wallet Address: ${address}
Main Wallet Balance: ${balance} SOL

Today Deposit(24hrs): ${result.deposit} SOL

Today Withdraw(24hrs): ${result.withdraw} SOL

Today Exchange ReferralPoint(24hrs): ${result.exchange} SOL
<pre>= = = = = = = = = = = = = = =</pre>`);

export const setAmountMessage = (amount: number) =>
  postFix(`<pre>= = = = = = = = = = = = = = =</pre>
Bet unit settings saved.
<pre>= = = = = = = = = = = = = = =</pre>
Current bet unit : ${amount}SOL
<pre>= = = = = = = = = = = = = = =</pre>

Try enter betting amount.
MIN : 1 SOL ~ MAX : 40 SOL

<pre>= = = = = = = = = = = = = = =</pre>`);

export const dashboardMessage = (user: User) =>
  postFix(`<pre>= = = = = = = = = = = = = = =</pre>
TID : <tg-spoiler>${user.telegramId}</tg-spoiler>
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
<pre>= = = = = = = = = = = = = = =</pre>`);

export const depositMessage = (user: User) =>
  postFix(`<pre>= = = = = = = = = = = = = = =</pre>
📥 Deposit : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Available Balance : ${user.point} SOL
▫️ Referral Balance : ${user.referralPoint} SOL

 ▫️ Solana Deposit Address:
${user.gameWallet || 'Retry Please'}

<pre>= = = = = = = = = = = = = = =</pre>

 ▫️ Please only deposit SOL.

 ▫️ After depositing SOL,
   Press ➕ Deposit check button
   to see your deposit status.

   <pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Check Deposits (Solscan)</a>

<pre>= = = = = = = = = = = = = = =</pre>`);

export const depositRootMessage = (user: User) =>
  postFix(`<pre>= = = = = = = = = = = = = = =</pre>
📥 Deposit : SOL(Root Version)
<pre>= = = = = = = = = = = = = = =</pre>

 ▫️ Solana Root Deposit Address:
${user.gameWallet || 'Retry Please'}

<pre>= = = = = = = = = = = = = = =</pre>

 ▫️ Please only deposit SOL.

 ▫️ After depositing SOL,
   Press ➕ Deposit check button
   to see your deposit status.

   <pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Check Deposits (Solscan)</a>

<pre>= = = = = = = = = = = = = = =</pre>`);

export const withdrawMessage = (user: User) =>
  postFix(`<pre>= = = = = = = = = = = = = = =</pre>
📤 Withdraw : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Available Balance : ${user.point} SOL
▫️ Referral Balance : ${user.referralPoint} SOL

<pre>= = = = = = = = = = = = = = =</pre>

✅ Please register withdrawal address
 (You must enter a valid SOL address.) 

<pre>= = = = = = = = = = = = = = =</pre>

Withdrawal address is
${user.myWallet || 'Not registered Yet'}

<pre>= = = = = = = = = = = = = = =</pre>`);

export const withdrawConfirmMessage = (user: User) =>
  postFix(`<pre>= = = = = = = = = = = = = = =</pre>
➡️ Withdraw
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Available Balance : ${user.point} SOL

<pre>= = = = = = = = = = = = = = =</pre>

Please Enter withdrawal amount.

Minimum amount : ${env.minimumWithdraw} SOL

Withdrawal fee : ${env.withdrawFee} SOL
<pre>= = = = = = = = = = = = = = =</pre>`);

export const referralMessage = (user: User) =>
  postFix(`<code>= = = = = = = = = = = = = = =</code>
<code>Referral</code>
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
        
<pre>= = = = = = = = = = = = = = =</pre>`);

export const messageForm = (message: string): string => {
  return postFix(`<code>= = = = = = = = = = = = = = =</code>
  ${message}
  <code>= = = = = = = = = = = = = = =</code>`);
};

export const postFix = (message: string): string =>
  `${message}
<code>SOLEGRAM</code>`;

export const helpMessage1 = `The product can be found on the https://t.me/${env.channel}.

The game is based on real-time Ethereum block generation, with the first six lines showing the current status of block creation, where the format 0x00-0000 represents the hash value of each block.

To play the game, you need to predict the last digit of the hash of the next block to be created, and if it falls between 0 and 7, the result will be LOW, while a digit from 8 to F will result in a HIGH outcome. Recent Results and Betting Stats provide past results data to help you predict the next outcome.

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
