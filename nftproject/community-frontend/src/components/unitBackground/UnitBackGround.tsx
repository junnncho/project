import "./index.css";
import { RelationState, UnitBackgroundProps } from "src/props";
import { Communities, dummyCommunity, dummyCommuProfile } from "src/dummy";
import { ProfilePicture } from "src/pages/profile/ProfilePicture";
import { useState } from "react";
import { ContentModal, PictureModal } from "../modal";
import { UserStatus } from "../profileComponetns";

const UnitBackground = ({
  backgroundImg,
  profile,
  children,
  relation,
}: UnitBackgroundProps) => {
  const [profmodal, setprofmodal] = useState<boolean>(false);
  return (
    <div className="UnitBackground">
      <PictureModal
        setModalView={setprofmodal}
        ismodalView={profmodal}
        img={profile.img}
      />
      <div>
        {backgroundImg ? (
          <img src={backgroundImg} className="background img-full" />
        ) : (
          <div className="background"></div>
        )}
      </div>
      <div className="second-layout">
        <img
          src={profile.img}
          className="profile"
          onClick={() => {
            setprofmodal(true);
          }}
        />
        <div className="username">{profile.name}</div>
        <div className="buttons">{children}</div>
      </div>
    </div>
  );
};

export default UnitBackground;
