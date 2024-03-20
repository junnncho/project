import * as gql from "../gql";
import { Get, SetPick, Slice, createActions, createSlicer, createState } from "@shared/util-client";

// ? Slice는 재사용가능한 상태와 액션을 정의합니다. 외부 상태를 가져다쓰지 않는 경우에만 사용하세요.
// * 1. State에 대한 내용을 정의하세요.
const state = (setget, suffix: string) => ({
  ...createState(gql.storyGraphQL),
  ...createActions(gql.storyGraphQL, setget, suffix),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, pick }: SetPick<typeof state>, suffix: string) => ({
  likeStory: async () => {
    const { story } = pick("story");
    const newStory = gql.crystalizeStory(story);
    if (newStory.setLike()) gql.likeStory(story.id);
    set({ story: newStory });
  },
  resetLikeStory: async () => {
    const { story } = pick("story");
    const newStory = gql.crystalizeStory(story);
    if (newStory.resetLike()) gql.resetLikeStory(story.id);
    set({ story: newStory });
  },
  unlikeStory: async () => {
    const { story } = pick("story");
    const newStory = gql.crystalizeStory(story);
    if (newStory.unlike()) gql.unlikeStory(story.id);
    set({ story: newStory });
  },
  approveStory: async (id: string, idx?: number) => {
    const story = await gql.approveStory(id);
    if (idx === undefined) return set({ story });
    const { storyList } = pick("storyList");
    set({ storyList: storyList.map((u, i) => (i === idx ? story : u)) });
  },
  denyStory: async (id: string, idx?: number) => {
    const story = await gql.denyStory(id);
    if (idx === undefined) return set({ story });
    const { storyList } = pick("storyList");
    set({ storyList: storyList.map((u, i) => (i === idx ? story : u)) });
  },
});

export type StorySliceState = Get<typeof state, typeof actions>;
export type StorySlice = Slice<"story", StorySliceState>;
export const makeStorySlice = createSlicer("story" as const, state, actions);
