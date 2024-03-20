import * as gql from "../gql";
import { Get, SetPick, Slice, createActions, createSlicer, createState } from "@shared/util-client";

// ? Slice는 재사용가능한 상태와 액션을 정의합니다. 외부 상태를 가져다쓰지 않는 경우에만 사용하세요.
// * 1. State에 대한 내용을 정의하세요.
const state = (setget, suffix: string) => ({
  ...createState(gql.chatRoomGraphQL),
  ...createActions(gql.chatRoomGraphQL, setget, suffix),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, pick }: SetPick<typeof state>, suffix: string) => ({
  //
  // recieveChat: async (chat: Chat, chatBoardId) => {
  //   const { chatRoom } = pick("chatRoom");
  //   const { chatRoomList } = pick("chatRoomList");
  //   const idx = chatRoomList.findIndex((u) => u.root === chatRoom.id);
  //   if (idx !== -1) {
  //     chatRoomList[idx].chats.push(chat);
  //   }
  //   if (chatBoardId === chatRoom.root) {
  //     chatRoom.chats.push(chat);
  //   }
  //   set({ chatRoomList: [...chatRoomList], chatRoom: { ...chatRoom } });
  //   return;
  // },

  appendChatRoom: async (room: gql.LightChatRoom) => {
    const newChatRoomList: gql.LightChatRoom[] = [];
    try {
      const { chatRoomList } = pick("chatRoomList");
      newChatRoomList.push(...chatRoomList);
    } catch {
      console.log("chatRoomList is empty");
    }
    newChatRoomList.push(room);
    console.log(newChatRoomList, "heres appendchatRoomLIst");
    set({ chatRoomList: [...newChatRoomList] });
    return;
  },
  pushChatRoomList: async (room: gql.LightChatRoom[]) => {
    const newChatRoomList: gql.LightChatRoom[] = [];
    try {
      const { chatRoomList } = pick("chatRoomList");
      newChatRoomList.push(...chatRoomList);
    } catch {
      console.log("chatRoomList is empty");
    }
    newChatRoomList.unshift(...room);
    console.log(newChatRoomList);
    set({ chatRoomList: [...newChatRoomList] });
    return;
  },
  loadChatRooms: async (chatRoomId: string, limit: number) => {
    console.log("LOADCHATROOM");
    const newChatRoomList: gql.LightChatRoom[] = [];
    try {
      const { chatRoomList } = pick("chatRoomList");
      newChatRoomList.push(...chatRoomList);
    } catch {
      console.log("chatRoomList is empty");
    }
    const loadedChatRoomList: gql.LightChatRoom[] = await gql.loadChatRooms(chatRoomId, limit); //여기서 로드 await 걸어줘야함
    if (loadedChatRoomList.length === 0) return;
    newChatRoomList.unshift(...loadedChatRoomList);
    set({ chatRoomList: [...newChatRoomList] });
    return;
  },
});

export type ChatRoomSliceState = Get<typeof state, typeof actions>;
export type ChatRoomSlice = Slice<"chatRoom", ChatRoomSliceState>;
export const makeChatRoomSlice = createSlicer("chatRoom" as const, state, actions);
