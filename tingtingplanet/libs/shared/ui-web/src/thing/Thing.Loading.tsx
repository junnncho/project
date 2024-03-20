import { Skeleton } from "@shared/ui-web";
import { usePage } from "@shared/data-access";

interface ThingLoadingProps {
  className?: string;
}
export const ThingLoading = ({ className }: ThingLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
