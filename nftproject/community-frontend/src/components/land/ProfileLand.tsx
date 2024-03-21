import { UnitLandProfile } from ".";

const projects = [
  "/img/nft/AZUKI/1.png",
  "/img/nft/CoolCats/1.png",
  "/img/nft/Doodles/1.png",
  "/img/nft/BAYC/1.png",
  "/img/nft/MoonBirds/1.png",
  "/img/nft/AZUKI/2.png",
  "/img/nft/CoolCats/2.png",
  "/img/nft/BAYC/2.png",
  "/img/nft/AZUKI/3.png",
  "/img/nft/Doodles/2.png",
  "/img/nft/BAYC/3.png",
  "/img/nft/CoolCats/3.png",
  "/img/nft/MoonBirds/2.png",
  "/img/nft/AZUKI/4.png",
  "/img/nft/BAYC/8.png",
  "/img/nft/MoonBirds/3.png",
  "/img/nft/AZUKI/5.png",
  "/img/nft/Doodles/3.png",
  "/img/nft/CoolCats/4.png",
  "/img/nft/BAYC/5.png",
  "/img/nft/Doodles/4.png",
  "/img/nft/AZUKI/6.png",
  "/img/nft/CoolCats/5.png",
  "/img/nft/AZUKI/7.png",
  "/img/nft/Doodles/5.png",
];

export const ProfileLand = () => {
  return (
    <div className="ProfileLand">
      {projects.map((project: string, index: number) => {
        return (
          <UnitLandProfile imgSrc={project} index={index} page={"/community"} />
        );
      })}
    </div>
  );
};
