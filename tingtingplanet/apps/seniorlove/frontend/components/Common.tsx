import { EmptyProfile } from "@shared/ui-web";
import { User } from "../stores/gql";
import Image from "next/image";
import dayjs from "dayjs";

export const parsePhone = (number: string) => {
  if (number.length === 11) return number.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  else if (number.length === 10) return number.replace(/-/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  else if (number.length === 9) return number.replace(/-/g, "").replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
  else return number;
};
export const UserApplyItem = ({
  user,
  onApply,
  onReject,
  onClick,
}: {
  user: User;
  onApply?: () => void;
  onReject?: () => void;
  onClick?: () => void;
}) => {
  return (
    <div className="w-full flex text-base items-center cursor-pointer" onClick={onClick}>
      <div className="w-[25px] h-[25px] min-w-max rounded-full overflow-hidden border border-primary">
        {user.image ? (
          <Image src={user.image.url} alt={"유저프사"} width={25} height={25} className=" object-cover" />
        ) : (
          <EmptyProfile width={25} />
        )}
      </div>
      <div className="mx-4">
        {user.nickname} / {dayjs(user.dateOfBirth).format("YYYY년생 ")} / {user.gender === "male" ? "남" : "여"} /{" "}
        {parsePhone(user.phone)}
      </div>
    </div>
  );
};
