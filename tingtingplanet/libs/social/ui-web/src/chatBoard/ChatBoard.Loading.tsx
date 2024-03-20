import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface ChatBoardLoadingProps {
  className?: string;
}
export const ChatBoardLoading = ({ className }: ChatBoardLoadingProps) => {
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
