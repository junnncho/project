import { Skeleton } from "@shared/ui-web";

interface QuestLoadingProps {
  className?: string;
}
export const QuestLoading = ({ className }: QuestLoadingProps) => {
  // const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
