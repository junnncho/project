import { RecentTime } from "@shared/ui-web";
import { gql, slice, st, usePage } from "@social/data-access";
import { twMerge } from "tailwind-merge";

interface CommentViewProps {
  className?: string;
  comment: gql.Comment;
  slice?: slice.CommentSlice;
}
// View를 작성하세요. 텍스트는 locale을 등록하여 사용하고, 내부 구현은 자유롭게 진행합니다.
export const CommentView = ({ className, comment, slice = st.slice.comment }: CommentViewProps) => {
  const { l } = usePage();
  return (
    <div className={twMerge(className, ``)}>
      <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
        <h3>
          {l("comment.id")}-{comment.id}
        </h3>
      </div>
      <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
        <div>{comment.status}</div>
        <RecentTime
          date={comment.createdAt}
          breakUnit="second"
          timeOption={{ dateStyle: "short", timeStyle: "short" }}
        />
      </div>
    </div>
  );
};
