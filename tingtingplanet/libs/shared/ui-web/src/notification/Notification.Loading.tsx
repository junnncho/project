import { Skeleton } from "@shared/ui-web";
import { usePage } from "@shared/data-access";

interface NotificationLoadingProps {
  className?: string;
}
export const NotificationLoading = ({ className }: NotificationLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
