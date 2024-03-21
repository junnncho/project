import { cnst, Utils } from '@shared/util';
import { env } from '../../../environments/env';
import { bettingIcon } from '../../game/game.message';
import { Doc as User } from '../../user/user.model';
import { Doc as Betting } from '../../betting/betting.model';
import { messageForm } from './message';
export const buttonPack = {
  mainMenu: '👤 Trang chính',
  referral: '🫂 Giới thiệu',
  deposit: '📥 Nạp tiền',
  withdraw: '📤 Rút tiền',
  help: '❓ Trợ giúp',
  language: '🌐 Ngôn ngữ',
  helpMenu1: '1. Cách chơi',
  helpMenu2: '2. Cách nạp tiền',
  helpMenu3: '3. Cách rút tiền',
  helpMenu4: '4. Cách kiếm hoa hồng',
  setAddress: '⚙️ Đặt địa chỉ rút tiền',
  withdrawApply: '➡️ Rút tiền',
  back: '< Quay lại',
  depositCheck: '➕ Kiểm tra nạp tiền',
  specielReferral: '✍️ Nhập mã giới thiệu đặc biệt',
  levelUp: '🆙 Nâng cấp cấp bậc',
  exchange: '➡️ Đổi',
  goChannel: '👈 Đi đến kênh game',
  referralView: '🫂 Tổng quan giới thiệu(xlsx)',
  lev2: 'lv2',
  lev3: 'lv3',
  lev4: 'lv4',
  highProfit: 'Lợi nhuận cao',
  zeroFee: 'Phí rút tiền là 0 đồng',
};

export const completeDepositMessage = (amount: number) =>
  messageForm(
    `Hoàn tất kiểm tra nạp tiền của bạn: ${Utils.decimalSlice(amount)} SOL`
  );

export const completeWithdrawMessage = (amount: number) =>
  messageForm(`Hoàn tất yêu cầu rút tiền: ${Utils.decimalSlice(amount)} SOL`);

export const completeExchangeMessage = (amount: number) =>
  messageForm(`Hoàn tất đổi: ${Utils.decimalSlice(amount)} SOL`);

export const completeLevelUpMessage = (spend: number, level: number) =>
  messageForm(`Sử dụng ${spend} SOL
Hoàn tất nâng cấp cấp bậc Lev:${level}`);

export const mainWalletMessage = (balance: number, address: string) =>
  messageForm(
    `VÍ CHÍNH <pre>= = = = = = = = = = = = = = =</pre> Địa chỉ ví chính: ${address} Số dư ví chính: ${balance} SOL`
  );

export const setAmountMessage = (amount: number) =>
  messageForm(`Cài đặt đơn vị đặt cược đã lưu.
<pre>= = = = = = = = = = = = = = =</pre>
Đơn vị đặt cược hiện tại: ${amount}SOL
<pre>= = = = = = = = = = = = = = =</pre>
  
Hãy nhập số tiền cược.
TỐI THIỂU: 1 SOL ~ TỐI ĐA: 40 SOL
  `);

export const dashboardMessage = (user: User) =>
  messageForm(`TID : <tg-spoiler>${user.telegramId}</tg-spoiler>
PNL : <tg-spoiler>${user.win} / ${user.lose} (${Utils.decimalSlice(
    user.win === 0 ? 0 : (user.win / (user.win + user.lose)) * 100
  )}%)</tg-spoiler>
<pre>= = = = = = = = = = = = = = =</pre>
  Số dư khả dụng : <tg-spoiler>${Utils.decimalSlice(
    user.point
  )}</tg-spoiler> SOL
Đơn vị đặt cược : ${user.bettingAmount} SOL
<pre>= = = = = = = = = = = = = = =</pre>
Mã giới thiệu của tôi : t.me/${env.dashboard}?start=${user.referralCode}
  
Hoa hồng của tôi : <tg-spoiler>0.0</tg-spoiler> SOL
Tỷ lệ hoa hồng của tôi : Lv.${user.level}
món đặc biệt của tôi: ${user.specials.join(',')}`);

export const depositMessage = (user: User) =>
  messageForm(`📥 Nạp tiền : SOL
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ Số dư khả dụng : ${user.point} SOL
▫️ Số dư giới thiệu : ${user.referralPoint} SOL
  
▫️ Địa chỉ nạp Solana:
  ${user.gameWallet || 'Vui lòng thử lại'}
  
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ Vui lòng chỉ nạp SOL.
  
▫️ Sau khi nạp SOL,
  nhấn nút ➕ Kiểm tra nạp tiền
  để xem trạng thái nạp tiền của bạn.
  
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Kiểm tra khoản tiền nạp (Solscan)</a>
  `);

