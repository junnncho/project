import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface GroupCallLoadingProps {
  className?: string;
}
export const GroupCallLoading = ({ className }: GroupCallLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
