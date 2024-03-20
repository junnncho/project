import * as Board from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";
import { useRouter } from "next/navigation";

export const BoardList = ({ slice = st.slice.board, init }: ModelsProps<slice.BoardSlice, gql.Board>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Board.Item}
      renderDashboard={Board.Stat}
      queryMap={gql.boardQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(board: DefaultOf<gql.Board>) => `${board.name}`}>
          <Board.Edit slice={slice} />
        </DataEditModal>
      }
      columns={["description", "viewStyle", "policy", "roles"]}
      actions={["edit", "remove"]}
    />
  );
};

const BoardListNav = ({
  slice = st.slice.board,
  init,
  boardNames,
}: ModelsProps<slice.BoardSlice, gql.Board> & { boardNames: string[] }) => {
  const router = useRouter();
  const board = slice.use.board();
  const boardList = slice.use.boardList();
  const navBoards = boardList === "loading" ? [] : gql.Board.getFromNames(boardList, boardNames);
  const checkIsActive = (id) => board !== "loading" && board.id === id;
  return (
    <div className="container hidden min-h-[36px] gap-5 md:flex">
      {navBoards.map((board) => (
        <button
          className={`py-2 hover:opacity-60 cursor-pointer transition duration-300 ${
            checkIsActive(board.id) && "border-b-2 border-color-main"
          }`}
          key={board.id}
          onClick={() => router.push(`/board/${board.id}`)}
        >
          {board.name}
        </button>
      ))}
    </div>
  );
};
BoardList.Nav = BoardListNav;
