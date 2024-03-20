import { AiOutlinePlus } from "react-icons/ai";
import { Board, Story } from "..";
import { DataItem, LoadItems } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const BoardItem = ({
  className,
  board,
  slice = st.slice.board,
  actions,
  columns,
}: ModelProps<slice.BoardSlice, gql.LightBoard>) => {
  return (
    <DataItem
      className={className}
      title={`${board.name}`}
      model={board}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
interface BoardItemAbstractByNameProps {
  className?: string;
  slice?: slice.BoardSlice;
  storySlice: slice.StorySlice;
  name: string;
}
const BoardItemAbstractByName = ({
  className,
  slice = st.slice.board,
  storySlice,
  name,
}: BoardItemAbstractByNameProps) => {
  const router = useRouter();
  const boardList = slice.use.boardList();
  const [board] = boardList === "loading" ? ["loading" as const] : gql.Board.getFromNames(boardList, [name]);
  return (
    <div className="p-4 border border-gray-200 rounded-md">
      {board === "loading" ? (
        <Board.Loading />
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold">{board.name}</h3>
            <Link href={`/board/${board.id}`} passHref>
              <button className="gap-1 btn btn-outline btn-sm">
                <AiOutlinePlus className="text-xs" />
                More
              </button>
            </Link>
          </div>
          <hr className="border-[0.5px] border-gray-300" />
          {board.viewStyle === "list" && (
            <Story.List.Abstract slice={storySlice} init={{ query: { root: board.id }, limit: 8 }} />
          )}
          {board.viewStyle === "youtube" && (
            <LoadItems
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
              slice={storySlice}
              init={{ query: { root: board.id }, limit: 8 }}
              renderItem={(story: gql.LightStory, idx) => (
                <Story.Item.Youtube
                  story={story}
                  idx={idx}
                  onClick={() => router.push(`/${story.rootType}/${story.root}/story/${story.id}`)}
                />
              )}
            />
          )}
        </>
      )}
    </div>
  );
};
BoardItem.AbstractByName = BoardItemAbstractByName;
