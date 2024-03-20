import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface ReportLoadingProps {
  className?: string;
}
export const ReportLoading = ({ className }: ReportLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
