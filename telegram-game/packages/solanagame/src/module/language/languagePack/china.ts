import { cnst, Utils } from '@shared/util';
import { env } from '../../../environments/env';
import { bettingIcon } from '../../game/game.message';
import { Doc as User } from '../../user/user.model';
import { Doc as Betting } from '../../betting/betting.model';
import { messageForm } from './message';
export const buttonPack = {
  mainMenu: '👤 主菜单',
  referral: '🫂 推荐',
  deposit: '📥 存款',
  withdraw: '📤 取款',
  help: '❓ 帮助',
  language: '🌐 语言',
  helpMenu1: '1. 如何玩游戏',
  helpMenu2: '2. 如何存款',
  helpMenu3: '3. 如何取款',
  helpMenu4: '4. 如何赚取佣金',
  setAddress: '⚙️ 设置提款地址',
  withdrawApply: '➡️ 取款',
  back: '< 返回',
  depositCheck: '➕ 存款检查',
  specielReferral: '✍️ 输入特殊推荐',
  levelUp: '🆙 等级提升',
  exchange: '➡️ 兑换',
  goChannel: '👈 转至游戏频道',
  referralView: '🫂 推荐概览（xlsx）',
  lev2: '二级',
  lev3: '三级',
  lev4: '四级',
  highProfit: '高盈利',
  zeroFee: '零提款费',
};

export const completeDepositMessage = (amount: number) =>
  messageForm(`已完成存款检查：${Utils.decimalSlice(amount)} SOL`);

export const completeWithdrawMessage = (amount: number) =>
  messageForm(`已完成取款申请：${Utils.decimalSlice(amount)} SOL`);

export const completeExchangeMessage = (amount: number) =>
  messageForm(`已完成兑换：${Utils.decimalSlice(amount)} SOL`);

export const completeLevelUpMessage = (spend: number, level: number) =>
  messageForm(
    `花费 ${spend} SOL
已完成等级提升，当前等级:${level}`
  );

export const mainWalletMessage = (balance: number, address: string) =>
  messageForm(`主钱包
<pre>= = = = = = = = = = = = = = =</pre>
主钱包地址：${address}
主钱包余额：${balance} SOL`);

export const setAmountMessage = (amount: number) =>
  messageForm(`投注单位设置已保存。
<pre>= = = = = = = = = = = = = = =</pre>
当前投注单位：${amount}SOL
<pre>= = = = = = = = = = = = = = =</pre>

尝试输入投注金额。
最小：1 SOL ~ 最大：40 SOL
`);

export const dashboardMessage = (user: User) =>
  messageForm(`TID : <tg-spoiler>${user.telegramId}</tg-spoiler>
PNL : <tg-spoiler>${user.win} / ${user.lose} (${Utils.decimalSlice(
    user.win === 0 ? 0 : (user.win / (user.win + user.lose)) * 100
  )}%)</tg-spoiler>
<pre>= = = = = = = = = = = = = = =</pre>
可用余额 : <tg-spoiler>${Utils.decimalSlice(user.point)}</tg-spoiler> SOL
投注单位 : ${user.bettingAmount} SOL
<pre>= = = = = = = = = = = = = = =</pre>
我的推荐码 : t.me/${env.dashboard}?start=${user.referralCode}

我的佣金 : <tg-spoiler>0.0</tg-spoiler> SOL
我的佣金比率 : Lv.${user.level}
我的特色菜: ${user.specials.join(',')}`);

export const depositMessage = (user: User) =>
  messageForm(`📥 存款 : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ 可用余额 : ${user.point} SOL
▫️ 推荐余额 : ${user.referralPoint} SOL

▫️ Solana 存款地址:
${user.gameWallet || '请重试'}

<pre>= = = = = = = = = = = = = = =</pre>

▫️ 请存入 SOL。

▫️ 存入 SOL 后，
  点击 ➕ 存款检查 按钮
  查看存款状态。

<pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>查看存款 (Solscan)</a>
 `);

export const depositRootMessage = (user: User) =>
  messageForm(`📥 存款 : SOL(Root 版本)
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Solana Root 存款地址:
${user.gameWallet || '请重试'}

<pre>= = = = = = = = = = = = = = =</pre>

▫️ 请存入 SOL。

▫️ 存入 SOL 后，
  点击 ➕ 存款检查 按钮
  查看存款状态。

<pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>查看存款 (Solscan)</a>
`);

export const withdrawMessage = (user: User) =>
  messageForm(`📤 取款 : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ 可用余额 : ${user.point} SOL
▫️ 推荐余额 : ${user.referralPoint} SOL

<pre>= = = = = = = = = = = = = = =</pre>

✅ 请添加取款地址
 （必须输入有效的 SOL 地址。）

<pre>= = = = = = = = = = = = = = =</pre>

取款地址为
${user.myWallet || '尚未注册'}
`);

export const withdrawConfirmMessage = (user: User) =>
  messageForm(`➡️ 取款
<pre>= = = = = = = = = = = = = = =</pre>

▫️ 可用余额 : ${user.point} SOL

<pre>= = = = = = = = = = = = = = =</pre>

请输入取款金额。

最小金额：${env.minimumWithdraw} SOL

取款手续费：${env.withdrawFee} SOL`);

