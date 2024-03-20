const scriptPath = "/c/Mintaka_Github/tingting/libs/photoshop/";
const dataPath = "/c/Mintaka_Github/tingting/data/photoshop/";
const partsPath = "/c/Users/ken78/My Drive/TINGTING PLANET/TINGTING/제너러티브 파츠/";
const genPath = "/c/Users/ken78/My Drive/TINGTING PLANET/TINGTING/제너레이션/";
const assetPath = "/c/Users/ken78/My Drive/TINGTING PLANET/TINGTING/Decentverse/ayias";
const humanSkinColors = [
  "ffebe0",
  "ffe5e0",
  "ffdecb",
  "ffd5cb",
  "f1c1ab",
  "ffc3b6",
  "e3a293",
  "9c726c",
  "926761",
  "795652",
];
const angelSkinColors = ["f7e5b5", "eebbc2", "a597bf"];
const devilSkinColors = ["557a91", "ab4a4e", "2e2e2e"];

function getJson(src) {
  var file = File(src);
  file.open("r");
  var data = file.read();
  file.close();
  return JSON.parse(data);
}
