import {
  CommunityRelationProps,
  CommunityRelationState,
  RelationProps,
  RelationState,
} from "src/props";

export const UserStatus = ({ relation, kind = "user" }: RelationProps) => {
  return (
    <div className="UserStatus">
      {kind === "user" ? (
        <div className="COMMUNITYSTATUS">
          <div className="UnitStatus">
            <div className="title">Contribute</div>
            <div className="numbers">
              {(relation as RelationState).contribute}
            </div>
          </div>
          <div className="UnitStatus">
            <div className="title">Following</div>
            <div className="numbers">
              {(relation as RelationState).following}
            </div>
          </div>
          <div className="UnitStatus">
            <div className="title">Follows</div>
            <div className="numbers">
              {(relation as RelationState).follower}
            </div>
          </div>
        </div>
      ) : (
        <div className="COMMUNITYSTATUS">
          <div className="UnitStatus">
            <div className="title">Rank</div>
            <div className="numbers">
              {(relation as CommunityRelationState).rank}
            </div>
          </div>
          <div className="UnitStatus">
            <div className="title">Holders</div>
            <div className="numbers">
              {(relation as CommunityRelationState).holders}
            </div>
          </div>
          <div className="UnitStatus">
            <div className="title">Follows</div>
            <div className="numbers">
              {(relation as CommunityRelationState).follower}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// export const ProfileStatus = ({ relation }: StatusProps) => {
//   const typeofrelation = (rel: any) => rel.holders !== undefined;
//   // true if community
//   if (typeofrelation(relation)) {
//     return (
//       <div className="COMMUNITYSTATUS">
//         <div className="UnitStatus">
//           <div className="numbers"></div>
//           <div className="title">Rank</div>
//         </div>
//         <div className="UnitStatus">
//           <div className="title">Holders</div>
//         </div>
//         <div className="numbers"></div>
//         <div className="UnitStatus">
//           <div className="title">Follows</div>
//         </div>
//         <div className="numbers"></div>
//       </div>
//     );
//   }
//   return (
//     <>
//       {typeofrelation(relation) ? (
//       ) : (<UserStatus relation={relation}/>
//       )}
//     </>
//   );
// };
