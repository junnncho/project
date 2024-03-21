import { PacmanLoader } from 'react-spinners';

export const Packman = ({ color, text }) => {
  return (
    <div className="justify-center items-center top-[40%] sticky">
      <div className=" text-3xl font-bold text-center mb-5" style={{ color }}>
        {text}
      </div>
      <PacmanLoader className="mx-auto" color={color} size={50} />
    </div>
  );
};