export const depositRootMessage = (user: User) =>
  messageForm(`📥 Nạp tiền : SOL (Phiên bản gốc)
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ Địa chỉ nạp Solana gốc:
  ${user.gameWallet || 'Vui lòng thử lại'}
  
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ Vui lòng chỉ nạp SOL.
  
▫️ Sau khi nạp SOL,
  nhấn nút ➕ Kiểm tra nạp tiền
  để xem trạng thái nạp tiền của bạn.
  
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Kiểm tra khoản tiền nạp (Solscan)</a>
  `);

export const withdrawMessage = (user: User) =>
  messageForm(`📤 Rút tiền : SOL
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ Số dư khả dụng : ${user.point} SOL
▫️ Số dư giới thiệu : ${user.referralPoint} SOL
  
<pre>= = = = = = = = = = = = = = =</pre>
  
✅ Vui lòng đăng ký địa chỉ rút tiền
  (Bạn phải nhập đúng địa chỉ SOL.)
  
<pre>= = = = = = = = = = = = = = =</pre>
  
Địa chỉ rút tiền là
  ${user.myWallet || 'Chưa đăng ký'}
  `);

export const withdrawConfirmMessage = (user: User) =>
  messageForm(`➡️ Rút tiền
<pre>= = = = = = = = = = = = = = =</pre>
  
▫️ Số dư khả dụng : ${user.point} SOL
  
<pre>= = = = = = = = = = = = = = =</pre>
  
Vui lòng nhập số tiền rút.
  
Số tiền tối thiểu : ${env.minimumWithdraw} SOL
  
Phí rút tiền : ${env.withdrawFee} SOL`);

export const referralMessage = (user: User) =>
  messageForm(
    `<code>Giới thiệu</code>
<code>= = = = = = = = = = = = = = =</code>
▫️ Mã giới thiệu của bạn : ${user.referralCode}
▫️ Số dư giới thiệu của bạn : <tg-spoiler>${Utils.decimalSlice(
      user.referralPoint
    )}</tg-spoiler> SOL 
▫️ Số tiền đổi tối thiểu : ${env.minimumExchange} SOL 
▫️ Cấp giới thiệu của bạn : Lv.${user.level} / ${Utils.decimalSlice(
      env.referral[user.level - 1].percent * 100,
      1
    )}%
<pre>= = = = = = = = = = = = = = =</pre>
<b><u>Giá cấp</u></b> 
${env.referral.map((_, i) =>
  i === 0
    ? ``
    : `<code>Cấp${i} ➡️ Cấp${i + 1} :</code> ${env.referral[i].price}SOL`
).join(`
`)}
`
  );

export const helpMessage1 = `Sản phẩm có thể được tìm thấy trên https://t.me/${env.channel}.
  
Trò chơi dựa trên việc tạo khối Ethereum thời gian thực, với 6 dòng đầu tiên hiển thị trạng thái hiện tại của việc tạo khối, trong đó định dạng 0x00-0000 đại diện cho giá trị băm của mỗi khối.
  
Để chơi trò chơi, bạn phải dự đoán con số cuối cùng của cú hat-trick ở khối tiếp theo, rơi từ 0 đến 7 là kết quả LOW, còn con số giữa 8 đến F là kết quả HIGH. Nếu 1, 3, 5, 7, 9, b, d, f là kết quả của hội trường, 0, 2, 4, 6, 8, a, c, e là một cặp. Kết quả gần đây và thống kê cá cược cung cấp dữ liệu kết quả trong quá khứ giúp dự đoán kết quả tiếp theo.
  
Để đặt cược, chỉ cần nhấp vào nút. Nếu bạn không thể đặt cược, hãy nạp Sol trên bảng điều khiển và đặt số tiền cược của bạn.`;

export const helpMessage2 = `Nếu bạn nhấp vào nút "Nạp tiền" trên menu chính, một địa chỉ Solana sẽ được hiển thị. Vui lòng nạp Solana vào địa chỉ đó. (SOL)
  
Sau khi nạp Solana, bạn phải nhấn nút "➕ Kiểm tra nạp tiền" để cập nhật số dư của bạn sau 5 phút.`;

