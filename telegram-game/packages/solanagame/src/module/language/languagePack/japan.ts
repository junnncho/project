import { cnst, Utils } from '@shared/util';
import { env } from '../../../environments/env';
import { bettingIcon } from '../../game/game.message';
import { Doc as User } from '../../user/user.model';
import { Doc as Betting } from '../../betting/betting.model';
import { messageForm } from './message';
export const buttonPack = {
  mainMenu: '👤 メインメニュー',
  referral: '🫂 リファラル',
  deposit: '📥 入金',
  withdraw: '📤 出金',
  help: '❓ ヘルプ',
  language: '🌐 言語',
  helpMenu1: '1. 遊び方',
  helpMenu2: '2. 入金方法',
  helpMenu3: '3. 出金方法',
  helpMenu4: '4. 収益の稼ぎ方',
  setAddress: '⚙️ 出金アドレス設定',
  withdrawApply: '➡️ 出金',
  back: '< 戻る',
  depositCheck: '➕ 入金確認',
  specielReferral: '✍️ 特別リファラル入力',
  levelUp: '🆙 レベルアップ',
  exchange: '➡️ 交換',
  goChannel: '👈 ゲームチャンネルへ移動',
  referralView: '🫂 リファラル概要(xlsx)',
  lev2: 'lv2',
  lev3: 'lv3',
  lev4: 'lv4',
  highProfit: '高い収益',
  zeroFee: '出金手数料無料',
};

export const completeDepositMessage = (amount: number) =>
  messageForm(`入金が確認されました。金額: ${Utils.decimalSlice(amount)} SOL`);

export const completeWithdrawMessage = (amount: number) =>
  messageForm(
    `出金申請が完了しました。金額: ${Utils.decimalSlice(amount)} SOL`
  );

export const completeExchangeMessage = (amount: number) =>
  messageForm(`交換が完了しました。金額: ${Utils.decimalSlice(amount)} SOL`);

export const completeLevelUpMessage = (spend: number, level: number) =>
  messageForm(
    `${spend} SOLを支払いました。
レベルアップが完了しました。レベル: ${level}`
  );

export const mainWalletMessage = (balance: number, address: string) =>
  messageForm(`メインウォレット
<pre>= = = = = = = = = = = = = = =</pre>
メインウォレットアドレス: ${address}
メインウォレット残高: ${balance} SOL`);

export const setAmountMessage = (amount: number) =>
  messageForm(`ベット単位が設定されました。
<pre>= = = = = = = = = = = = = = =</pre>
現在のベット単位: ${amount}SOL
<pre>= = = = = = = = = = = = = = =</pre>

ベット額を入力してください。
最小額: 1 SOL ~ 最大額: 40 SOL
`);

export const dashboardMessage = (user: User) =>
  messageForm(`TID : <tg-spoiler>${user.telegramId}</tg-spoiler>
PNL : <tg-spoiler>${user.win} / ${user.lose} (${Utils.decimalSlice(
    user.win === 0 ? 0 : (user.win / (user.win + user.lose)) * 100
  )}%)</tg-spoiler>
<pre>= = = = = = = = = = = = = = =</pre>
利用可能残高 : <tg-spoiler>${Utils.decimalSlice(user.point)}</tg-spoiler> SOL
ベット単位 : ${user.bettingAmount} SOL
<pre>= = = = = = = = = = = = = = =</pre>
自分のリファラルコード : t.me/${env.dashboard}?start=${user.referralCode}

自分の収益 : <tg-spoiler>0.0</tg-spoiler> SOL
自分の収益率 : Lv.${user.level}
私の特別料理: ${user.specials.join(',')}`);

export const depositMessage = (user: User) =>
  messageForm(`📥 入金 : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ 利用可能残高: ${user.point} SOL
▫️ リファラル残高: ${user.referralPoint} SOL

 ▫️ Solana入金アドレス:
${user.gameWallet || '再試行してください'}

<pre>= = = = = = = = = = = = = = =</pre>

▫️ SOL以外は入金しないでください。

▫️ SOLを入金後、
  ➕ 入金確認ボタンを押して、
  5分後に残高を更新してください。

<pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>入金確認 (Solscan)</a>
 `);

export const depositRootMessage = (user: User) =>
  messageForm(`📥 入金 : SOL(Root Version)
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Solana Root入金アドレス:
${user.gameWallet || '再試行してください'}

<pre>= = = = = = = = = = = = = = =</pre>

▫️ SOL以外は入金しないでください。

▫️ SOLを入金後、
  ➕ 入金確認ボタンを押して、
  5分後に残高を更新してください。

<pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>入金確認 (Solscan)</a>
`);

export const withdrawMessage = (user: User) =>
  messageForm(`📤 出金 : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ 利用可能残高: ${user.point} SOL
▫️ リファラル残高: ${user.referralPoint} SOL

<pre>= = = = = = = = = = = = = = =</pre>

✅ 出金アドレスを登録してください。
（有効なSOLアドレスを入力してください。）

<pre>= = = = = = = = = = = = = = =</pre>

出金アドレスは
${user.myWallet || '未登録です'}
`);

export const withdrawConfirmMessage = (user: User) =>
  messageForm(`➡️ 出金
<pre>= = = = = = = = = = = = = = =</pre>

▫️ 利用可能残高: ${user.point} SOL

<pre>= = = = = = = = = = = = = = =</pre>

出金額を入力してください。

最低金額: ${env.minimumWithdraw} SOL

出金手数料: ${env.withdrawFee} SOL`);

