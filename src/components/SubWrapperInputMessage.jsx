import React, { useState } from "react";
import SubInputMessage from "./SubInputMessage";
import InviteToSubChat from "./InviteToSubChat";
import { Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { actions } from "../slices/chat-slice";

import Conclusion from "./Conclusion";

const SubWrapperInputMessage = () => {
  const Dispatch = useDispatch();

  const invite = useSelector((store) => store.chat.invite);

  const { setInvite } = actions;

  const [conclusion, setConclusion] = useState(false);

  const handleModalInvite = (state) => {
    Dispatch(setInvite(state));
  };

  const handleModalConclusion = (state) => {
    setConclusion(state);
  };

  return (
    <>
      <div className="wrapper-input-message border-t-[1px] p-[30px] justify-center flex flex-col items-center gap-4">
        <div className="panel-control flex items-center gap-5">
          <Button variant="contained">Упомянуть</Button>
          <Button onClick={() => handleModalInvite(true)} variant="contained">
            Пригласить
          </Button>
          <Button
            onClick={() => handleModalConclusion(true)}
            variant="contained"
          >
            Создать заключение
          </Button>
        </div>
        <SubInputMessage />
      </div>
      {invite && <InviteToSubChat handleModal={handleModalInvite} />}
      {conclusion && (
        <Conclusion handleModalConclusion={handleModalConclusion} />
      )}
    </>
  );
};

export default SubWrapperInputMessage;
