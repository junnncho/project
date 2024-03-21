import { cnst, Utils } from '@shared/util';
import { env } from '../../../environments/env';
import { bettingIcon } from '../../game/game.message';
import { Doc as User } from '../../user/user.model';
import { Doc as Betting } from '../../betting/betting.model';
import { messageForm } from './message';
export const buttonPack = {
  mainMenu: '👤 Menu utama',
  referral: '🫂 rekomendasi',
  deposit: '📥 Deposit',
  withdraw: '📤 Penarikan',
  help: '❓ Bantuan',
  language: '🌐 Bahasa',
  helpMenu1: '1. Cara bermain',
  helpMenu2: '2. Metode penyetoran',
  helpMenu3: '3. Metode penarikan dana',
  helpMenu4: '4. Cara mendapatkan komisi',
  setAddress: '⚙️ Menyiapkan alamat penarikan dana',
  withdrawApply: '➡️ Penarikan',
  back: '< Kembali',
  depositCheck: '➕ Mengonfirmasi deposit',
  specielReferral: '✍️ Masukkan rekomendasi khusus',
  levelUp: '🆙 Naik level',
  exchange: '➡️ Pertukaran',
  goChannel: '👈 Buka saluran permainan',
  referralView: '🫂 Ikhtisar rekomendasi(xlsx)',
  lev2: '2Tingkat',
  lev3: '3Tingkat',
  lev4: '4Tingkat',
  highProfit: 'Pendapatan tinggi',
  zeroFee: 'Tidak ada biaya penarikan',
};

export const completeDepositMessage = (amount: number) =>
  messageForm(`Setoran dikonfirmasi: ${Utils.decimalSlice(amount)} SOL`);

export const completeWithdrawMessage = (amount: number) =>
  messageForm(
    `Lengkapi permintaan penarikan dana Anda: ${Utils.decimalSlice(amount)} SOL`
  );

export const completeExchangeMessage = (amount: number) =>
  messageForm(
    `Lengkapi permintaan penukaran Anda: ${Utils.decimalSlice(amount)} SOL`
  );

export const completeLevelUpMessage = (spend: number, level: number) =>
  messageForm(
    `Menghabiskan ${spend} SOL Menyelesaikan kenaikan level, Tingkat saat ini:${level}`
  );

export const mainWalletMessage = (balance: number, address: string) =>
  messageForm(`Dompet Utama
<pre>= = = = = = = = = = = = = = =</pre>
Alamat dompet utama: ${address}
Saldo dompet utama: ${balance} SOL`);

export const setAmountMessage = (amount: number) =>
  messageForm(`Pengaturan unit taruhan telah disimpan.
<pre>= = = = = = = = = = = = = = =</pre>
Unit taruhan saat ini : ${amount}SOL
<pre>= = = = = = = = = = = = = = =</pre>
Masukkan jumlah taruhan Anda.
Minimum : 1 SOL ~ maksimum : 40 SOL
`);

export const dashboardMessage = (user: User) =>
  messageForm(`TID : <tg-spoiler>${user.telegramId}</tg-spoiler>
PNL : <tg-spoiler>${user.win} / ${user.lose} (${Utils.decimalSlice(
    user.win === 0 ? 0 : (user.win / (user.win + user.lose)) * 100
  )}%)</tg-spoiler>
<pre>= = = = = = = = = = = = = = =</pre>
saldo tersedia : <tg-spoiler>${Utils.decimalSlice(user.point)}</tg-spoiler> SOL
Satuan taruhan : ${user.bettingAmount} SOL
<pre>= = = = = = = = = = = = = = =</pre>
kode referral saya : t.me/${env.dashboard}?start=${user.referralCode}

Biaya saya : <tg-spoiler>0.0</tg-spoiler> SOL
Persentase komisiku : Lv.${user.level}
Spesial saya: ${user.specials.join(',')}`);

export const depositMessage = (user: User) =>
  messageForm(`📥 setoran : SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ saldo tersedia : ${user.point} SOL
▫️ Saldo rujukan : ${user.referralPoint} SOL

▫️ Solana setoran Alamat setoran:
${user.gameWallet || 'Silakan coba lagi'}

<pre>= = = = = = = = = = = = = = =</pre>

▫️ SOL Harap setor saja.

▫️ SOLsetelah melakukan deposit,
Klik tombol ➕ Konfirmasi deposit untuk memeriksa
untuk memeriksa status deposit Anda.

<pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Konfirmasi pembayaran (Solscan)</a>
`);

