import { Route, Routes, useLocation } from "react-router-dom";
import { useSpring, animated as a } from "react-spring";
import { useEffect, useState } from "react";
import TotalPage, { TotalTop } from "../total";
import { HomePage } from "../home";
import CommunityPage, { CommunityTop } from "../community";
import ProfilePage, { ProfileTop } from "../profile";
import MarketPlacePage from "../marketPlace/MarketPlace";
import RafflePage from "../raffle/Raffle";
import DaoPage from "../DAO/Dao";
import { Sidebar, RightBanner } from "src/components/sidebar";
import { ProfileBar } from "src/components/navbar";
import { useAppSelector } from "src/components/hooks";
import { MainLand } from "src/components/land";
import { scrollController } from "src/functions";
import "./index.css";
import { ErrorPage } from "../error";
import { dummyProfilePage } from "src/dummy";
import { UnitPostPage } from "../unitpostpage";
import { isMobile } from "react-device-detect";
import { ContentMainModal } from "src/components/modal";
const OthersPage = () => {
  const [scrolled, setScroll] = useState<boolean>(false);
  const page = useAppSelector((state) => state.PageReducer.page);
  const Modal = useAppSelector((state) => state.ModalReducer);
  const location = useLocation();
  const backHome = () => {
    setScroll(false);
  };
  useEffect(() => {
    location.pathname != "/" && setScroll(true);
    window.scrollTo(0, 0);
  }, [location]);

  const land_props = useSpring({
    borderColor: scrolled ? "#aaaaaa" : "#aaaaaa00",
    marginTop: scrolled ? "0vh" : "10vh",
    fontSize: scrolled ? "16px" : "12px",
  });

  const grid_props = useSpring({
    gridTemplateColumns: scrolled ? "1fr 48em 1fr" : "1fr 64em 1fr",
  });

  const opacity_props = useSpring({
    opacity: scrolled ? 1 : 0,
  });

  const sidebar_props = useSpring({
    marginRight: scrolled ? "0em" : "-8em",
    opacity: scrolled ? 1 : 0,
  });

  const display_props = useSpring({
    display: scrolled ? "block" : "none",
    opacity: scrolled ? 1 : 0,
  });
  const display_props2 = useSpring({
    display: scrolled ? "none" : "block",
    opacity: scrolled ? 0 : 1,
  });
  const border_props = useSpring({
    borderLeftColor: scrolled ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)",
    borderRightColor: scrolled ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)",
  });
  const mobileland_props = { marginTop: "0vh", fontSize: "16px" };
  const mobilegrid_props = { gridTemplateColumns: "1fr 1fr 1fr" };
  const mobileopacity_props = { opacity: "1", width: "100%" };
  const mobiledisplay_props = { display: "block", opacity: "1", width: "100%" };
  const mobiledisplay_props2 = { display: "none", opacity: "1" };
  const mobileborder_props = {
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    width: "100%",
  };
  scrollController(scrolled, setScroll);
  return (
    <div
      onScroll={() => {
        console.log("adsf");
      }}
    >
      {Modal.isvisible && (
        <ContentMainModal isVisible={true} setVisible={() => {}}>
          <Modal.modal props={Modal.props}></Modal.modal>
        </ContentMainModal>
      )}

      <a.div
        className="others container"
        style={isMobile ? mobilegrid_props : grid_props}
      >
        {scrolled && (
          <a.div
            className="sidebar left"
            style={isMobile ? mobileopacity_props : sidebar_props}
          >
            <Sidebar back={backHome} />
          </a.div>
        )}

        <a.div
          className="content"
          style={isMobile ? mobileborder_props : border_props}
        >
          <a.div
            className="top"
            style={isMobile ? mobileopacity_props : opacity_props}
          >
            {page}
          </a.div>

          <a.div
            className="main-frame"
            style={isMobile ? mobileland_props : land_props}
          >
            <Routes>
              <Route
                path="/"
                element={<TotalTop scrolled={scrolled} backHome={backHome} />}
              />
              <Route
                path="/community/:communityId"
                element={<CommunityTop />}
              />
              <Route
                path="/profile/:profileId"
                element={<ProfileTop profilePage={dummyProfilePage} />}
              />
            </Routes>
          </a.div>

          {/* {(page === "total" || !scrolled) && (
            <a.div
              className="lands"
              style={isMobile ? mobileland_props : land_props}
            >
              <MainLand back={backHome} />
            </a.div>
          )} */}
          <a.div
            className="home"
            style={isMobile ? mobiledisplay_props2 : display_props2}
          >
            <HomePage />
          </a.div>
          <a.div
            className="route"
            style={isMobile ? mobiledisplay_props : display_props}
          >
            <Routes>
              <Route path="/" element={<TotalPage />} />
              <Route path="/marketplace/" element={<MarketPlacePage />} />
              <Route path="/raffle/*" element={<RafflePage />} />
              <Route path="/dao/*" element={<DaoPage />} />
              <Route
                path="/community/:communityId"
                element={<CommunityPage />}
              />
              <Route path="/post/:postId" element={<UnitPostPage />} />
              <Route
                path="/profile/:profileId"
                element={<ProfilePage profilePage={dummyProfilePage} />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </a.div>
        </a.div>
        {scrolled && (
          <a.div
            className="sidebar right"
            style={isMobile ? mobileopacity_props : opacity_props}
          >
            <ProfileBar />
            <a.div
              className="right-banner"
              style={isMobile ? mobiledisplay_props : display_props}
            >
              <RightBanner />
            </a.div>
          </a.div>
        )}
      </a.div>
    </div>
  );
};

export default OthersPage;
