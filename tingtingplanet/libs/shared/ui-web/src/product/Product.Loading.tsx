import { Skeleton } from "@shared/ui-web";
import { usePage } from "@shared/data-access";

interface ProductLoadingProps {
  className?: string;
}
export const ProductLoading = ({ className }: ProductLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};
