import React, { useEffect, useState } from "react";
import UnitBackground from "src/components/unitBackground";
import "./index.css";
import {
  PostContainer,
  Post,
  RaffleRequirements,
  AccountBook,
  DaoConsole,
} from "src/components/postcomponents";
import { useAppDispatch, useAppSelector } from "src/components/hooks";
import { setMenu, setPage } from "src/redux/actions/page";
import {
  dummyCommunity,
  dummyCommuProfile,
  dummyCommuRelation,
  dummyDao,
  DummyPosts,
  dummyRaffle,
} from "src/dummy";
import { CommuState, CommuStateArray } from "src/props";
import { CommuNav, ProfileNav } from "src/components/navbar";
import { useParams } from "react-router-dom";
import { Information } from "./Information";
import { UserStatus } from "src/components/profileComponetns/ProfileStatus";

export const CommunityTop = () => {
  const { communityId } = useParams();
  const [CommuState, setCommu] = useState<CommuState>("home");
  const [isfollow, setFollow] = useState<boolean>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPage("unit"));
    dispatch(setMenu("home"));
  }, []);
  return (
    <div className="Unit">
      <div className="backgroundImg">
        <UnitBackground
          backgroundImg={"/img/project/Bored_Ape_Yacht_Club.png"}
          profile={dummyCommunity.community}
          relation={dummyCommunity.relation}
        >
          <div className="buttons">
            <button className="blue-button">Follow</button>
            <button className="blue-button left2">Verify</button>
          </div>
        </UnitBackground>
        <div className="detail">
          <div className="description">{dummyCommunity.description}</div>
          <UserStatus relation={dummyCommuRelation} kind="community" />
        </div>
      </div>

      <ProfileNav navStates={CommuStateArray} />
    </div>
  );
};

const CommunityPage: React.FC = () => {
  const { communityId } = useParams();
  const menu = useAppSelector((state) => state.PageReducer.menu);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPage("unit"));
  }, []);
  return (
    <>
      <div>
        {menu == "home" && (
          <PostContainer>
            <Post
              post={DummyPosts[0]}
              index={0}
              postLocation={"unitCommunity"}
            />
            <Post
              post={DummyPosts[1]}
              index={0}
              postLocation={"unitCommunity"}
            />
          </PostContainer>
        )}
        {menu == "dao" && (
          <div>
            <DaoConsole isUnit={true} daoState={dummyDao}></DaoConsole>
            <DaoConsole isUnit={true} daoState={dummyDao}></DaoConsole>
            <DaoConsole isUnit={true} daoState={dummyDao}></DaoConsole>
            <DaoConsole isUnit={true} daoState={dummyDao}></DaoConsole>
            <DaoConsole isUnit={true} daoState={dummyDao}></DaoConsole>
            <DaoConsole isUnit={true} daoState={dummyDao}></DaoConsole>
          </div>
        )}
        {menu == "announcement" && <div>commingasdfSoon!</div>}
        {menu == "accountBook" && (
          <>
            <AccountBook></AccountBook>
            <Information
              community={dummyCommunity}
              banner_img={dummyCommunity.community.img}
            />
          </>
        )}
      </div>
    </>
  );
};
export default CommunityPage;