export const depositRootMessage = (user: User) =>
  messageForm(`📥 menyetorkan : SOL(Root version)
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Solana Root alamat setoran:
${user.gameWallet || 'silakan coba lagi'}

<pre>= = = = = = = = = = = = = = =</pre>

▫️ SOLHarap setor saja.

▫️ SOLSetelah menyetor
➕ Klik tombol konfirmasi setoran
Periksa status setoran Anda.

<pre>= = = = = = = = = = = = = = =</pre>

▫️ <a href='https://solscan.io/account/${
    user.gameWallet
  }'>Mengonfirmasi deposit (Solscan)</a>
`);

export const withdrawMessage = (user: User) =>
  messageForm(`📤 Penarikan: SOL
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Saldo yang tersedia : ${user.point} SOL
▫️ Saldo rujukan : ${user.referralPoint} SOL

<pre>= = = = = = = = = = = = = = =</pre>

✅ Daftarkan alamat penarikan Anda
(Anda harus memasukkan alamat SOL yang valid.)

<pre>= = = = = = = = = = = = = = =</pre>

Alamat penarikan dana adalah
${user.myWallet || 'Belum terdaftar'}
`);

export const withdrawConfirmMessage = (user: User) =>
  messageForm(`➡️ Penarikan
<pre>= = = = = = = = = = = = = = =</pre>

▫️ Saldo yang tersedia : ${user.point} SOL

<pre>= = = = = = = = = = = = = = =</pre>

Masukkan jumlah penarikan.

Jumlah minimum : ${env.minimumWithdraw} SOL

Biaya penarikan : ${env.withdrawFee} SOL`);

export const referralMessage = (user: User) =>
  messageForm(`<code>Rujukan</code>
<code>= = = = = = = = = = = = = = =</code>
▫️ Kode rujukan saya : ${user.referralCode}
▫️ Saldo rujukan saya : <tg-spoiler>${Utils.decimalSlice(
    user.referralPoint
  )}</tg-spoiler> SOL
▫️ Jumlah penukaran minimum : ${env.minimumExchange} SOL
▫️ Tingkat rekomendasi saya : Lv.${user.level} / ${Utils.decimalSlice(
    env.referral[user.level - 1].percent * 100,
    1
  )}%
<pre>= = = = = = = = = = = = = = =</pre>
<b><u>Harga tingkat</u></b>
${env.referral.map((_, i) =>
  i === 0
    ? ``
    : `<code>Tingkat${i} ➡️ Tingkat${i + 1} :</code> ${
        env.referral[i].price
      }SOL`
).join(`
`)}
`);

export const helpMessage1 = `Produk ini adalah https://t.me/${env.channel} Anda dapat menemukannya di sini.

Permainan ini didasarkan pada pembuatan blok Ethereum secara real-time, dan 6 baris pertama menampilkan nilai hash setiap blok, dalam format 0x00-0000.

Untuk memainkan gim, Anda harus memprediksi angka terakhir dari hash di blok berikutnya, jatuh antara 0 dan 7 akan menjadi hasil LOW, dan angka antara 8 dan F akan menjadi hasil HIGHIGH. 1, 3, 5, 7, 9, b, d, f adalah hasilnya, dan 0, 2, 4, 6, a, c, e adalah hasilnya, pasangan. Hasil terbaru dan statistik taruhan menyediakan data hasil masa lalu yang membantu memprediksi hasil berikutnya.

Untuk memasang taruhan, cukup klik tombol. Jika Anda tidak dapat memasang taruhan, depositkan SOL di dasbor Anda dan tentukan jumlah taruhan`;

export const helpMessage2 = `"Deposit" di menu utama untuk menampilkan alamat Solana Anda. Setor Solana ke alamat tersebut. (SOL)

Setelah melakukan deposit Solana, Anda perlu mengklik tombol "➕ Konfirmasi Deposit" setelah 5 menit untuk memperbarui saldo Anda`;

