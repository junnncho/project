import * as gql from "../gql";
import { Get, SetPick, Slice, createActions, createSlicer, createState } from "@shared/util-client";

// ? Slice는 재사용가능한 상태와 액션을 정의합니다. 외부 상태를 가져다쓰지 않는 경우에만 사용하세요.
// * 1. State에 대한 내용을 정의하세요.
const state = (setget, suffix: string) => ({
  ...createState(gql.chatBoardGraphQL),
  ...createActions(gql.chatBoardGraphQL, setget, suffix),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, pick }: SetPick<typeof state>, suffix: string) => ({
  sendChat: async (chat: string) => {
    const { chatBoard } = pick("chatBoard");
    console.log(chatBoard);
    await gql.newChat(chatBoard.id, chat || " ");
    return;
  },

  // recieveChat: async (chat: gql.Chat, chatBoardId) => {
  //   const { chatBoard } = pick("chatBoard");
  //   const { chatBoardList } = pick("chatBoardList");
  //   const idx = chatBoardList.findIndex((u) => u.id === chatBoard.id);
  //   if (idx !== -1) {
  //     chatBoardList[idx].recentRoom.chats.push(chat);
  //     const recentBoard = chatBoardList.splice(idx, 1)[0];
  //     chatBoardList.unshift(recentBoard);
  //   }
  //   if (chatBoard.id === chatBoardId) {
  //     chatBoard.recentRoom.chats.push(chat);
  //   }
  //   set({ chatBoardList: [...chatBoardList], chatBoard: { ...chatBoard } });
  // },

  joinChatBoard: async (chatBoardId: string) => {
    const newChatBaord = await gql.joinChatBoard(chatBoardId);
    return;
  },

  kickChatBoard: async (chatBoardId: string, userId: string) => {
    return await gql.kickChatBoard(chatBoardId, userId);
  },
  exitChatBoard: async (chatBoardId: string) => {
    console.log("exitChatBoard", chatBoardId);
    if (await gql.exitChatBoard(chatBoardId)) {
      try {
        const { chatBoard } = pick("chatBoard");
        if (chatBoard.id === chatBoardId) {
          set({ chatBoard: "loading" });
        }
      } catch (e) {
        console.log(e.message);
      }
      try {
        const { chatBoardList } = pick("chatBoardList");
        const idx = chatBoardList.findIndex((u) => u.id === chatBoardId);
        if (idx !== -1) {
          chatBoardList.splice(idx, 1);
        }
        set({ chatBoardList: [...chatBoardList] });
      } catch (e) {
        console.log(e.message);
      }
    }
    return;
  },
  generateChatBoard: async (userIds: string[], roomName: string) => {
    const genChat = await gql.generateChatBoard(userIds, roomName);
    console.log("asdf", genChat);
    return genChat;
  },
  receiveRecentRoom: async (room: gql.ChatRoom, chatBoardId) => {
    try {
      const { chatBoard } = pick("chatBoard");
      if (chatBoard.id === chatBoardId) {
        set({ chatBoard: { ...chatBoard, recentRoom: room } });
      }
    } catch (e) {
      console.log(e.message);
    }
    try {
      const { chatBoardList } = pick("chatBoardList");
      const idx = chatBoardList.findIndex((u) => u.id === chatBoardId);
      if (idx !== -1) {
        chatBoardList[idx].recentRoom = room;
      }
      chatBoardList.unshift(chatBoardList[idx]);
      chatBoardList.splice(idx + 1, 1);
      set({ chatBoardList: [...chatBoardList] });
    } catch (e) {
      console.log(e);
    }
  },
  inviteChatBoard: async (chatBoardId: string, userId: string) => {
    const newChatBoard = await gql.inviteChatBoard(chatBoardId, userId);
    return;
  },

  receiveChatBoard: async (board: gql.ChatBoard) => {
    try {
      const { chatBoardList } = pick("chatBoardList");
      set({ chatBoardList: [board, ...chatBoardList] });
      console.log("receiveChatBoard", board, pick("chatBoardList"));
    } catch (e) {
      set({ chatBoardList: [board] });
      console.log("receiveChatBoardfaiul..", board, pick("chatBoardList"));
      console.log(e.message);
    }
  },
  //
});

export type ChatBoardSliceState = Get<typeof state, typeof actions>;
export type ChatBoardSlice = Slice<"chatBoard", ChatBoardSliceState>;
export const makeChatBoardSlice = createSlicer("chatBoard" as const, state, actions);
