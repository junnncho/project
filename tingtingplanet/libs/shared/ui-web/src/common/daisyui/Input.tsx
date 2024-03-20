"use client";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import React, { InputHTMLAttributes, KeyboardEvent, RefObject, TextareaHTMLAttributes, useRef } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value"> & {
  status?: "error" | "warning" | "success" | "";
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement>;
  value: string | number | null;
  validate?: (value: any) => boolean;
  inputClassName?: string;
  invalidMessage?: string;
};
export const Input = ({
  className,
  status,
  onPressEnter,
  inputRef,
  value,
  validate,
  inputClassName,
  invalidMessage,
  ...rest
}: InputProps) => {
  const statusClass =
    status === "error"
      ? "input-error"
      : status === "warning"
      ? "input-warning"
      : status === "success"
      ? "input-success"
      : "";
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && event.key === "Enter") onPressEnter(event);
  };
  return (
    <div className={twMerge("", className)}>
      <input
        {...rest}
        ref={inputRef}
        value={value ?? ""}
        onKeyDown={handleKeyDown}
        className={twMerge(
          " input input-bordered duration-300 focus:outline-none placeholder:text-gray-200",
          statusClass,
          inputClassName
        )}
      />

      {invalidMessage && typeof validate !== "undefined" && (
        <div
          className={twMerge(
            `text-xs  text-red-500 text-end duration-300`,
            validate && value && !(typeof value === "string" && !value.length) && !validate(value)
              ? " opacity-100 "
              : " opacity-0"
          )}
        >
          {invalidMessage}
        </div>
      )}
    </div>
  );
};

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  onPressEnter?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};
const TextArea = ({ className, onPressEnter, ...rest }: TextAreaProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onPressEnter && event.key === "Enter") onPressEnter(event);
  };
  return (
    <textarea
      {...rest}
      onKeyDown={handleKeyDown}
      className={twMerge("textarea textarea-bordered focus:outline-none", className)}
    />
  );
};
Input.TextArea = TextArea;

type PasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  status?: "error" | "warning" | "success" | "";
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  validate?: (value: any) => boolean;
  inputClassName?: string;
  invalidMessage?: string;
};
const Password = ({
  className,
  status,
  validate,
  value,
  onPressEnter,
  inputClassName,
  invalidMessage,
  ...rest
}: PasswordProps) => {
  const statusClass =
    status === "error"
      ? "input-error"
      : status === "warning"
      ? "input-warning"
      : status === "success"
      ? "input-success"
      : "";
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && event.key === "Enter") onPressEnter(event);
  };

  return (
    <div className={twMerge("", className)}>
      <input
        {...rest}
        value={value ?? ""}
        type="password"
        onKeyDown={handleKeyDown}
        className={twMerge(
          " input input-bordered duration-300 focus:outline-none placeholder:text-gray-200",
          statusClass,
          inputClassName
        )}
      />
      {invalidMessage && typeof validate !== "undefined" && (
        <div
          className={twMerge(
            `text-xs text-red-500 text-end duration-300`,
            validate && value && !(typeof value === "string" && !value.length) && !validate(value)
              ? " opacity-100 "
              : " opacity-0"
          )}
        >
          {invalidMessage}
        </div>
      )}
    </div>
  );
};
Input.Password = Password;

type InputNumberProps = InputHTMLAttributes<HTMLInputElement> & {
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (value: number) => void;
};
export const Number = ({ className, onPressEnter, onChange, ...rest }: InputNumberProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && event.key === "Enter") {
      onPressEnter(event);
    }
  };

  const handleChange = (e) => {
    const inputVal = parseInt(e.target.value);
    if (!isNaN(inputVal)) {
      onChange(inputVal);
    }
  };

  return (
    <input
      {...rest}
      type="number"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className={twMerge("input input-bordered", className)}
    />
  );
};
Input.Number = Number;

type SearchProps = InputHTMLAttributes<HTMLInputElement> & {
  enterButton?: boolean;
  onSearch: (value: string) => void;
  buttonClassName?: string;
};
const Search = ({ className, onSearch, buttonClassName, enterButton, ...rest }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onSearch(inputRef.current?.value || "");
  };
  return (
    <div className="flex">
      <input
        {...rest}
        ref={inputRef}
        type="text"
        className={twMerge("input input-bordered rounded-r-none focus:outline-none", className)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => onSearch(inputRef.current?.value || "")}
        className={twMerge("px-4 align-middle rounded-l-none btn btn-primary", buttonClassName)}
      >
        <BiSearch />
      </button>
    </div>
  );
};
Input.Search = Search;
