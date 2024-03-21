import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { DummyUsers } from "src/dummy";
import { ProfilePicture } from "src/pages/profile/ProfilePicture";
import { addPost } from "src/redux/actions/post";
import { setVisible } from "src/redux/actions/modal";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CommunitySelectModal, RangeSelectModal } from "../modal";
import {
  PostingWindowProps,
  UserProfile,
  AccessStatus,
  getPostAPI,
  PostStatus,
  AuthState,
} from "src/props";
import { SharedPost } from "./SharedPost";
import { useApi } from "../hooks";
import { postPost, updatePost } from "src/redux/api";
import { ImgUploadButton } from "../buttons";
import { PostedImage, PostImage } from "./PostImage";

export const PostingWindow = ({
  share,
  post,
  edit = false,
}: PostingWindowProps) => {
  const [commuNav, setCommuNav] = useState<boolean>(false);
  const [commuSelect, setCommuSelect] = useState<UserProfile>(DummyUsers[0]);
  const [isContent, setContent] = useState<boolean>(false);
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);
  const [loading1, data1, error1, postPost1] = useApi<getPostAPI>(postPost);
  const [loading2, data2, error2, updatePost1] = useApi<getPostAPI>(updatePost);
  const [files, setFiles] = useState<[string[], string[], number[]]>([
    [],
    [],
    [],
  ]);
  const dispatch = useAppDispatch();
  let isShared: boolean;
  const [value, setvalue] = useState<string>("");
  const [rangeModal, setRangeModal] = useState<boolean>(false);
  const [range, setRange] = useState<AccessStatus>(AccessStatus.PUBLIC);

  // eslint-disable-next-line no-lone-blocks
  {
    share?.sharedPost && (share = share.sharedPost);
  }
  // eslint-disable-next-line no-lone-blocks
  {
    share && (isShared = true);
  }
  if (typeof post !== "undefined") {
    post.sharedPost && (share = post.sharedPost);
    post.sharedPost && (isShared = true);
  }

  useEffect(() => {
    if (typeof post !== "undefined" && post.imgs !== null) {
      setFiles([
        post.imgs.map(() => ""),
        post.imgs.map((img) => img[1]),
        post.imgs.map((img) => img[0]),
      ]);
      setvalue(post.content);
      setContent(true);
    }
  }, []);

  useEffect(() => {
    if (auth.user?.communities && typeof auth.user?.communities !== "number") {
      const temp = auth.user.communities[0];
      setCommuSelect(temp);
    }
  }, [auth]);

  useEffect(() => {
    console.log("error", error2);
  }, [error2]);

  useEffect(() => {
    console.log("update", loading2);
  }, [loading2]);

  useEffect(() => {
    console.log("sharedUseeffect", data1);
    if (data1) {
      dispatch(
        addPost("added", [{ ...data1, vote: null, raffle: null, comment: [] }])
      );
      isShared && dispatch(setVisible(false));
      setvalue("");
      deleteFileImage();
      setContent(false);
    }
  }, [data1]); //api가 호출되고 response가 올 때마다 호출 -> data1이 빈값이 아니고 offset이 이미 최신화되어 있다면 data1값을 total 리덕스에 추가해줌

  useEffect(() => {
    console.log("data2", data2);

    if (data2) {
      setvalue("");
      deleteFileImage();
      setContent(false);
      dispatch(setVisible(false));
    }
  }, [data2]);

  const deleteFileImage = () => {
    files[1].map((img) => {
      URL.revokeObjectURL(img);
    });
    setFiles([[], [], []]);
  };
  return (
    <div
      className="post main-frame top0 z2"
      style={{
        border: "none",
        boxShadow: "0",
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="contents">
        {auth.user?.profile && <ProfilePicture profile={auth.user.profile} />}
        <div className="texts">
          <ReactTextareaAutosize // 텍스트창
            className="textinput"
            placeholder="Good morning"
            style={{ marginLeft: "1em" }}
            value={value}
            onChange={(e) => {
              let contents: string = e.currentTarget.value;
              // contents = contents.replace("\n", "<br>");
              setvalue(contents);
              setContent(contents !== "" ? true : false);
            }}
          ></ReactTextareaAutosize>
          {share && <SharedPost post={share} />}
        </div>
      </div>
      {files[0] && (
        <PostedImage className="images" imgs={files} setImgs={setFiles} />
      )}

      <div className="pbuttons">
        {/* <div className="contents">
          <div className="texts"> */}
        <div className="postRangeSelects">
          {commuSelect?.img && (
            <button
              className="commu"
              style={{ paddingTop: "0.4em" }}
              onClick={() => {
                setCommuNav(!commuNav);
              }}
            >
              <div>
                <img className="commupic" src={commuSelect.img} />
              </div>
              {commuSelect.name}
              <i className="bx bx-chevron-down"></i>
            </button>
          )}
          {commuNav && (
            <CommunitySelectModal
              communityProfiles={
                auth.user?.communities
                  ? (auth.user.communities as UserProfile[])
                  : []
              }
              communitySelecter={setCommuSelect}
              setNav={setCommuNav}
              navState={commuNav}
            />
          )}
        </div>
        {/* </div>
        </div> */}

        <button className="editButton">
          <ImgUploadButton imgs={files} setImgs={setFiles} htmlId={123}>
            <i style={{ fontSize: "1.5em" }} className="bx bx-image-add" />
          </ImgUploadButton>
        </button>
        <button
          className="editButton"
          onClick={() => {
            setRangeModal(!rangeModal);
          }}
        >
          {range === AccessStatus.HOLDER && (
            <i className="bx bx-group" style={{ fontSize: "1.2em" }} />
          )}
          {range === AccessStatus.PRIVATE && (
            <i className="bx bx-body" style={{ fontSize: "1.2em" }} />
          )}
          {range === AccessStatus.PUBLIC && (
            <i className="bx bx-globe" style={{ fontSize: "1.2em" }} />
          )}
        </button>
        {rangeModal && (
          <div>
            <RangeSelectModal
              range={range}
              setRange={setRange}
              setModal={setRangeModal}
              modal={rangeModal}
            />
          </div>
        )}
        <button
          className={"editButton"}
          disabled={!isContent}
          onClick={(e) => {
            if (isContent) {
              console.log(files[2]);
              const formData = new FormData();
              files[0].forEach((img) => {
                console.log(img);
                img !== "" && formData.append("files", img);
              });
              files[2].forEach((img) => {
                console.log(img);
                formData.append("filesIndex", img.toString());
              });
              formData.append("type", PostStatus.KR);
              formData.append("communityId", commuSelect.id.toString());
              formData.append("condition", range);
              formData.append("content", value);
              isShared &&
                share &&
                formData.append("shareId", share.postId.toString());

              if (post) {
                updatePost1(post.postId, formData);
              } else {
                postPost1(formData);
              }
            }
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};
