import { Skeleton } from "@shared/ui-web";
import { twMerge } from "tailwind-merge";

interface SkeletonListProps {
  num: number;
  width?: number;
  height: number;
  className?: string;
}
export const SkeletonList = ({ num, width, height, className }: SkeletonListProps) => {
  const widthClass = width ? `w-[${width}px]` : "w-full";
  return (
    <div className="flex flex-wrap gap-5">
      {new Array(num).fill(0).map((_, index) => (
        <div key={index} className={twMerge("block w-full overflow-hidden rounded relative", widthClass, className)}>
          <Skeleton.Button active style={{ height: height, width: width || "100%" }} />
        </div>
      ))}
    </div>
  );
};
