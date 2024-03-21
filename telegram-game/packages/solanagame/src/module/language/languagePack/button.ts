import { buttonPack as english } from './usa';
import { buttonPack as korean } from './korea';
import { buttonPack as indonesian } from './indonesia';
import { buttonPack as chinese } from './china';
import { buttonPack as japanese } from './japan';
import { buttonPack as russian } from './russia';
import { buttonPack as vietnamese } from './vietnam';
import { ButtonSetType } from './type';

export const mainnn = ['👤 Main Menu', 'aaa', 'bbb'];
export const buttonPack = {
  english,
  korean,
  indonesian,
  chinese,
  japanese,
  russian,
  vietnamese,
};
const temp = {};
for (const button of Object.keys(english)) {
  temp[button] = Object.values(buttonPack).map((pack) => pack[button]);
}
export const buttonSet: ButtonSetType = temp as ButtonSetType;
