import { UnitLandProfile } from ".";

export const CommuLand = () => {
  return (
    <div className="ProfileLand">
      {[...Array(20)].map((ind, index) => {
        return (
          <UnitLandProfile
            imgSrc={`/img/nft/BAYC/${index + 1}.png`}
            index={index}
            page={`/img/nft/BAYC/${index + 1}.png`}
          />
        );
      })}
    </div>
  );
};
