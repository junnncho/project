import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export const EmptyProfile = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("flex items-center justify-center w-10 h-10 text-2xl bg-gray-300 rounded-full", className)}>
      <AiOutlineUser style={{ color: "white" }} />
    </div>
  );
};

export const RemovedProfile = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center w-6 h-6 text-gray-300 text-2xl bg-white rounded-full",
        className
      )}
    >
      <AiOutlineClose />
    </div>
  );
};
