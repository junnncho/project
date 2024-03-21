import { useState } from "react";
import { OptionSelectModal } from "../modal";
import { PostProps } from "src/props";

export const PostOptionButton = ({
  post,
  isUnit,
  index,
  postLocation,
}: PostProps) => {
  const [option, setOption] = useState<boolean>(false);
  return (
    <div>
      <button
        className="OptionButton"
        onClick={(e) => {
          setOption(true);
          e.stopPropagation();
        }}
      >
        <i
          className="bx bx-dots-horizontal-rounded"
          style={{ fontSize: "1.2em" }}
        ></i>
      </button>
      {option && (
        <OptionSelectModal
          post={post}
          modalState={option}
          setModalState={setOption}
        />
      )}
    </div>
  );
};
