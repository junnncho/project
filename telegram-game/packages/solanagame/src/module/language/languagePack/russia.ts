import { cnst, Utils } from '@shared/util';
import { env } from '../../../environments/env';
import { bettingIcon } from '../../game/game.message';
import { Doc as User } from '../../user/user.model';
import { Doc as Betting } from '../../betting/betting.model';
import { messageForm } from './message';
export const buttonPack = {
  mainMenu: '👤 Главное меню',
  referral: '🫂 Реферальная ссылка',
  deposit: '📥 Внести депозит',
  withdraw: '📤 Вывести депозит',
  help: '❓ Помощь',
  language: '🌐 Язык',
  helpMenu1: '1. Как играть',
  helpMenu2: '2. Как внести депозит',
  helpMenu3: '3. Как вывести депозит',
  helpMenu4: '4. Как заработать комиссию',
  setAddress: '⚙️ Задать адрес вывода средств',
  withdrawApply: '➡️ Вывести депозит',
  back: '< Назад',
  depositCheck: '➕ Проверить депозит',
  specielReferral: '✍️ Ввести специальную реферальную ссылку',
  levelUp: '🆙 Повысить уровень',
  exchange: '➡️ Обменять средства',
  goChannel: '👈 Перейти в канал игры',
  referralView: '🫂 Обзор реферальной ссылки(xlsx)',
  lev2: 'Ур.2',
  lev3: 'Ур.3',
  lev4: 'Ур.4',
  highProfit: 'Высокая прибыль',
  zeroFee: 'Нулевой комиссионный сбор',
};

export const completeDepositMessage = (amount: number) =>
  messageForm(`Депозит проверен: ${Utils.decimalSlice(amount)} SOL`);

export const completeWithdrawMessage = (amount: number) =>
  messageForm(
    `Запрос на вывод депозита выполнен: ${Utils.decimalSlice(amount)} SOL`
  );

export const completeExchangeMessage = (amount: number) =>
  messageForm(`Обмен выполнен: ${Utils.decimalSlice(amount)} SOL`);

export const completeLevelUpMessage = (spend: number, level: number) =>
  messageForm(
    `Потрачено ${spend} SOL
Вы достигли уровня: ${level}`
  );

export const mainWalletMessage = (balance: number, address: string) =>
  messageForm(`ОСНОВНОЙ КОШЕЛЁК
<pre>= = = = = = = = = = = = = = =</pre>
Адрес основного кошелька: ${address}
Баланс основного кошелька: ${balance} SOL`);

export const setAmountMessage = (amount: number) =>
  messageForm(`Настройки ставок сохранены.
<pre>= = = = = = = = = = = = = = =</pre>
Текущая ставка : ${amount}SOL
<pre>= = = = = = = = = = = = = = =</pre>

Попробуйте ввести сумму ставки.
МИН : 1 SOL ~ МАКС : 40 SOL
`);

export const dashboardMessage = (user: User) =>
  messageForm(`TID : <tg-spoiler>${user.telegramId}</tg-spoiler>
PNL : <tg-spoiler>${user.win} / ${user.lose} (${Utils.decimalSlice(
    user.win === 0 ? 0 : (user.win / (user.win + user.lose)) * 100
  )}%)</tg-spoiler>
<pre>= = = = = = = = = = = = = = =</pre>
Доступный баланс : <tg-spoiler>${Utils.decimalSlice(
    user.point
  )}</tg-spoiler> SOL
Ставка : ${user.bettingAmount} SOL
<pre>= = = = = = = = = = = = = = =</pre>
Мой реферальный код : t.me/${env.dashboard}?start=${user.referralCode}

Моя комиссия : <tg-spoiler>0.0</tg-spoiler> SOL
Мое соотношение комиссии : Ур.${user.level}
мои специальные: ${user.specials.join(',')}`);

