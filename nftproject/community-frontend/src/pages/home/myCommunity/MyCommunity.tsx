import { AuthState, UserProfile } from "src/props";
import { ConnectWallet } from "src/components/auth";
import { HomeCarousel } from "src/components/carousel";
import { SlideGenerate } from "src/functions";
import { useAppSelector } from "src/components/hooks";

export const MyCommunity: React.FC = () => {
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);

  return (
    <div className="MyCommunity">
      <div className="title">My Community</div>
      <div className="list">
        <ConnectWallet>
          <HomeCarousel
            data={SlideGenerate<UserProfile>(
              auth?.user?.communities ? auth.user.communities : [],
              5
            )}
          />
        </ConnectWallet>
      </div>
    </div>
  );
};
