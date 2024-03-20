import { AiOutlineArrowLeft, AiOutlineLeft } from "react-icons/ai";
import { Story } from "..";
import { gql, slice, st, usePage } from "@social/data-access";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

interface NavProps {
  className?: string;
  slice?: slice.BoardSlice;
  board: gql.LightBoard;
  self: gql.shared.User;
  writeButtonProps?: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  onClickBack?: () => void;
  hideAction?: boolean;
}
export const Nav = ({
  className,
  slice = st.slice.board,
  board,
  self,
  writeButtonProps = {},
  onClickBack,
  hideAction,
}: NavProps) => {
  const { l } = usePage();
  return (
    <div className="flex px-2">
      <h1 className={twMerge("text-3xl md:pr-10 whitespace-nowrap flex gap-2 items-center", className)}>
        {onClickBack && <AiOutlineLeft onClick={onClickBack} />}
        <span># {board.name}</span>
      </h1>
      {!hideAction && (
        <div className="flex items-center justify-end w-full align-middle">
          {board.canWrite(self) || !self.id ? (
            <Story.Action.Write
              slice={st.slice.storyInBoard}
              root={board.id}
              rootType="board"
              writeButtonProps={writeButtonProps}
              canWrite={board.canWrite(self)}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

interface BackHeaderProps {
  board: gql.Board;
  className?: string;
}
export const BackHeader = ({ board, className }: BackHeaderProps) => {
  const router = useRouter();
  return (
    <div className={twMerge("ml-2 text-lg text-color-main", className)}>
      <button onClick={() => router.back()} className="">
        <AiOutlineArrowLeft />
      </button>
      {board.name}
    </div>
  );
};
