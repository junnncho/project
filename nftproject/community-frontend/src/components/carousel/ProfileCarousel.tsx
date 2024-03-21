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

export const ProfileCarousel = ({ data }: { data: string[][] }) => {
  return (
    <div className="ProfileCarousel">
      <CarouselProvider
        className="Provider"
        naturalSlideWidth={120}
        naturalSlideHeight={25}
        totalSlides={data.length}
      >
        <ButtonBack className="arrow left">
          <div className="circle">
            <i className="bx bxs-chevron-left"></i>
          </div>
        </ButtonBack>
        <Slider className="Slider">
          {data.map((item, index) => (
            <Slide index={index}>
              <div className="box">
                {item.map((item2, index2) => (
                  <Element src={item2} />
                ))}
              </div>
            </Slide>
          ))}
        </Slider>

        <ButtonNext className="arrow right">
          <div className="circle">
            <i className="bx bxs-chevron-right"></i>
          </div>
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};
