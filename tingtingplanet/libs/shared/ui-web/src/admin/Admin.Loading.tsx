import { Skeleton } from "@shared/ui-web";
import { usePage } from "@shared/data-access";

interface AdminLoadingProps {
  className?: string;
}
export const AdminLoading = ({ className }: AdminLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
