"use client";
import { animated, useSpring } from "@react-spring/web";
import { twMerge } from "tailwind-merge";
import { usePage } from "@shared/data-access";
import React, { ButtonHTMLAttributes, ReactNode, useEffect } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

type ModalProps = {
  title?: ReactNode;
  open: boolean;
  width?: string | number;
  onOk?: () => void;
  onCancel: () => void;
  footer?: ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  className?: string;
  children: ReactNode;
};

export const Modal = ({
  title,
  open,
  width = "520px",
  onOk,
  onCancel,
  footer,
  okButtonProps,
  cancelButtonProps,
  className = "",
  children,
}: ModalProps) => {
  const { l } = usePage();

  useEffect(() => {
    //! 이거 좀 이상함. 모달 열고 닫을때마다 스크롤이 안되는 문제가 있음.
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [open]);

  const handleCloseModal = () => {
    onCancel();
  };

  const handleOk = () => {
    onOk && onOk();
    handleCloseModal();
  };

  const bgProps = useSpring({
    backgroundColor: open ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
    from: { backgroundColor: "rgba(0, 0, 0, 0)" },
  });

  const modalProps = useSpring({
    opacity: open ? 1 : 0,
    scale: open ? 1 : 0.8,
    from: { opacity: 0, scale: 0.8 },
  });

  if (!open) return null;

  return (
    <animated.div
      className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full overflow-hidden"
      style={bgProps}
      onClick={handleCloseModal}
    >
      <animated.div
        className={twMerge("p-5 bg-white rounded-lg relative max-h-[80%] overflow-y-auto", className)}
        style={{ width: width, ...modalProps }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleCloseModal} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-3">
          ✕
        </button>
        {title && <div className="mb-4 text-lg font-bold">{title}</div>}
        {children}
        {footer || footer === null ? (
          <div>{footer}</div>
        ) : (
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-outline btn-sm" onClick={handleCloseModal} {...cancelButtonProps}>
              취소
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleOk} {...okButtonProps}>
              변경
            </button>
          </div>
        )}
      </animated.div>
    </animated.div>
  );
};
