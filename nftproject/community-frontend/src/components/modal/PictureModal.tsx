import { setVisible } from "src/redux/actions/modal";
import { PostCarousel } from "../carousel";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PicrtureModalProps, ReduxPicrtureModalProps } from "src/props";
import { ContentModal } from "./ModalFrame";

export const PictureModal = ({
  ismodalView,
  setModalView,
  img,
}: PicrtureModalProps) => {
  return (
    <>
      {ismodalView ? (
        <ContentModal setVisible={setModalView} isVisible={ismodalView}>
          <img
            src={img}
            className="Bigprofile"
            onClick={() => {
              setModalView(false);
            }}
          />
        </ContentModal>
      ) : (
        <>
          <></>
        </>
      )}
    </>
  );
};

export const ReduxPictureModal = () => {
  const props = useAppSelector((state) => state.ModalReducer.props);
  const dispatch = useAppDispatch();
  console.log("heres redux picture modal ", props);
  return (
    <>
      <PostCarousel data={props.imgs} index={props.index} />
    </>
  );
};
export const SolePictureModal = () => {
  const props = useAppSelector((state) => state.ModalReducer.props);
  const dispatch = useAppDispatch();
  return (
    <>
      <img src={props.img}></img>
    </>
  );
};

// export const ReduxPictureModal = () => {
//   const props = useAppSelector((state) => state.ModalReducer.props);
//   const dispatch = useAppDispatch();
//   return (
//     <>
//       <img
//         src={props.img}
//         className="Bigprofile"
//         onClick={() => {
//           dispatch(setVisible(0, false));
//         }}
//       />
//     </>
//   );
// };