export const helpMessage3 = `Để rút tiền, nhấp vào nút "Rút tiền" trên bảng điều khiển và nhấp vào "⚙️ Đặt địa chỉ rút tiền" để nhập địa chỉ Solana cá nhân của bạn (ví cá nhân hoặc ví giao dịch).
  
Nếu bạn đã đăng ký địa chỉ rút tiền, bạn có thể nhấp vào nút "➡️ Rút tiền" và nhập số tiền Solana để yêu cầu rút tiền. Khi yêu cầu rút tiền, chỉ nên nhập số.`;

export const helpMessage4 = `Bạn có thể kiếm được số lượng lớn Solana bằng cách sử dụng mã giới thiệu của mình.
  
Mã giới thiệu của bạn là URL có dạng "https://t.me/${env.dashboard}?start=(mã giới thiệu cá nhân của người dùng)" được liệt kê trên bảng điều khiển. Bạn cũng có thể đến "https://t.me/${env.dashboard}" và nhập mã (mã giới thiệu cá nhân của người dùng) để đăng ký.
  
Ngay cả khi thành viên của bạn thua, bạn vẫn có thể kiếm được một phần trăm nhất định của số tiền đặt cược của họ như hoa hồng.
  
Bạn có thể sử dụng nút menu menu để trao đổi số lượng Sol kiếm được. Số tiền tối thiểu để rút là 50 Sol.
  
Để biết thêm phí, bạn có thể tăng phí bằng cách nhấn "Referral" trên menu chính và nhấn nút "Level Up". Nó sử dụng Sol.
  
Bạn có thể kiểm tra trạng thái trò chơi của thành viên hạ cánh của mình bằng cách nhấp vào nút "👥 Tổng quan giới thiệu (.xlsx)" để tải lên tệp Excel.`;

export const bettingCompleteMessage = (betting: Betting) => {
  return messageForm(
    `ĐẶT CƯỢC THÀNH CÔNG : ${bettingIcon(betting.choice)} ${
      betting.choice
    }  / ${betting.amount} SOL`
  );
};

export const gameResultMessage = (
  betting: Betting,
  user: User,
  result: cnst.GameChoice[],
  profit: number
) => {
  return messageForm(
    `KẾT QUẢ : ${result.includes(betting.choice) ? 'THẮNG' : 'THUA'}
<pre>= = = = = = = = = = = = = = =</pre>
<code>Đặt cược của bạn</code> : ${bettingIcon(betting.choice)} ${
      betting.choice
    } / ${betting.amount} SOL
<code>Lợi nhuận :</code> ${
      result.includes(betting.choice)
        ? Utils.decimalSlice(profit - betting.amount)
        : -betting.amount
    } SOL
<code>Số dư khả dụng :</code> ${Utils.decimalSlice(
      result.includes(betting.choice) ? user.point + profit : user.point
    )} SOL`
  );
};

export const messagePack = {
  restrict: `Bạn bị hạn chế`,
  selectLanguage: 'Vui lòng chọn ngôn ngữ',
  completeLanguage: 'Hoàn thành để thay đổi ngôn ngữ',
  amountError: 'Lỗi: Vui lòng nhập lại số tiền',
  select: 'Vui lòng chọn menu',
  checkDeposit: 'Kiểm tra khoản tiền gửi của bạn',
  anyDeposit: 'Bạn không có khoản tiền gửi: Vui lòng thử lại',
  noExchange: 'Không đáp ứng điều kiện để trao đổi',
  enterReferral: 'Vui lòng nhập mã giới thiệu của bạn.',
  processing: 'Đang xử lý...',
  signUp: 'Hoàn thành để đăng ký với giới thiệu',
  registerSpecial: 'Hoàn thành để đăng ký giới thiệu đặc biệt',
  anyReferral: 'Không tìm thấy mã giới thiệu này: nhập lại mã',
  enterAddress: '⚙️ Nhập địa chỉ rút tiền.',
  cancelAddress: 'Hủy đăng ký địa chỉ rút tiền.',
  cancelWithdraw: 'Rút tiền đã bị hủy bỏ.',
  completeAddress: 'Hoàn thành để áp dụng ví SOLANA',
  retry: `Lỗi: vui lòng thử lại.`,
  help: 'Vui lòng chọn chủ đề trợ giúp.',
  invalidAddress: 'Địa chỉ ví không hợp lệ. Vui lòng kiểm tra lại.',
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
  levelMaxError: 'Bạn đã đạt đến cấp độ tối đa',
  notEnoughSol: 'Bạn không có đủ SOL',
  underMinimumSol: 'Dưới mức rút tối thiểu',
  notRegisterdAddress: 'Bạn chưa đăng ký địa chỉ rút tiền của mình',
  wrong: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
  bettingComplete: bettingCompleteMessage,
  gameResult: gameResultMessage,
};
