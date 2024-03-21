import {
  CarouselProvider,
  ButtonBack,
  Slider,
  Slide,
  ButtonNext,
} from "pure-react-carousel";
import { setModal, setVisible } from "src/redux/actions/modal";
import { ImgDeleteButton } from "../buttons";
import { useAppDispatch } from "../hooks";
import { SolePictureModal } from "../modal";
import {
  PicrtureModalProps,
  PictureCarouselDeleteProps,
  PictureCarouselProps,
} from "src/props";

//일단은 사용하지 않음
export const PictureCarousel = ({ pictures }: PictureCarouselProps) => {
  const dispatch = useAppDispatch();
  console.log(pictures);
  if (pictures.length === 0) {
    return <></>;
  }
  return (
    <div
      className="PictureCarousel backgrounded"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CarouselProvider
        className="Provider"
        naturalSlideWidth={4}
        naturalSlideHeight={3}
        totalSlides={pictures.length}
      >
        <ButtonBack className="arrow left">
          <div className="circle">
            <i className="bx bxs-chevron-left"></i>
          </div>
        </ButtonBack>
        <Slider className="Slider">
          {pictures.map((item, index) => (
            <Slide index={index}>
              <div className="box">
                <img
                  className="element"
                  src={item}
                  onClick={() => {
                    dispatch(
                      setModal(SolePictureModal, {
                        img: item,
                      } as PicrtureModalProps)
                    );
                    dispatch(setVisible(true));
                  }}
                />
              </div>
            </Slide>
          ))}
        </Slider>
        <ButtonNext className="arrow right">
          <div className="circle ">
            <i className="bx bxs-chevron-right"></i>
          </div>
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};

export const PictureCarouselDelete = ({
  imgs,
  setImgs,
}: PictureCarouselDeleteProps) => {
  const dispatch = useAppDispatch();
  console.log(imgs);
  if (imgs[0].length === 0) {
    return <></>;
  }
  return (
    <div className="PictureCarousel backgrounded" onClick={(e) => {}}>
      <CarouselProvider
        className="Provider"
        naturalSlideWidth={4}
        naturalSlideHeight={3}
        totalSlides={imgs.length}
      >
        <ButtonBack className="arrow left">
          <div className="circle">
            <i className="bx bxs-chevron-left"></i>
          </div>
        </ButtonBack>
        <Slider className="Slider">
          {imgs[1].map((item, index) => (
            <li key={index}>
              <Slide index={index}>
                {index}th slide
                <div className="box">
                  <img
                    className="element"
                    src={item}
                    onClick={() => {
                      dispatch(
                        setModal(SolePictureModal, {
                          img: item,
                        } as PicrtureModalProps)
                      );
                      dispatch(setVisible(true));
                    }}
                  />
                  <button className="deleteButton">
                    <ImgDeleteButton
                      imgs={imgs}
                      setImgs={setImgs}
                      index={index}
                    >
                      <i
                        style={{ fontSize: "1.5em" }}
                        className="bx bx-trash"
                      ></i>
                    </ImgDeleteButton>
                  </button>
                </div>
              </Slide>
            </li>
          ))}
        </Slider>
        <ButtonNext className="arrow right">
          <div className="circle ">
            <i className="bx bxs-chevron-right"></i>
          </div>
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};
