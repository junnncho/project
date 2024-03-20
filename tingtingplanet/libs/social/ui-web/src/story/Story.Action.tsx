import {
  AiFillDislike,
  AiFillLike,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineLike,
  AiOutlineRedo,
} from "react-icons/ai";
import { gql, slice, st, usePage } from "@social/data-access";
import { pageMap } from "@shared/util-client";
import { useRouter } from "next/navigation";

interface ApproveProps {
  slice?: slice.StorySlice;
  story: gql.LightStory;
  idx?: number;
}
export const Approve = ({ slice = st.slice.story, story, idx }: ApproveProps) => {
  return (
    <button className="gap-2 btn btn-primary btn-sm" onClick={() => slice.do.approveStory(story.id, idx)}>
      <AiOutlineCheckCircle />
      Approve
    </button>
  );
};

interface DenyProps {
  slice?: slice.StorySlice;
  story: gql.LightStory;
  idx?: number;
}
export const Deny = ({ slice = st.slice.story, story, idx }: DenyProps) => {
  return (
    <button
      className="border-dashed btn btn-warning btn-outline btn-sm"
      onClick={() => slice.do.denyStory(story.id, idx)}
    >
      <AiOutlineCloseCircle />
      Deny
    </button>
  );
};

interface LikeProps {
  slice?: slice.StorySlice;
  story: gql.Story;
}
export const Like = ({ slice = st.slice.story, story }: LikeProps) => {
  const { l } = usePage();
  return (
    <>
      <button
        className={`mx-1 btn  ${story.like > 0 ? "btn-primary" : "btn-outline"}`}
        onClick={() => {
          story.like <= 0 ? slice.do.likeStory() : slice.do.resetLikeStory();
        }}
      >
        {story.like > 0 ? <AiFillLike /> : <AiOutlineLike />}
        <span className="ml-1">
          {l("story.like")} {story.totalStat.likes || ""}
        </span>
      </button>
      <button
        className={`mx-1 btn  ${story.like < 0 ? "btn-primary" : "btn-outline"}`}
        onClick={() => {
          story.like >= 0 ? slice.do.unlikeStory() : slice.do.resetLikeStory();
        }}
      >
        {story.like < 0 ? <AiFillDislike /> : <AiOutlineDislike />}
      </button>
    </>
  );
};

interface CategoryProps {
  slice?: slice.StorySlice;
  board: gql.LightBoard;
}
export const Category = ({ slice = st.slice.story, board }: CategoryProps) => {
  const queryOfStory = slice.use.queryOfStory();
  return (
    <>
      {board.categories.length ? (
        <button
          className={`px-2 py-1 border border-white/50 cursor-pointer whitespace-nowrap ${
            !queryOfStory.category && "bg-white text-color-main"
          }`}
          onClick={() => slice.do.setQueryOfStory({ ...queryOfStory, category: undefined })}
        >
          All
        </button>
      ) : null}
      {board.categories.map((category) => (
        <button
          key={category}
          className={`px-2 py-1 border border-white/50 cursor-pointer whitespace-nowrap  text-sm ${
            queryOfStory.category === category && "bg-white text-color-main"
          }`}
          onClick={() => slice.do.setQueryOfStory({ ...queryOfStory, category })}
        >
          {category}
        </button>
      ))}
    </>
  );
};
interface WriteProps {
  root: string;
  rootType: string;
  canWrite?: boolean;
  writeButtonProps?: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  slice: slice.StorySlice;
}
export const Write = ({ root, rootType, canWrite = true, slice, writeButtonProps = {} }: WriteProps) => {
  const { l } = usePage();
  const router = useRouter();

  return (
    <>
      <button
        className="relative mx-4 btn btn-outline btn-square"
        onClick={() => slice.do.refreshStory({ invalidate: true })}
      >
        <AiOutlineRedo />
      </button>
      <button
        className="gap-2 btn btn-secondary"
        {...writeButtonProps}
        onClick={() => (canWrite ? router.push(`/${rootType}/${root}/story/new`) : pageMap.unauthorize())}
      >
        <AiOutlineEdit />
        {l("story.write")}
      </button>
    </>
  );
};
