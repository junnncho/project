import { Link, useNavigate } from "react-router-dom";
import { changeLink } from "src/functions";
import { UnitLandProfile } from ".";

export const MainLand = ({ back }: any) => {
  let projects: string[] = [
    "/img/project/Azuki.png",
    "/img/project/Beanz.png",
    "/img/project/Bored_Ape_Kennel_Club.png",
    "/img/project/Bored_Ape_Yacht_Club.png",
    "/img/project/Cool_Cats_Nft.png",
    "/img/project/Doodles.png",
    "/img/project/Gardenlockdown.jpeg",
    "/img/project/God_Hates_NFTees.gif",
    "/img/project/Jenkins_The_Valet.png",
    "/img/project/Kitaro_World_Official.gif",
    "/img/project/Mutant_Ape_Yacht_Club.png",
    "/img/project/Otherdeed_For_Otherside.png",
    "/img/project/Pixelmon_Trainers.jpeg",
    "/img/project/Poobsnft.gif",
    "/img/project/QQL_Mint_Pass.png",
    "/img/project/Renga_Black_Box.gif",
    "/img/project/San_Origin.png",
    "/img/project/StreetMachine.jpeg",
  ];
  let projectName: string[] = ["Dummy"];
  let hashmoss: string = "/logo/logo.png";
  const navigate = useNavigate();
  return (
    <div className="MainLand">
      {projects.map((project: string, index: number) => {
        return (
          <UnitLandProfile
            imgSrc={project}
            index={index}
            page={"/community/" + index.toString()}
          />
        );
      })}
      {/* <Link to="/" className="land_main"> */}
      <div
        className="land_main"
        onClick={() => {
          back();
          navigate("/");
        }}
      >
        <img src={hashmoss} className="logo" />
      </div>
      {/* </Link> */}
    </div>
  );
};
