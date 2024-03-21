import { RafflePostProps } from "src/props";
import { changeLink } from "src/functions";

export const RaffleRequirements = ({ raffle }: RafflePostProps) => {
  return (
    <div className="rafflereqcontainer">
      <div className="meta">
        <img
          className="profilepic"
          src={raffle.profile.img}
          onClick={(e) => {
            e.stopPropagation();
            changeLink("/community/BAYC");
          }}
        />
        <div className="texts">
          <div className="meta">
            <div className="username">{raffle.profile.name}</div>
            <div className="time">{raffle.time}</div>
          </div>
          <div className="text">{raffle.description}</div>
          <div className="req">
            <div className="sns">
              {raffle.condition.instagram ? (
                <div className="unitsns">
                  <div className="profileimg">
                    <img
                      className="profileimg"
                      src={"/img/instagramLogo.png"}
                    />
                  </div>
                  follow instagram!
                  <div className="checkbox">
                    {raffle.condition.instagram?.satisfy
                      ? "satisfied"
                      : "unsatisfied"}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {raffle.condition.twitter ? (
                <div className="unitsns">
                  <div className="profileimg">
                    <img className="profileimg" src={"/img/twitter.png"} />
                  </div>
                  follow twitter!
                  <div className="checkbox">
                    {raffle.condition.twitter?.satisfy
                      ? "satisfied"
                      : "unsatisfied"}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {raffle.condition.discordJoin ? (
                <div className="unitsns">
                  <div className="profileimg">
                    <img className="profileimg" src={"/img/discord.png"} />
                  </div>
                  join discord!
                  <div className="checkbox">
                    {raffle.condition.discordJoin?.satisfy
                      ? "satisfied"
                      : "unsatisfied"}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <div className="acceptbutton">get Raffle!</div>
      </div>
    </div>
  );
};