export const helpMessage3 = `Untuk menarik dana, klik tombol "Tarik" di dasbor Anda, lalu klik "Atur alamat penarikan ⚙️" untuk memasukkan alamat Solana pribadi Anda (dompet pribadi atau dompet pertukaran).

Jika Anda memiliki alamat penarikan yang terdaftar, klik tombol "➡️ penarikan" dan masukkan jumlah Solana yang ingin Anda ajukan untuk penarikan. Anda harus memasukkan hanya angka saat mengajukan penarikan dana `;

export const helpMessage4 = `Anda bisa menggunakan kode referral Anda untuk mendapatkan Solana dalam jumlah besar.

Kode referral Anda adalah "https://t.me/${env.dashboard}?start=(kode rujukan pribadi pengguna)" dan dicantumkan di dasbor. "https://t.me/${env.dashboard}"dan masukkan kode (kode referensi pribadi Anda) untuk mendaftar.

Jika anggota downline Anda kalah, Anda masih bisa mendapatkan persentase dari taruhan mereka sebagai komisi.

Untuk menukarkan Earn sol, Anda dapat menggunakan tombol menu. Jumlah minimum yang dapat Anda tarik adalah 50 sol.

Anda dapat meningkatkan komisi Anda dengan menekan tombol "Naikkan Level" di menu rujukan. Ini menggunakan Sol.

"👥 Anda dapat mengunggah file excel dengan mengklik tombol "Ikhtisar Rujukan (.xlsx)" untuk melihat status permainan anggota downline Anda.`;

export const bettingCompleteMessage = (betting: Betting) => {
  return messageForm(
    `bertaruh sukses : ${bettingIcon(betting.choice)} ${betting.choice}  / ${
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
    `hasil : ${result.includes(betting.choice) ? 'menang' : 'kalah'}
<pre>= = = = = = = = = = = = = = =</pre>
<code>taruhan Anda</code> : ${bettingIcon(betting.choice)} ${
      betting.choice
    } / ${betting.amount} SOL
<code>Keuntungan :</code> ${
      result.includes(betting.choice)
        ? Utils.decimalSlice(profit - betting.amount)
        : -betting.amount
    } SOL
<code>Keseimbangan Tersedia :</code> ${Utils.decimalSlice(
      result.includes(betting.choice) ? user.point + profit : user.point
    )} SOL`
  );
};

export const messagePack = {
  restrict: 'Anda sekarang dibatasi',
  selectLanguage: 'Silakan pilih bahasa',
  completeLanguage: 'Perubahan bahasa selesai',
  amountError: 'Kesalahan: Harap masukkan jumlah lagi',
  select: 'Silakan pilih menu',
  checkDeposit: 'Memeriksa riwayat deposit Anda',
  anyDeposit: 'Tidak ada riwayat deposit, silakan coba lagi',
  noExchange: 'Ketentuan penukaran tidak terpenuhi',
  enterReferral: 'Silakan masukkan kode referral Anda.',
  processing: 'Pengolahan...',
  signUp: 'Anda telah berhasil mendaftar dengan kode referral Anda',
  registerSpecial: 'Anda telah berhasil mendaftar dengan kode referral khusus',
  anyReferral: 'Kode rujukan ini tidak ditemukan, silakan masukkan kode lagi',
  enterAddress: '⚙️ Silakan masukkan alamat penarikan Anda.',
  cancelAddress: 'Registrasi alamat penarikan telah dibatalkan.',
  cancelWithdraw: 'Penarikan dibatalkan.',
  completeAddress: 'Aplikasi dompet SOLANA Anda sudah selesai',
  retry: 'Kesalahan: Silakan coba lagi.',
  help: 'Pilih topik bantuan',
  invalidAddress: 'Alamat dompet tidak valid. Mohon periksa kembali.',
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
  levelMaxError: 'Anda telah mencapai level maksimum',
  notEnoughSol: 'Tidak cukup SOL',
  underMinimumSol: 'Kurang dari jumlah penarikan minimum',
  notRegisterdAddress: 'Anda belum mendaftarkan alamat penarikan dana',
  wrong: 'Terjadi kesalahan, silakan coba lagi nanti.',
  bettingComplete: bettingCompleteMessage,
  gameResult: gameResultMessage,
};
