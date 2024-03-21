const getHexValue = (value) => value.toString(16).padStart(2, "0");

//* tailwind 형식으로 컬러값 생성
//* colorName-500 , colorName 이 baseColor로 지정.
//* 50, 100, 200 ~ 900 까지 색상이 생성됨. 숫자가 작을수록 밝음
const generateColors = (colorName, baseColor) => {
  const colors = {};
  const baseColorArray = baseColor?.match(/[A-Za-z0-9]{2}/g)?.map((str) => parseInt(str, 16));
  if (!baseColorArray) return colors;
  colors[`${colorName}`] = baseColor;
  colors[`${colorName}-500`] = baseColor;
  colors[`${colorName}-900`] = `#${baseColorArray
    .map((color) => Math.round(color - color * 0.1))
    .map(getHexValue)
    .join("")}`;
  Array.from({ length: 4 }, (_, i) => i + 1).forEach((i) => {
    const multiplier = i * 100;
    const colorArray = baseColorArray.map((color) =>
      Math.round(color + (255 - color) * ((1000 - multiplier * 2) / 1000))
    );
    if (i === 1) {
      const colorArray2 = colorArray.map((color) => Math.round(color + (255 - color) * (1 / 2)));
      colors[`${colorName}-50`] = `#${colorArray2.map(getHexValue).join("")}`;
    }
    colors[`${colorName}-${multiplier}`] = `#${colorArray.map(getHexValue).join("")}`;
  });
  Array.from({ length: 4 }, (_, i) => i + 6).forEach((i) => {
    const multiplier = i * 100;
    const colorArray = baseColorArray.map((color) => Math.round(color * (1 - (multiplier - 500) / 500)));
    colors[`${colorName}-${multiplier}`] = `#${colorArray.map(getHexValue).join("")}`;
  });
  return colors;
};

module.exports = { generateColors };
