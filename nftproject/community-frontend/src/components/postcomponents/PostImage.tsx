import { useAppDispatch } from "../hooks";
import { ReduxPictureModal } from "../modal";
import { setModal, setVisible } from "src/redux/actions/modal";
import { img, PostPictureModalProps } from "src/props";
import { PictureCarousel } from "../carousel";
import { ImgDeleteButton } from "../buttons";
export const PostImage = ({
  imgs,
  className = "",
}: {
  imgs: img[];
  className: string;
}) => {
  const dispatch = useAppDispatch();
  const enlarge = (idx: number, pictures: string[]) => {
    dispatch(
      setModal(ReduxPictureModal, {
        imgs: pictures,
        index: idx,
      } as PostPictureModalProps)
    );
    dispatch(setVisible(true));
  };

  return (
    <div className={className}>
      <div className="post-imgs">
        {imgs.length < 4 ? (
          imgs.map((url, index) => (
            <div
              className="post-img"
              style={{ paddingTop: `${100 / imgs.length}%` }}
            >
              <img
                src={url[1]}
                onClick={() =>
                  enlarge(
                    index,
                    imgs.map((url) => url[1])
                  )
                }
              />
            </div>
          ))
        ) : (
          <PictureCarousel pictures={imgs.map((url) => url[1])} />
        )}
      </div>
    </div>
  );
};

export const PostedImage = ({
  imgs,
  className = "",
  setImgs,
}: {
  imgs: [string[], string[], number[]];
  className: string;
  setImgs: (imgs: [string[], string[], number[]]) => void;
}) => {
  const dispatch = useAppDispatch();
  const enlarge = (idx: number, pictures: string[]) => {
    dispatch(
      setModal(ReduxPictureModal, {
        imgs: pictures,
        index: idx,
      } as PostPictureModalProps)
    );
    dispatch(setVisible(true));
  };

  return (
    <div className={className}>
      <div className="post-imgs posted">
        {imgs[1].length < 4 ? (
          imgs[1].map((url, index) => (
            <div key={url} className="post-img ">
              <ImgDeleteButton setImgs={setImgs} imgs={imgs} index={index}>
                <i style={{ fontSize: "1.5em" }} className="bx bx-trash"></i>
              </ImgDeleteButton>
              <img src={url} onClick={() => enlarge(index, imgs[1])} />
            </div>
          ))
        ) : (
          <PictureCarousel pictures={imgs[1]} />
        )}
      </div>
    </div>
  );
};
