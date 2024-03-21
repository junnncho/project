import { ImageDeleteButtonProps, ImageUploadButtonProps } from "src/props";
export const ImgUploadButton = ({
  imgs,
  setImgs,
  children,
  isUnit,
  htmlId,
}: ImageUploadButtonProps) => {
  const saveFileImage = (e: any) => {
    if (isUnit) {
      setImgs([
        [e.target.files[0]],
        [URL.createObjectURL(e.target.files[0])],
        [0],
      ]);
    } else {
      imgs[0].length < 3 &&
        setImgs([
          [...imgs[0], e.target.files[0]],
          [...imgs[1], URL.createObjectURL(e.target.files[0])],
          [...imgs[2], 0],
        ]);
    }
  }; // state로 target-file array 생성
  return (
    <>
      <input
        className="editButton"
        style={{ display: "none" }}
        type="file"
        id={`editFile${htmlId}`}
        accept="image/*"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          saveFileImage(e);
        }}
      />
      <label htmlFor={`editFile${htmlId}`}>{children}</label>
    </>
  );
};

export const ImgDeleteButton = ({
  imgs,
  setImgs,
  children,
  index,
}: ImageDeleteButtonProps) => {
  const deleteFileImage = () => {
    const splicedImg = imgs[0];
    const splicedUrl = imgs[1];
    const splicedId = imgs[2];
    splicedImg.splice(index, 1);
    splicedUrl.splice(index, 1);
    splicedId.splice(index, 1);
    URL.revokeObjectURL(imgs[1][index]);
    setImgs([splicedImg, splicedUrl, splicedId]);
    console.log(imgs[0], imgs[1]);
    console.log(splicedImg, splicedUrl);
  };
  return (
    <div onClick={deleteFileImage}>
      {index}
      {children}
    </div>
  );
};
{
  /* <input
className="editButton"
style={{ display: "none" }}
type="file"
id="backGroundFile"
accept="image/*"
onClick={(e) => {
  e.stopPropagation();
}}
/> */
}
