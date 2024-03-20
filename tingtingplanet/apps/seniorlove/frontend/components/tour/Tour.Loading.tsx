import { Skeleton } from "@shared/ui-web";

interface TourLoadingProps {
  className?: string;
}
export const TourLoading = ({ className }: TourLoadingProps) => {
  // const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
