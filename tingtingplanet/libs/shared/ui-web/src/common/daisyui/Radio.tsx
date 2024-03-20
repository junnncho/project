"use client";
import { ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface RadioProps {
  value: string | number | null;
  className?: string;
  children: ReactNode | ReactElement | ReactElement[];
  onChange: (value: string, idx: number) => void;
}
export const Radio = ({ value, children, className, onChange }: RadioProps) => {
  return (
    <div className={twMerge(`flex items-center gap-2`, className)}>
      {(children as ReactElement[]).map((child, idx) => {
        return (
          <div className="flex items-center justify-center gap-1">
            <input
              type="radio"
              className="radio radio-primary radio-sm "
              checked={value === child.props.value || value === idx}
              onChange={() => onChange(child.props.value, idx)}
            />
            <button className="bg-transparent" onClick={() => onChange(child.props.value, idx)}>
              {child}
            </button>
          </div>
        );
        // }
      })}
    </div>
  );
};

interface ItemProps {
  value: string | number;
  children: ReactNode | ReactElement;
  className?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

const Item = ({ value, className, children }: ItemProps) => {
  return <div className={twMerge("", className)}>{children}</div>;
};
Radio.Item = Item;
