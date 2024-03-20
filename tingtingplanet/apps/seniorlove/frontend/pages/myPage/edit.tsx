import { Tour } from "@seniorlove/frontend/components";
import { st } from "@seniorlove/frontend/stores";
import { ReactNode, useEffect } from "react";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { env } from "@seniorlove/frontend/env/env";
import { Field, Input, Keyring } from "@shared/ui-web";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const MyInfoItem = ({ label, value, button }: { label: string; value: any; button?: ReactNode }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-0 text-base font-bold">{label}</h3>
      <div className="flex flex-col items-baseline md:flex-row">
        <p className="mr-2 text-base">{value}</p>
        {button}
      </div>
    </div>
  );
};

export default function MyPage() {
  const self = st.use.self();
  const userForm = st.use.userForm();
  const myKeyring = st.use.myKeyring();
  const router = useRouter();
  useEffect(() => {
    st.do.editUser(self);
  }, []);
  return (
    <div className="pb-20 pt-4">
      <div className="text-center mb-5">
        <Field.Img
          label=""
          file={userForm.image}
          addFiles={st.do.uploadImageOnUser}
          onRemove={() => st.do.setImageOnUser(null)}
          direction="vertical"
          isCircle
        />
        <div className="text-sm font-bold text-gray-500">프로필을 변경하려면 이미지 클릭</div>
        {/* <Image
          src={self.image?.url ?? "/seniorlove_logo.png"}
          width={190}
          height={190}
          className="object-cover border-2 border-green-500 rounded-lg"
          alt="profile"
        /> */}
      </div>
      <div className="w-full flex flex-row border-y border-secondary py-4 font-semibold text-xl">
        <span className="ml-2">닉네임 변경</span>
        <div className="ml-auto mr-2">
          <Input
            inputClassName="text-base h-auto"
            value={userForm.nickname}
            onChange={(e) => st.do.setNicknameOnUser(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full text-center border-b border-secondary py-4 font-semibold text-xl">
        <Keyring.Action.ChangePassword siteKey={env.cloudflare.siteKey} />
      </div>

      <div className="flex flex-row justify-center mt-5">
        <button
          className="btn mx-2 px-2 text-2xl w-32"
          onClick={() => {
            st.do.updateUser({ path: "self" });
            router.push("/");
          }}
        >
          저장
        </button>
        <button
          className="btn mx-2 px-2 text-2xl w-32"
          onClick={() => {
            router.push("/myPage");
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}
