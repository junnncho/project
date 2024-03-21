import { UserProfileProps } from "src/props";
import { Link } from "react-router-dom";
import { changeLink } from "src/functions";
import { defaultImg } from "src/dummy";
import "./index.css";
export const ProfilePicture = ({
  profile,
  community = false,
}: UserProfileProps) => {
  return (
    <Link
      to={`/${community ? "community" : "profile"}/${profile.id}`}
      className="profilepic"
    >
      <img
        className="profilepic"
        src={profile?.img ? profile.img : defaultImg}
      ></img>
    </Link>
  );
};

export const SmallProfilePicture = ({ profile }: UserProfileProps) => {
  return (
    <Link to={`/profile/${profile.id}`} className="smallprofilepic">
      <img
        className="smallprofilepic"
        src={profile?.img ? profile.img : defaultImg}
      ></img>
    </Link>
  );
};
