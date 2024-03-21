import { PostProfileProps, UserProfile } from "src/props";
import { ProfilePicture } from "src/pages/profile/ProfilePicture";
import { AccessStatus } from "src/props";
export const PostProfile = ({
  userProfile,
  communityProfile,
  time,
  accessStatus,
}: PostProfileProps) => {
  return (
    <div className="postprofilecontainer">
      <ProfilePicture profile={userProfile} />
      <div className="meta">
        <div className="firstline" onClick={() => {}}>
          <div>{userProfile.name}</div>
          <div className="left1">
            <ProfileAccessStatus
              accessStatus={accessStatus}
              communityProfile={communityProfile}
            />
          </div>
        </div>

        <div className="time">{time}</div>
      </div>
    </div>
  );
};

export const ProfileAccessStatus = ({
  accessStatus,
  communityProfile,
}: {
  accessStatus: AccessStatus;
  communityProfile: UserProfile;
}) => {
  return (
    <>
      <div
        className="profilestatus"
        style={{
          backgroundColor: `${
            accessStatus === AccessStatus.PUBLIC
              ? "rgb(189 190 190)"
              : accessStatus === AccessStatus.PRIVATE
              ? "rgb(165 205 221)"
              : "rgb(121, 151, 213)"
          }`,
        }}
      >
        <div className="profilepic">
          <ProfilePicture profile={communityProfile} community={true} />
        </div>
        <div> {communityProfile.name}</div>
        {accessStatus === AccessStatus.PUBLIC && <i className="bx bx-globe" />}
        {accessStatus === AccessStatus.HOLDER && (
          <i className="bx bx-group"></i>
        )}
        {accessStatus === AccessStatus.PRIVATE && (
          <i className="bx bx-body"></i>
        )}
      </div>
    </>
  );
};
