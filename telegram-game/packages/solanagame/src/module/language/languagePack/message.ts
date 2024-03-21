import { messagePack as korean } from './korea';
import { messagePack as indonesian } from './indonesia';
import { messagePack as chinese } from './china';
import { messagePack as japanese } from './japan';
import { messagePack as russian } from './russia';
import { messagePack as vietnamese } from './vietnam';
import { messagePack as english } from './eng';

export const messagePack = {
  english,
  korean,
  indonesian,
  chinese,
  japanese,
  russian,
  vietnamese,
};

export const messageForm = (message: string): string => {
  return postFix(`<code>= = = = = = = = = = = = = = =</code>
${message}
<code>= = = = = = = = = = = = = = =</code>`);
};

export const postFix = (message: string): string =>
  `${message}
<code>SOLEGRAM</code>`;
