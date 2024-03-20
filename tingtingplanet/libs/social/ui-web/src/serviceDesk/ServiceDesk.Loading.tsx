import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface ServiceDeskLoadingProps {
  className?: string;
}
export const ServiceDeskLoading = ({ className }: ServiceDeskLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
