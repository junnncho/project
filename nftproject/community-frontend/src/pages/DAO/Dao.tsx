import React, { useEffect, useState } from "react";
import { useAppDispatch } from "src/components/hooks";
import { ContentModal, Modal } from "src/components/modal";
import { CommunityProfileArray } from "src/dummy";
import { setPage } from "src/redux/actions/page";
import "./Dao.css";
const DaoPage: React.FC = () => {
  const [modal, setmodal] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPage("dao"));
  }, []);
  return (
    <>
      {/* <Modal isvisible={modal} setVisible={setmodal} /> */}
      {/* <ContentModal isvisible={modal} setVisible={setmodal}></ContentModal> */}
      <div>Live</div>
    </>
  );
};

export default DaoPage;
