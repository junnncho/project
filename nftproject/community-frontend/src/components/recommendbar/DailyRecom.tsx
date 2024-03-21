import React from "react";
import { Link } from "react-router-dom";
import {
  DailyRecommendContainerProps,
  RaffleRecommendItemProps,
} from "src/props";
import { Communities } from "src/dummy";

const DailyRecommendContainer = ({
  children,
}: DailyRecommendContainerProps) => {
  return (
    <div className="Container">
      <div className="title">Daily Recommend Minting</div>
      {children}
      <div className="showmore">
        <Link to={"/raffle"}>
          <div>Show more...</div>
        </Link>
      </div>
    </div>
  );
};
export const DailyRecommendItem = ({
  community,
  dueDate,
  isJoin,
}: RaffleRecommendItemProps) => {
  return (
    <div className="Item">
      <Link to={`/community/${community?.name}`} className="detail">
        <img className="picture" src={community?.img} />
        <div className="info">
          <div className="name">{community?.name}</div>
          <div className="due">{dueDate}</div>
        </div>
      </Link>

      <div className="join white-button">Join</div>
    </div>
  );
};

export const DailyRecommend = () => {
  return (
    <div className="DailyRecommend">
      <DailyRecommendContainer>
        {[...Array(5)].map((value: any, index: number) => {
          const community = Communities[index + 1];
          return (
            <DailyRecommendItem
              isJoin={false}
              community={community.community}
              dueDate={`${index} days left`}
            />
          );
        })}
      </DailyRecommendContainer>
    </div>
  );
};