export const depositMessage = (user: User) =>
  messageForm(`📥 Внести депозит : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Доступный баланс : ${user.point} SOL
▫️ Реферальный баланс : ${user.referralPoint} SOL

▫️ Адрес внесения Solana:
${user.gameWallet || 'Повторите попытку'}

<pre>= = = = = = = = = = = = = = =</pre>

▫️ Внесите только SOL.

▫️ После внесения SOL,
  нажмите кнопку ➕ Проверить депозит
  для проверки статуса вашего депозита.

<pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Проверить депозиты (Solscan)</a>
 `);
export const depositRootMessage = (user: User) =>
  messageForm(`📥 Внести депозит : SOL(Версия Root)
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Адрес корневого внесения Solana:
${user.gameWallet || 'Повторите попытку'}

<pre>= = = = = = = = = = = = = = =</pre>

▫️ Внесите только SOL.

▫️ После внесения SOL,
  нажмите кнопку ➕ Проверить депозит
  для проверки статуса вашего депозита.

<pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Проверить депозиты (Solscan)</a>
`);

export const withdrawMessage = (user: User) =>
  messageForm(`📤 Вывести депозит : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Доступный баланс : ${user.point} SOL
▫️ Реферальный баланс : ${user.referralPoint} SOL

<pre>= = = = = = = = = = = = = = =</pre>

✅ Пожалуйста, зарегистрируйте адрес вывода
 (Вы должны ввести действительный адрес SOL.)

<pre>= = = = = = = = = = = = = = =</pre>

Адрес вывода
${user.myWallet || 'Вы ещё не зарегистрировали адрес вывода'}
`);

export const withdrawConfirmMessage = (user: User) =>
  messageForm(`➡️ Вывести депозит
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Доступный баланс : ${user.point} SOL

<pre>= = = = = = = = = = = = = = =</pre>

Введите сумму вывода.

Минимальная сумма : ${env.minimumWithdraw} SOL

Комиссия за вывод : ${env.withdrawFee} SOL`);

export const referralMessage = (user: User) =>
  messageForm(`<code>Реферальная ссылка</code>
<code>= = = = = = = = = = = = = = =</code>
▫️ Ваш реферальный код : ${user.referralCode}
▫️ Ваш реферальный баланс : <tg-spoiler>${Utils.decimalSlice(
    user.referralPoint
  )}</tg-spoiler> SOL
▫️ Минимальный обмен : ${env.minimumExchange} SOL
▫️ Ваш уровень реферала : Ур.${user.level} / ${Utils.decimalSlice(
    env.referral[user.level - 1].percent * 100,
    1
  )}%
<pre>= = = = = = = = = = = = = = =</pre>
<b><u>Цена уровней</u></b>
${env.referral.map((_, i) =>
  i === 0
    ? ``
    : `<code>Ур.${i} ➡️ Ур.${i + 1} :</code> ${env.referral[i].price}SOL`
).join(`
`)}
`);

export const helpMessage1 = `Продукт можно найти на https://t.me/${env.channel}.

Игра основана на генерации блоков Ethereum в реальном времени, где первые шесть строк отображают текущий статус создания блоков, где формат 0x00-0000 представляет значения хеша каждого блока.

Чтобы играть, необходимо предсказать последнее число хэш-чипов в следующем блоке, падение от 0 до 7 даст результат LOW, а число от 8 до F — результат HIGH. Если 1, 3, 5, 7, 9, b, d, f — результат, то 0, 2, 4, 6, 8, a, c, e — результат, и 0, 2, 4, 6, 8 — результат. Последние результаты и статистика ставок предоставляют исторические данные, которые помогают предсказать следующие результаты:

Для размещения ставки просто нажмите кнопку. Если вы не можете сделать ставку, внесите Sol на панели управления и установите сумму ставки.`;

export const helpMessage2 = `Если вы нажмете кнопку "Внести депозит" на главном меню, будет отображен адрес Solana. Пожалуйста, вносите Solana на этот адрес. (SOL)

После внесения Solana вы должны нажать кнопку "➕ Проверить депозит", чтобы обновить свой баланс через 5 минут.`;

