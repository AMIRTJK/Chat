import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slices/chat-slice";

import PanelTabVisa from "./PanelTabVisa";
import InputMessage from "./InputMessage";
import ReplyMessage from "./ReplyMessage";

const WrapperInputMessage = () => {
  const { setShowSend } = actions;
  const showSend = useSelector((store) => store.chat.showSend);

  const handleShowMention = (value) => {
    Dispatch(setShowSend(value));
  };

  const Dispatch = useDispatch();

  const showReply = useSelector((store) => store.chat.showReply);

  return (
    <div
      className={`${
        showReply ? "h-[10%]" : "h-[20.2%]"
      } wrapper-input-message border-t-[1px] px-[30px] justify-center flex flex-col items-center gap-4`}
    >
      <div className="panel-control flex items-center gap-5">
        <PanelTabVisa name="Упомянуть" handleShowMention={handleShowMention} />
        <PanelTabVisa name="Исполнитель" />
        <PanelTabVisa name="Виза" />
        <PanelTabVisa name="К исполнению" />
        <PanelTabVisa name="Срок" />
      </div>
      {showReply && <ReplyMessage />}
      <InputMessage />
    </div>
  );
};

export default WrapperInputMessage;
