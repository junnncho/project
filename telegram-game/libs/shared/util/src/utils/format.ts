export const prettyPrint = (data: any): any => {
  if (Array.isArray(data))
    return data.length
      ? data.reduce((acc, cur) => acc + ', ' + prettyPrint(cur))
      : 'empty';
  else if (typeof data === 'object') return JSON.stringify(data, null, 2);
  else return data;
};
export const pad = (
  data: string | number,
  totalLength: number,
  padChar = '0'
) => {
  return String(data).padStart(totalLength, padChar);
};
export const shorten = (
  data: string | number,
  totalLength = 8,
  padNum = 3,
  padChar = '.'
) => {
  const str = String(data);
  if (str.length <= totalLength) return String(data);
  return str.slice(0, totalLength - padNum) + padChar.repeat(padNum);
};
export const discordHashTagForm = (user: {
  username: string;
  discriminator: string;
}) => {
  if (!user) return '';
  return `@${user.username}#${user.discriminator}`;
};
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const lowerlize = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
export const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const decimalSlice = (value: number | string, level = 3) => {
  if (isNaN(parseFloat(value as string))) throw new Error('Only Number');
  return Math.floor(parseFloat(value as string) * 10 ** level) / 10 ** level;
};

export const simplifyHash = (hash: string) => {
  return hash.slice(0, 4) + '-' + hash.slice(hash.length - 4);
};

export const toIsoString = (date: Date, skipTime?: boolean) => {
  return skipTime
    ? new Date(date).toISOString().slice(0, 10)
    : new Date(date).toISOString();
};

export const decToHex = (num: number) => '0x' + num.toString(16);

export const isPhoneNumber = (phone?: string | null) => {
  if (!phone) return false;
  const comp = phone[0] === '0' ? phone.slice(1) : phone;
  const regExp1 = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  const regExp2 = /^\(?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return (
    (regExp1.test(comp) || regExp2.test(comp)) && phone.split('-').length === 3
  );
};
export const isEmail = (email: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const formatPhone = (value: string) => {
  // const comp = value.length > 6 && value[0] === "0" ? value.slice(1) : value;
  // return value.length > 6 && value[0] === "0" ? value.slice(1) : value;
  if (!value) return '';
  if (value.length === 10)
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  else if (value.length === 13)
    return value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  else return value;
};

export const DateFormat = (
  date: Date,
  form: string,
  ln: 'ko' | 'en' = 'en'
) => {
  const d = new Date(date);
  let formString = form;
  formString = formString.replace(/YYYY/g, d.getFullYear().toString());
  formString = formString.replace(/MM/g, pad(d.getMonth() + 1, 2));
  formString = formString.replace(/DD/g, pad(d.getDate(), 2));
  formString = formString.replace(/hh/g, pad(d.getHours(), 2));
  formString = formString.replace(/mm/g, pad(d.getMinutes(), 2));
  formString = formString.replace(/ss/g, pad(d.getSeconds(), 2));
  formString = formString.replace(/ms/g, pad(d.getMilliseconds(), 3));
  formString = formString.replace(/S/g, pad(d.getMilliseconds(), 1));
  formString = formString.replace(/SS/g, pad(d.getMilliseconds(), 2));
  formString = formString.replace(/SSS/g, pad(d.getMilliseconds(), 3));
  formString = formString.replace(/SSSS/g, pad(d.getMilliseconds(), 4));
  //am pm
  formString = formString.replace(
    /a/g,
    d.getHours() < 12
      ? ln === 'en'
        ? 'am'
        : '오전'
      : ln === 'en'
      ? 'pm'
      : '오후'
  );
  return formString;

  //find form at YYYY

  //find form at MM
  //find form at DD
  //find form at hh
  //find form at mm
  //find form at ss
  //find form at ms
  //find form at S
  //find form at SS
  //find form at SSS
  //find form at SSSS
  // const form = new Date(date);
  // return `${form.getFullYear()}-${form.getMonth() + 1}-${form.getDate()}`;
};
