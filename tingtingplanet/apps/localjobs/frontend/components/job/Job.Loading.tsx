import { Skeleton } from "@shared/ui-web";

interface JobLoadingProps {
  className?: string;
}
export const JobLoading = ({ className }: JobLoadingProps) => {
  // const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
