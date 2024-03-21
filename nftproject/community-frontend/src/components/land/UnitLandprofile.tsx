import { Link } from "react-router-dom";
import { UnitLandProps } from "src/props";

export const UnitLandProfile = ({ imgSrc, index, page }: UnitLandProps) => {
  return (
    <div className={`land land${(index + 1).toString()}`}>
      <Link to={page}>
        <img src={imgSrc} className={`land land${(index + 1).toString()}`} />
      </Link>
    </div>
  );
};
