import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface ActionLogLoadingProps {
  className?: string;
}
export const ActionLogLoading = ({ className }: ActionLogLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
