import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { CommunitiesProps, ElementProps } from "src/props";

const Element = ({ src }: ElementProps) => {
  return <img className="element" src={src} />;
};

export const PostCarousel = ({
  data,
  index,
}: {
  data: string[];
  index: number;
}) => {
  console.log("heres post caraouce", data);
  return (
    <div
      className="PostCarousel"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CarouselProvider
        className="Provider"
        naturalSlideWidth={250}
        naturalSlideHeight={250}
        totalSlides={data.length ? data.length : 0}
        currentSlide={index}
      >
        <ButtonBack className="arrow left">
          <div className="circle">
            <i className="bx bxs-chevron-left-circle"></i>
          </div>
        </ButtonBack>
        <Slider className="Slider">
          {data.map((item, index) => (
            <Slide className="Slide" index={index}>
              <div className="box">
                <Element src={item} />
              </div>
            </Slide>
          ))}
        </Slider>

        <ButtonNext className="arrow right">
          <div className="circle">
            <i className="bx bxs-chevron-right-circle"></i>
          </div>
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};
