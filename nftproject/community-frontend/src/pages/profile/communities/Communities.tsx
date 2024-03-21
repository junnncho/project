import { CommunityNavProps, CommunityProps } from "src/props";
import { Link } from "react-router-dom";

export const UnitCommunity = ({
  community,
  description,
  Volume,
}: CommunityProps) => {
  return (
    <Link to={`/community/${community.id}`}>
      <div className="CommunityFrame">
        <div className="communityBackgroundFrame">
          <img className="communityBackGround" src={community.img} />
        </div>
        <div className="contents">
          <div className="communityPictureFrame">
            <img className="communityPicture" src={community.img} />
          </div>
          <div className="communityStatus">
            <div className="communityName">{community.name}</div>
            <div className="communityDescription">{description}</div>
            <div className="communityVolume">
              <div style={{ fontSize: "small", opacity: "0.5" }}>
                Total Volume
              </div>
              <div style={{ fontWeight: "bold", fontSize: "medium" }}>
                {Volume}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CommunityNav = ({
  communities,
  descriptions,
  Volumes,
}: CommunityNavProps) => {
  console.log("rendered!");
  return (
    <div className="CommunityStatusWrapper">
      {communities.map((value, index) => (
        <UnitCommunity
          community={communities[index]}
          description={descriptions[index]}
          Volume={Volumes[index]}
        />
      ))}
    </div>
  );
};
