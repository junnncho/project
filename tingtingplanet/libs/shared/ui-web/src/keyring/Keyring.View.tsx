import { Keyring } from "@shared/ui-web";
import { gql, slice, st, usePage } from "@shared/data-access";
import { twMerge } from "tailwind-merge";

interface KeyringViewProps {
  className?: string;
  keyring: gql.Keyring;
  slice?: slice.KeyringSlice;
  siteKey?: string;
}
export const KeyringView = ({ className, keyring, slice = st.slice.keyring, siteKey }: KeyringViewProps) => {
  const { l } = usePage();
  return (
    <div className={twMerge(className, ``)}>
      <div>
        <div className="font-bold">{l("keyring.accountId")}</div>
        <p className="text-base">{keyring.accountId}</p>
      </div>
      <div>
        <div className="font-bold">{l("keyring.password")}</div>
        <p className="text-base">
          ********{" "}
          {keyring.verifies.includes("phone") ? (
            <Keyring.Action.ChangePasswordWithPhone />
          ) : siteKey ? (
            <Keyring.Action.ChangePassword siteKey={siteKey} />
          ) : null}
        </p>
      </div>
    </div>
  );
};
