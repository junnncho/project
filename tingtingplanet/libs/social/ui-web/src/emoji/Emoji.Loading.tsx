import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface EmojiLoadingProps {
  className?: string;
}
export const EmojiLoading = ({ className }: EmojiLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
