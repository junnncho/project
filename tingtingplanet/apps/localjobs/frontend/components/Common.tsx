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
    <div className="w-full flex text-base items-center" onClick={onClick}>
      <div className="w-[60px] h-[60px] min-w-max rounded-full overflow-hidden border border-primary">
        {user.image ? (
          <Image src={user.image.url} alt={"유저프사"} width={60} height={60} className=" object-cover" />
        ) : (
          <EmptyProfile width={60} />
        )}
      </div>
      <div className="flex flex-col ml-4">
        <div className="flex">
          <div className="text-2xl font-semibold">{user.nickname}</div>
          <div className="text-base text-gray-600 self-center ml-2">
            {dayjs(user.dateOfBirth).format("YYYY년생 ")} / {user.gender === "male" ? "남" : "여"}
          </div>
        </div>

        <div>
          전화번호 <b className="text-sm">{parsePhone(user.phone)}</b>
        </div>
        <div>
          성실도 <b>{user.point}</b>
        </div>
      </div>
    </div>
  );
};
