import { Skeleton } from "@shared/ui-web";
import { usePage } from "@shared/data-access";

interface CurrencyLoadingProps {
  className?: string;
}
export const CurrencyLoading = ({ className }: CurrencyLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
