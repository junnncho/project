import { profile } from "console";
import { useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { ImgUploadButton } from "../buttons";
import { ProfilePageProps, ProfilePageState, GetProfileAPI } from "src/props";
import { VisibleSetModal } from "./VisibleSetModal";
import { useApi, useAppDispatch, useAppSelector } from "../hooks";
import { updateProfile } from "src/redux/api";

export const EditProfileModal = (profilePage: { props: GetProfileAPI }) => {
  const [userName, setUserName] = useState<string>("");
  const [userDescription, setUserDescription] = useState<string>("");
  const [backgroundImgs, setBackgroundImgs] = useState<
    [string[], string[], number[]]
  >([[], [profilePage.props.bannerImg ? profilePage.props.bannerImg : ""], []]);

  const [profileImgs, setProfileImgs] = useState<
    [string[], string[], number[]]
  >([[], [profilePage.props.profile.img], []]);
  const [loading1, data1, error1, updateProfile1] =
    useApi<GetProfileAPI>(updateProfile);
  const auth = useAppSelector((state) => state.AuthReducer);
  const onEdit = () => {
    const formData = new FormData();
    userName !== "" && formData.append("name", userName);
    userDescription !== "" && formData.append("description", userDescription);
    backgroundImgs[0][0] && formData.append("bannerImg", backgroundImgs[0][0]);
    profileImgs[0][0] && formData.append("profileImg", profileImgs[0][0]);
    updateProfile1(formData);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {}, [data1]);

  return (
    <>
      <div
        style={{
          marginTop: "4em",
        }}
      ></div>
      <div
        className="EditProfileModal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="Edit">Edit</div>
        <div className="unitItem">
          <div className="itemTitle">Name</div>
          <div>
            <ReactTextareaAutosize // 텍스트창
              className="textinput"
              placeholder={profilePage.props.profile.name}
              style={{ marginLeft: "1em" }}
              value={userName}
              onChange={(e) => {
                let contents: string = e.currentTarget.value;
                setUserName(contents);
              }}
            ></ReactTextareaAutosize>
          </div>
        </div>

        <div className="unitItem">
          <div className="itemTitle">
            Profile
            <div className="editButton">
              <ImgUploadButton
                imgs={profileImgs}
                setImgs={setProfileImgs}
                isUnit={true}
                htmlId={1}
              >
                <i style={{ fontSize: "2em" }} className="bx bx-image-add" />
              </ImgUploadButton>
            </div>
          </div>
          <img className="bigPicture" src={profileImgs[1][0]} />
        </div>

        <div className="unitItem">
          <div className="itemTitle">
            Background picture
            <div className="editButton">
              <ImgUploadButton
                imgs={backgroundImgs}
                setImgs={setBackgroundImgs}
                isUnit={true}
                htmlId={2}
              >
                <i style={{ fontSize: "2em" }} className="bx bx-image-add" />
              </ImgUploadButton>
            </div>
          </div>
          <img className="bannerImg" src={backgroundImgs[1][0]} />
        </div>

        <div className="unitItem">
          <div className="itemTitle">Description</div>
          <ReactTextareaAutosize // 텍스트창
            className="textinput"
            placeholder={profilePage.props.description}
            style={{ marginLeft: "1em" }}
            value={userDescription}
            onChange={(e) => {
              let contents: string = e.currentTarget.value;
              setUserDescription(contents);
            }}
          ></ReactTextareaAutosize>
        </div>

        <div className="unitItem">
          <div className="itemTitle">
            <div onClick={onEdit} className="editButton">
              edit
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
