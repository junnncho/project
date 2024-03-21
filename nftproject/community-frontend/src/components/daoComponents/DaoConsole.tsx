import { useEffect, useState } from "react";
import { AccessStatus, DaoProps } from "src/props";
import { ProfilePicture } from "src/pages/profile/ProfilePicture";
import { PostProfile } from "../postcomponents/PostProfile";
import { DaoDetails } from "./DaoDetails";
export const DaoConsole = ({ daoState, isUnit }: any) => {
  const [details, setDetails] = useState<boolean>(false);
  let sum = 0;
  let ratio = [0];
  const [clickedItem, setClickedItem] = useState<number>(-1);
  const isHolding: boolean = daoState.condition === AccessStatus.HOLDER;
  Object.keys(daoState.daoItems).map((val, ind) => {
    if (clickedItem === ind) {
      sum += 1;
    }
    sum += daoState.daoItems[val];
  });
  Object.keys(daoState.daoItems).map((val, ind) => {
    if (clickedItem === ind) {
      ratio[ind] = (100 * (daoState.daoItems[val] + 1)) / sum;
    } else {
      ratio[ind] = (100 * daoState.daoItems[val]) / sum;
    }
  });
  // console.log(ratio);
  return (
    <div
      className={isUnit ? " daocontainer main-frame top1" : "daocontainer"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div style={{ display: "flex" }}>
        <PostProfile
          userProfile={daoState.proposerProfile}
          communityProfile={daoState.community}
          time={daoState.due.toLocaleString()}
          accessStatus={daoState.condition}
        />
        <div className="daoStatus" style={{ display: "flex" }}>
          <div className="daoDiv"></div>
          {daoState.status}
        </div>
      </div>
      <div className="daodescription">{daoState.description}</div>
      <div className="daopolls">
        {Object.keys(daoState.daoItems).map((value, index) => {
          return (
            <div
              className="daopoll"
              onClick={() => {
                setClickedItem(index);
              }}
            >
              <div className="daofill" style={{ width: ratio[index] + "%" }}>
                {value}
                <div style={{ fontSize: "small", opacity: "0.6" }}>
                  {index === clickedItem
                    ? daoState.daoItems[Object.keys(daoState.daoItems)[index]] +
                      1
                    : daoState.daoItems[Object.keys(daoState.daoItems)[index]]}
                </div>
              </div>
              <div className="daopercentage">{Math.round(ratio[index])}%</div>
            </div>
          );
        })}

        <div className="due">Due : {daoState.due.toLocaleString()}</div>
      </div>
      {details && <DaoDetails />}
      <button
        className="detailButton"
        onClick={() => {
          setDetails(!details);
        }}
      >
        Show details
      </button>
    </div>
  );
};
