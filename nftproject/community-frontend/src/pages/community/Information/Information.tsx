import { CommunityProfileProps } from "src/props";

export const Information = ({ community }: CommunityProfileProps) => {
  return (
    <div className="INFO main-frame">
      <div className="title">General</div>
      <div className="SNS">
        <div className="unitsns"> {community.members} members</div>
        <div className="unitsns">{community.items} items</div>
        <div className="unitsns">{community.relation.follower} followers</div>
        <div className="unitsns">{community.relation.holders} holders</div>
        <div className="unitsns">
          rank {community.relation.rank} in Hashmoss
        </div>
      </div>
      <div className="title">Additional contact</div>
      <div className="SNS">
        <div className="unitsns">
          <div className="profileimg">
            <img className="profileimg" src={"/img/discord.png"} />
          </div>
          join discord!
          <div className="checkbox"></div>
        </div>
        <div>
          <div className="unitsns">
            <div className="profileimg">
              <img className="profileimg" src={"/img/twitter.png"} />
            </div>
            join twitter!
            <div className="checkbox"></div>
          </div>
        </div>
        <div>
          <div className="unitsns">
            <div className="profileimg">
              <img className="profileimg" src={"/img/instagramLogo.png"} />
            </div>
            join instagram!
            <div className="checkbox"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
