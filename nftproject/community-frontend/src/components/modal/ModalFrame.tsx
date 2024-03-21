import { useEffect } from "react";
import { setVisible } from "src/redux/actions/modal";
import { useAppDispatch } from "../hooks";
import { ModalProps } from "src/props";
import "./index.css";

export const Modal = ({ isVisible, setVisible, children }: ModalProps) => {
  return (
    <>
      {isVisible ? (
        <div className="Modalcontainer absolute">
          {/* <div className="title">modal </div>
          <div className="contents">this is modal</div> */}
          {children}
          <div className="buttons">
            <div className="button yes">yes</div>
            <div className="button no">no</div>
          </div>
        </div>
      ) : (
        <>
          <></>
        </>
      )}
    </>
  );
};

export const ContentModal = ({ children }: ModalProps) => {
  return <div className="ContentModal">{children}</div>;
};
const scrollController = () => {
  document.body.style.overflow = `hidden`;
  return (document.body.style.overflow = `auto`);
};
export const ContentMainModal = ({ children }: ModalProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="ContentModal"
      onClick={() => {
        dispatch(setVisible(false));
      }}
    >
      {children}
      <div
        className="x-button"
        onClick={() => {
          dispatch(setVisible(false));
        }}
      >
        <i className="bx bx-x-circle"></i>
      </div>
    </div>
  );
};
