import React, { useEffect, useState } from "react";
import UnitBackground from "src/components/unitBackground";
import "./index.css";
import { ProfileNav } from "src/components/navbar/ProfileNav";
import { NFTs } from "./nfts";
import {
  AuthState,
  CommuStateArray,
  GetProfileAPI,
  ProfilePageProps,
  ProfileState,
  ProfileStateArray,
} from "src/props";
import { InfinitePost } from "src/components/postcomponents";
import { useAppDispatch, useAppSelector, useApi } from "src/components/hooks";
import { getProfile, getProfilePosts } from "src/redux/api";
import { setMenu, setPage } from "src/redux/actions/page";
import { UserStatus } from "src/components/profileComponetns";
import { useParams } from "react-router-dom";
import { setModal, setVisible } from "src/redux/actions/modal";
import { EditProfileModal } from "src/components/modal";
import { initPost } from "src/redux/actions/post";
import { CommunityNav } from "./communities";
import { CommunityDescriptionArray, CommunityProfileArray } from "src/dummy";

export const ProfileTop = ({ profilePage }: ProfilePageProps) => {
  const [loading1, profile, error1, getProfile1] =
    useApi<GetProfileAPI>(getProfile);
  const [isFollow, setFollow] = useState<boolean>(
    profilePage.relation.isFollow
  );
  const { profileId } = useParams();
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPage("profile"));
    dispatch(setMenu("posts"));
    profileId && getProfile1(parseInt(profileId));
  }, []);
  return (
    <>
      {!profile ? (
        <div>Loading</div>
      ) : (
        <div className="Profile">
          <UnitBackground
            backgroundImg={profile.bannerImg}
            profile={profile.profile}
            relation={profilePage.relation}
          >
            <div className="buttons">
              {auth.user && profileId ? (
                auth.user.profile.id == parseInt(profileId) ? (
                  <button
                    className="white-button"
                    onClick={() => {
                      dispatch(setModal(EditProfileModal, profile));
                      dispatch(setVisible(true));
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setFollow(!isFollow);
                    }}
                    className={isFollow ? "white-button" : "blue-button"}
                  >
                    {isFollow ? "Following" : "Follow"}
                  </button>
                )
              ) : (
                <div>Login First</div>
              )}
            </div>
          </UnitBackground>
          <div className="detail">
            <div className="description">{profile.description}</div>
            <UserStatus relation={profilePage.relation} kind="user" />
          </div>

          <ProfileNav navStates={ProfileStateArray} />
        </div>
      )}
    </>
  );
};

const ProfilePage = ({ profilePage }: ProfilePageProps) => {
  const { profileId } = useParams();
  const posts = useAppSelector((state) => state.PostReducer.totalPost);
  const menu = useAppSelector((state) => state.PageReducer.menu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !posts.hasOwnProperty(`profile${profileId}`) &&
      dispatch(initPost(`profile${profileId}`));
  }, []);
  return (
    <>
      {menu == "nft" && <NFTs />}
      {menu == "posts" && posts.hasOwnProperty(`profile${profileId}`) && (
        <InfinitePost
          getPosts={getProfilePosts}
          postLocation={`profile${profileId && profileId}`}
          id={profileId ? parseInt(profileId) : 0}
        />
      )}
      {menu == "communities" && (
        <CommunityNav
          communities={CommunityProfileArray}
          descriptions={CommunityDescriptionArray}
          Volumes={[
            "1200 ETH",
            "20K Klay",
            "332 BTC",
            "421 ETH",
            "523 ETH",
            "625 ETH",
          ]}
        />
      )}
    </>
  );
};

export default ProfilePage;
