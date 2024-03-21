import { StoreSubscribe, StoreUser, StoreView, User } from ".";

export const users: User[] = [
  { id: "1", youtubeId: "@sweatyhand4725", giveView: 0, giveSubscribe: 0 },
  { id: "2", youtubeId: "@trader_manju", giveView: 0, giveSubscribe: 0 },
  { id: "3", youtubeId: "@ankuntour", giveView: 0, giveSubscribe: 0 },
];

export const storeUsers: StoreUser[] = [
  {
    id: "1",
    youtubeId: "@sweatyhand4725",
    giveView: 0,
    giveSubscribe: 0,
    name: "BASS DRUM PLAYLIST",
    profile:
      "https://yt3.googleusercontent.com/vrRWFQVv7Jg8Q0c5OjAVPA-8MZpFrjOg1nutZpkWpWkbdUefabcNn2x_mT4STEs-HLTpPSO-lw=s176-c-k-c0x00ffffff-no-rj",
    detail: "BASS DRUM 플레이리스트 올리는 계정입니다.",
  },
  {
    id: "2",
    youtubeId: "@trader_manju",
    giveView: 0,
    giveSubscribe: 0,
    name: "고세구 GOSEGU",
    profile:
      "https://yt3.googleusercontent.com/AIoO_0IdKYBdzlcRQ85oZxMaTBj_RVDvP8QmTmJZoOO_TTJd5NXql17hDfIl_bvcTQ4aAqFGIA=s176-c-k-c0x00ffffff-no-rj",
    detail: "고세구 GOSEGU는 트레이더 맨주의 유튜브 채널입니다.",
  },
  {
    id: "3",
    youtubeId: "@ankuntour",
    giveView: 0,
    giveSubscribe: 0,
    name: "JTBC News",
    profile:
      "https://yt3.googleusercontent.com/27a9C8CL0rcNXGJ5UbsDJLMFOl0PIgc-5JEk65z9I2ZygKe-MUtw-Lwi5TD5q1UDLz3AqCyKUg=s176-c-k-c0x00ffffff-no-rj",
    detail: "JTBC 뉴스 공식 유튜브 채널입니다.",
  },
];

export const storeViews: StoreView[] = [
  // { id: "1", youtubeId: "RO7lM6jHIZw", owner: users[0], complete: false },
  // { id: "2", youtubeId: "TwKjZ5YH5ng", owner: users[1], complete: false },
  { id: "3", youtubeId: "9ygdZqx9JUc", owner: users[1], complete: true },
  { id: "4", youtubeId: "1ip2OkGjTAI", owner: users[1], complete: false },
  // { id: "5", youtubeId: "cFSYbK_W8go", owner: users[1], complete: false },
  // { id: "6", youtubeId: "KaVY6qOjr2o", owner: users[1], complete: false },
  // { id: "1", youtubeId: "RO7lM6jHIZw", owner: users[0], complete: false },
  // { id: "2", youtubeId: "TwKjZ5YH5ng", owner: users[1], complete: false },
  // { id: "3", youtubeId: "9ygdZqx9JUc", owner: users[1], complete: true },
  // { id: "4", youtubeId: "1ip2OkGjTAI", owner: users[1], complete: false },
  // { id: "5", youtubeId: "cFSYbK_W8go", owner: users[1], complete: false },
  // { id: "6", youtubeId: "KaVY6qOjr2o", owner: users[1], complete: false },
  // { id: "1", youtubeId: "RO7lM6jHIZw", owner: users[0], complete: false },
  // { id: "2", youtubeId: "TwKjZ5YH5ng", owner: users[1], complete: false },
  // { id: "3", youtubeId: "9ygdZqx9JUc", owner: users[1], complete: true },
  // { id: "4", youtubeId: "1ip2OkGjTAI", owner: users[1], complete: false },
  // { id: "5", youtubeId: "cFSYbK_W8go", owner: users[1], complete: false },
  // { id: "6", youtubeId: "KaVY6qOjr2o", owner: users[1], complete: false },
  // { id: "1", youtubeId: "RO7lM6jHIZw", owner: users[0], complete: false },
  // { id: "2", youtubeId: "TwKjZ5YH5ng", owner: users[1], complete: false },
  // { id: "3", youtubeId: "9ygdZqx9JUc", owner: users[1], complete: true },
  // { id: "4", youtubeId: "1ip2OkGjTAI", owner: users[1], complete: false },
  // { id: "5", youtubeId: "cFSYbK_W8go", owner: users[1], complete: false },
  // { id: "6", youtubeId: "KaVY6qOjr2o", owner: users[1], complete: false },
  // { id: "1", youtubeId: "RO7lM6jHIZw", owner: users[0], complete: false },
  // { id: "2", youtubeId: "TwKjZ5YH5ng", owner: users[1], complete: false },
  // { id: "3", youtubeId: "9ygdZqx9JUc", owner: users[1], complete: true },
  // { id: "4", youtubeId: "1ip2OkGjTAI", owner: users[1], complete: false },
  // { id: "5", youtubeId: "cFSYbK_W8go", owner: users[1], complete: false },
  // { id: "6", youtubeId: "KaVY6qOjr2o", owner: users[1], complete: false },
];

export const storeSubscribes: StoreSubscribe[] = [
  { owner: storeUsers[0], complete: false },
  { owner: storeUsers[1], complete: false },
  { owner: storeUsers[2], complete: false },
];
