import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface CommentLoadingProps {
  className?: string;
}
export const CommentLoading = ({ className }: CommentLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
