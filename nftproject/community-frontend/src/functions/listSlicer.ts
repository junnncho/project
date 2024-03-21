export const SlideGenerate = <T>(data: T[], num: number) => {
  let list: T[][] = [];
  let i: number;
  let j: number = Math.floor(data.length / num) + 1;
  for (i = 0; i < j; i++) {
    list.push(data.slice(num * i, num * (i + 1)));
  }
  return list;
};
