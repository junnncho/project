import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface BoardLoadingProps {
  className?: string;
}
export const BoardLoading = ({ className }: BoardLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
