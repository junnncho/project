"use client";
import { ReactNode, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type DropdownProps = {
  value: ReactNode;
  content: ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
};

export const Dropdown = ({ value, content, className, buttonClassName, dropdownClassName }: DropdownProps) => {
  const dropdownContentRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!dropdownContentRef.current) return;
    dropdownContentRef.current.addEventListener("click", () => {
      if (!document || !document.activeElement) return;
      (document.activeElement as HTMLElement).blur();
    });
  }, []);

  return (
    <div className={twMerge("dropdown dropdown-end", className)}>
      <label tabIndex={0} className={twMerge("flex  btn ", buttonClassName)}>
        {value}
      </label>
      <ul
        tabIndex={0}
        ref={dropdownContentRef}
        className={twMerge(
          "dropdown-content whitespace-nowrap z-40 grid w-fit gap-2 p-2 px-3 my-2 overflow-auto rounded-md shadow md:scrollbar-thin md:scrollbar-thumb-rounded-md md:scrollbar-thumb-gray-300 md:scrollbar-track-transparent max-h-52 bg-base-100",
          dropdownClassName
        )}
      >
        {content}
      </ul>
    </div>
  );
};
