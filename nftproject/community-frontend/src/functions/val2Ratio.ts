export const val2Rato = (valPair: { [key: string]: number }) => {
  let sum = 0;
  let ratio = [0];
  Object.keys(valPair).map((val, ind) => {
    sum += valPair[val];
  });
  Object.keys(valPair).map((val, ind) => {
    ratio[ind] = (100 * valPair[val]) / sum;
  });
  return ratio;
};
