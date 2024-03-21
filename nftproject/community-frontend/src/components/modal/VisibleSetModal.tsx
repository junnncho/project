import { useEffect } from "react";
import { VisibleSetModalProps } from "src/props";

export const VisibleSetModal = ({
  isVisible,
  setVisible,
  children,
}: VisibleSetModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {isVisible ? (
        <div
          className="ContentModal"
          onClick={(e) => {
            setVisible(false);
            e.stopPropagation();
          }}
        >
          {children}
          <div
            className="x-button"
            onClick={(e) => {
              setVisible(false);
              e.stopPropagation();
            }}
          >
            <i className="bx bx-x-circle"></i>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
