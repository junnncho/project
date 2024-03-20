import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface ChatRoomLoadingProps {
  className?: string;
}
export const ChatRoomLoading = ({ className }: ChatRoomLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