export const helpMessage3 = `Чтобы вывести депозит, нажмите кнопку "Вывести депозит" на панели управления и нажмите "⚙️ Задать адрес вывода" для ввода вашего личного адреса Solana (личный кошелек или кошелек обмена).

Если у вас есть зарегистрированный адрес вывода, вы можете нажать кнопку "➡️ Вывести депозит" и ввести сумму Solana для запроса на вывод. При запросе на вывод необходимо вводить только цифры.`;

export const helpMessage4 = `Вы можете заработать большое количество Solana, используя свой реферальный код.

Ваш реферальный код - это URL-адрес следующего вида "https://t.me/${env.dashboard}?start=(персональный реферальный код пользователя)", который указан на панели управления. Вы также можете перейти на "https://t.me/${env.dashboard}" и ввести код (персональный реферальный код пользователя) для регистрации.

Даже если ваш реферал проиграет, вы все равно можете заработать определенный процент от суммы их ставок в качестве комиссии.

Вы можете использовать кнопку меню, чтобы обменять заработанные sol. Минимальная сумма для вывода - 50 Sol.

Чтобы узнать больше о комиссиях, вы можете увеличить их, нажав "Реферальная ссылка" на главном меню и нажав кнопку "Улучшить уровень". Это использует Sol.

Вы можете проверить статус игры ваших рефералов, нажав кнопку "👥 Обзор рефералов (.xlsx)", чтобы загрузить файл Excel.`;

export const bettingCompleteMessage = (betting: Betting) => {
  return messageForm(
    `УСПЕШНАЯ СТАВКА : ${bettingIcon(betting.choice)} ${betting.choice}  / ${
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
    `РЕЗУЛЬТАТ : ${result.includes(betting.choice) ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}
<pre>= = = = = = = = = = = = = = =</pre>
<code>Ваша ставка</code> : ${bettingIcon(betting.choice)} ${betting.choice} / ${
      betting.amount
    } SOL
<code>Прибыль :</code> ${
      result.includes(betting.choice)
        ? Utils.decimalSlice(profit - betting.amount)
        : -betting.amount
    } SOL
<code>Доступный баланс :</code> ${Utils.decimalSlice(
      result.includes(betting.choice) ? user.point + profit : user.point
    )} SOL`
  );
};

export const messagePack = {
  restrict: `Вы ограничены`,
  selectLanguage: 'Пожалуйста, выберите язык',
  completeLanguage: 'Изменение языка завершено',
  amountError: 'Ошибка: пожалуйста, введите сумму заново',
  select: 'Пожалуйста, выберите меню',
  checkDeposit: 'Проверка вашего депозита',
  anyDeposit: 'У вас нет депозита: попробуйте еще раз',
  noExchange: 'Не соответствует условиям для обмена',
  enterReferral: 'Введите свой реферальный код.',
  processing: 'Обработка...',
  signUp: 'Регистрация с реферальным кодом завершена',
  registerSpecial: 'Регистрация специального реферального кода завершена',
  anyReferral: 'Этот реферальный код не найден: введите код заново',
  enterAddress: '⚙️ Введите адрес вывода.',
  cancelAddress: 'Отмена регистрации адреса вывода.',
  cancelWithdraw: 'Вывод отменен.',
  completeAddress: 'Регистрация кошелька SOLANA завершена',
  retry: `Ошибка: повторите попытку позже.`,
  help: 'Пожалуйста, выберите тему справки.',
  invalidAddress:
    'Недействительный адрес кошелька. Пожалуйста, проверьте еще раз.',
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
  levelMaxError: 'Вы уже достигли максимального уровня',
  notEnoughSol: 'У вас недостаточно SOL',
  underMinimumSol: 'Меньше минимального баланса для вывода',
  notRegisterdAddress: 'Вы еще не зарегистрировали свой адрес вывода',
  wrong: 'Что-то пошло не так. Пожалуйста, попробуйте позже.',
  bettingComplete: bettingCompleteMessage,
  gameResult: gameResultMessage,
};