export const referralMessage = (user: User) =>
  messageForm(`<code>推荐</code>
<code>= = = = = = = = = = = = = = =</code>
▫️ 您的推荐码 : ${user.referralCode}
▫️ 您的推荐余额 : <tg-spoiler>${Utils.decimalSlice(
    user.referralPoint
  )}</tg-spoiler> SOL
▫️ 最小兑换金额 : ${env.minimumExchange} SOL
▫️ 您的推荐等级 : Lv.${user.level} / ${Utils.decimalSlice(
    env.referral[user.level - 1].percent * 100,
    1
  )}%
<pre>= = = = = = = = = = = = = = =</pre>
<b><u>等级价格</u></b>
${env.referral.map((_, i) =>
  i === 0
    ? ``
    : `<code>等级${i} ➡️ 等级${i + 1} :</code> ${env.referral[i].price}SOL`
).join(`
`)}
`);

export const helpMessage1 = `可以在 https://t.me/${env.channel} 上找到该产品。

该游戏基于实时的以太坊块生成，前六行显示块创建的当前状态，格式为 0x00-0000 表示每个块的哈希值。

要玩游戏，必须预测下一个区块哈希的最后数字，如果落在0到7之间，则LOW结果，而8到F之间的数字则为HIGH结果。 1、3、5、7、9、b、d、f为结果为孔，0、2、4、6、8、a、c、e为结果为配对。 最近的结果和赌注统计提供了过去的结果数据，有助于预测以下结果。

要下注，只需点击按钮。如果无法下注，请在控制面板上存入 Sol 并设置您的投注金额。`;

export const helpMessage2 = `如果您单击主菜单上的“存款”按钮，则会显示一个 Solana 地址。请将 Solana 存入该地址。（SOL）

存入 Solana 后，您必须点击“➕ 存款检查”按钮，在 5 分钟后更新您的余额。`;

export const helpMessage3 = `要提款，请点击控制面板上的“取款”按钮，然后单击“⚙️ 设置提款地址”以输入您的个人 Solana 地址 (个人钱包或交易所钱包)。

如果您已经注册了提款地址，可以单击“➡️ 取款”按钮并输入要申请取款的 Solana 数量。在发起取款请求时，只能输入数字。`;

export const helpMessage4 = `您可以使用您的推荐代码赚取大量Solana。

您的推荐代码是形式为 “https://t.me/${env.dashboard}?start=(用户个人推荐代码)”的URL，该代码列在仪表板上。您还可以转至“https://t.me/${env.dashboard}”，输入(用户个人推荐代码)代码进行注册。

即使您的下级成员输了，您仍然可以获得他们押注金额的一定百分比作为佣金。

您可以使用菜单菜单按钮来交换赚取的Sol。最低提款金额为50 Sol。

欲了解更多手续费，请按“推荐”并按“级别提升”按钮以增加手续费。它使用Sol。

您可以通过单击“👥推荐概述(.xlsx)”按钮上传Excel文件来检查您的下线成员的游戏状态。`;

export const bettingCompleteMessage = (betting: Betting) => {
  return messageForm(
    `投注成功：${bettingIcon(betting.choice)} ${betting.choice}  / ${
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
    `结果：${result.includes(betting.choice) ? '胜利' : '失败'}
<pre>= = = = = = = = = = = = = = =</pre> <code>你的赌注</code>：${bettingIcon(
      betting.choice
    )} ${betting.choice} / ${betting.amount} SOL
<code>利润 :</code> ${
      result.includes(betting.choice)
        ? Utils.decimalSlice(profit - betting.amount)
        : -betting.amount
    } SOL
<code>可用余额 :</code> ${Utils.decimalSlice(
      result.includes(betting.choice) ? user.point + profit : user.point
    )} SOL`
  );
};

export const messagePack = {
  restrict: `您现在被限制了`,
  selectLanguage: '请选择语言',
  completeLanguage: '完成更改语言',
  amountError: '错误：请重新输入金额',
  select: '请选择菜单',
  checkDeposit: '检查您的存款',
  anyDeposit: '您没有任何存款：请重试',
  noExchange: '不符合兑换条件',
  enterReferral: '请输入您的推荐代码。',
  processing: '正在处理...',
  signUp: '成功使用推荐代码注册',
  registerSpecial: '成功注册特别推荐',
  anyReferral: '未找到此推荐代码：重新输入代码',
  enterAddress: '⚙️ 输入提款地址。',
  cancelAddress: '取消提款地址注册。',
  cancelWithdraw: '取消提款。',
  completeAddress: '已完成申请SOLANA钱包',
  retry: `错误：请重试。`,
  help: '请选择一个帮助主题。',
  invalidAddress: '无效的钱包地址。请再次检查。',
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
  levelMaxError: '您已达到最高级别',
  notEnoughSol: '您没有足够的SOL',
  underMinimumSol: '低于最低提款点',
  notRegisterdAddress: '您尚未注册提款地址',
  wrong: '出了点问题。请稍后再试。',
  bettingComplete: bettingCompleteMessage,
  gameResult: gameResultMessage,
};
