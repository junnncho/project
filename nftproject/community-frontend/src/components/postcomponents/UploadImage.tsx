import { UploadedImageProps } from "src/props";
import { PictureCarouselDelete } from "../carousel";
export const UploadedImage = ({
  imgs,
  setImgs,
  deleteFunc,
}: UploadedImageProps) => {
  // 파일 저장
  return (
    <div className="UploadedImageWrapper">
      <PictureCarouselDelete imgs={imgs} setImgs={setImgs} />
    </div>
  );
};
