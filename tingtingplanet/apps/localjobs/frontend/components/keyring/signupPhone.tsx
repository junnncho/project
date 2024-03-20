import { Input } from "@shared/ui-web";
import { LoginForm, useInterval } from "@shared/util-client";
import { Utils } from "@shared/util";
import { gql, st } from "@localjobs/frontend/stores";
import { useState } from "react";
import dayjs from "dayjs";

interface SignupPhoneProps {
  disabled: boolean;
  hash?: string;
  loginForm?: Partial<LoginForm>;
}
export const SignupPhone = ({ disabled, hash = "signup", loginForm }: SignupPhoneProps) => {
  const signupKeyring = st.use.signupKeyring();
  const phoneCode = st.use.phoneCode();
  const phoneCodeAt = st.use.phoneCodeAt();
  const [phoneCodeRemain, setPhoneCodeRemain] = useState({
    minute: 0,
    second: 0,
  });
  const keyringForm = st.use.keyringForm();
  useInterval(() => {
    if (!phoneCodeAt) return;
    const remainSec = Math.max(0, phoneCodeAt.add(3, "minutes").diff(dayjs(), "second"));
    setPhoneCodeRemain({
      minute: Math.floor(remainSec / 60),
      second: remainSec % 60,
    });
  }, 1000);
  return (
    <>
      <div className="flex my-6 pr-2">
        <div className="w-28 items-center text-base align-middle flex justify-center">전화번호</div>
        <div className=" flex">
          <Input
            // inputClassName="w-full rounded-r-none"
            inputClassName="w-40"
            value={keyringForm.phone ?? ""}
            onChange={(e) => st.do.setPhoneOnKeyring(Utils.formatPhone(e.target.value))}
            disabled={signupKeyring?.verifies.includes("phone")}
          />
          <button
            className={`w-16 px-2 btn ${!phoneCodeAt && "btn-primary "}  text-xs  disabled:border-gray-300 `}
            disabled={disabled || !Utils.isPhoneNumber(keyringForm.phone) || signupKeyring?.verifies.includes("phone")}
            onClick={async () => {
              if (!keyringForm.phone) return;
              const keyringIdHasPhone = await gql.shared.getKeyringIdHasPhone(keyringForm.phone);
              if (keyringIdHasPhone) return window.alert("이미 사용중인 전화번호입니다.");
              const keyring = await gql.shared.addPhoneInPrepareKeyring(keyringForm.phone, signupKeyring?.id ?? null);
              st.do.requestPhoneCode(keyring.id, keyringForm.phone);
              st.set({ signupKeyring: keyring });
            }}
          >
            {phoneCodeAt ? "재요청" : "인증요청"}
          </button>
        </div>
      </div>
      <div className="flex mt-6 pr-2">
        <div className="w-28 items-center text-base align-middle flex justify-center">인증번호</div>
        <div className=" flex">
          <Input
            inputClassName="w-40"
            // inputClassName="w-full rounded-r-none"
            value={phoneCode}
            onChange={(e) => st.do.setPhoneCode(e.target.value)}
            disabled={!phoneCodeAt || signupKeyring?.verifies.includes("phone")}
          />
          <button
            className="w-16 px-2 text-xs btn btn-primary  disabled:border-gray-300"
            disabled={!phoneCodeAt || signupKeyring?.verifies.includes("phone")}
            onClick={async () => st.do.signupPhone(loginForm)}
          >
            {signupKeyring?.verifies.includes("phone") ? "인증완료" : "인증하기"}
          </button>
        </div>
      </div>
      <div className="absolute right-[20vw] text-xs text-opacity-40 text-right">
        {!signupKeyring?.verifies.includes("phone") &&
          phoneCodeAt &&
          `${Utils.pad(phoneCodeRemain.minute, 2)}:${Utils.pad(phoneCodeRemain.second, 2)}`}
      </div>
    </>
  );
};