export const referralMessage = (user: User) =>
  messageForm(`<code>リファラル</code>
<code>= = = = = = = = = = = = = = =</code>
▫️ あなたのリファラルコード : ${user.referralCode}
▫️ あなたのリファラル残高 : <tg-spoiler>${Utils.decimalSlice(
    user.referralPoint
  )}</tg-spoiler> SOL
▫️ 最低交換額 : ${env.minimumExchange} SOL
▫️ あなたのリファラルレベル : Lv.${user.level} / ${Utils.decimalSlice(
    env.referral[user.level - 1].percent * 100,
    1
  )}%
<pre>= = = = = = = = = = = = = = =</pre>
<b><u>レベル価格</u></b>
${env.referral.map((_, i) =>
  i === 0
    ? ``
    : `<code>レベル${i} ➡️ レベル${i + 1} :</code> ${env.referral[i].price}SOL`
).join(`
`)}
`);

export const helpMessage1 = `製品は以下のURLからアクセスできます。https://t.me/${env.channel}。

ゲームはリアルタイムのEthereumブロック生成に基づいており、最初の6行は各ブロックのハッシュ値を示しています。フォーマット0x00-0000。

ゲームをプレイするには、次のブロックのハッシュの最後の数字を予測する必要があり、0から7までの間に落ちるとLOW結果になり、8からFまでの数字はHIGH結果になります。 1、3、5、7、9、b、d、fが結果だとホールであり、0、2、4、6、8,a,c,eが結果だとペアです。 最近の結果とバッティング統計は、次の結果を予測するのに役立つ過去の結果データを提供します。

ベットを行うには、ボタンをクリックするだけです。ベットを行えない場合は、ダッシュボードにSOLを入金し、ベット単位を設定してください。`;

export const helpMessage2 = `メインメニューの「入金」ボタンをクリックすると、Solanaアドレスが表示されます。そのアドレスにSolanaを入金してください。(SOL)

Solanaを入金した後、5分後に「➕ 入金確認」ボタンをクリックして、残高を更新してください。`;

export const helpMessage3 = `出金するには、ダッシュボードの「出金」ボタンをクリックし、「⚙️ 出金アドレス設定」をクリックして、個人用のSolanaアドレス(個人ウォレットまたは取引所ウォレット)を入力してください。

出金アドレスを登録している場合は、「➡️ 出金」ボタンをクリックし、出金を申請するSOLANAの金額を入力してください。出金申請を行う際は、数字のみを入力してください。`;

export const helpMessage4 = `あなたの紹介コードを使用することで、大量のSolanaを獲得することができます。

あなたの紹介コードは、ダッシュボードに掲載されている "https://t.me/${env.dashboard}?start=(ユーザーの個人紹介コード)" という形式のURLです。あなたはまた、https://t.me/${env.dashboard}" に行って、(ユーザーの個人紹介コード)コードを入力して登録することもできます

あなたのダウンラインメンバーが負けても、彼らのベッティング金額の一定割合を手数料として獲得することができます。

「メニューボタン」を使用して獲得したsolを交換することができます。最低引き出し金額は50 Solです。

より多くの手数料については、メインメニューの「Referral」を押して、「Level Up」ボタンを押すことで手数料を増やすことができます。それはSolを使用します。

Excelファイルをアップロードするために、下位メンバーのゲームステータスを確認するには、「👥 Referral Overview (.xlsx)」ボタンをクリックします。`;

export const bettingCompleteMessage = (betting: Betting) => {
  return messageForm(
    `成功投票 : ${bettingIcon(betting.choice)} ${betting.choice}  / ${
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
    `結果 : ${result.includes(betting.choice) ? '勝' : '敗'}
<pre>= = = = = = = = = = = = = = =</pre>
<code>私の賭け事</code> : ${bettingIcon(betting.choice)} ${betting.choice} / ${
      betting.amount
    } SOL
<code>利益 :</code> ${
      result.includes(betting.choice)
        ? Utils.decimalSlice(profit - betting.amount)
        : -betting.amount
    } SOL
<code>利用可能残高 :</code> ${Utils.decimalSlice(
      result.includes(betting.choice) ? user.point + profit : user.point
    )} SOL`
  );
};

export const messagePack = {
  restrict: `あなたは現在制限されています`,
  selectLanguage: '言語を選択してください',
  completeLanguage: '言語の変更が完了しました',
  amountError: 'エラー：金額を再入力してください',
  select: 'メニューを選択してください',
  checkDeposit: 'あなたの入金を確認しています',
  anyDeposit: '入金がありません：再試行してください',
  noExchange: '交換条件を満たしていません',
  enterReferral: 'あなたの紹介コードを入力してください。',
  processing: '処理中...',
  signUp: '紹介コードでのサインアップが完了しました',
  registerSpecial: '特別紹介コードの登録が完了しました',
  anyReferral:
    'この紹介コードが見つかりませんでした：コードを再入力してください',
  enterAddress: '⚙️引き出しアドレスを入力してください。',
  cancelAddress: '引き出しアドレスの登録をキャンセルしました。',
  cancelWithdraw: '引き出しをキャンセルしました。',
  completeAddress: 'SOLANAウォレットの申請が完了しました',
  retry: `エラー：再試行してください。`,
  help: 'ヘルプトピックを選択してください。',
  invalidAddress: '無効なウォレットアドレスです。もう一度確認してください。',
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
  levelMaxError: 'すでに最大レベルに達しています',
  notEnoughSol: 'SOLが不足しています',
  underMinimumSol: '引き出しポイントの最低金額を下回っています',
  notRegisterdAddress: '引き出しアドレスが登録されていません',
  wrong: '何かがうまくいかなかったようです。後でもう一度お試しください。',
  bettingComplete: bettingCompleteMessage,
  gameResult: gameResultMessage,
};
