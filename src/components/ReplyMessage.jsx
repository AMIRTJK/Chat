import React from "react";
import { actions } from "../slices/chat-slice";

import ReplyIcon from "@mui/icons-material/Reply";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const ReplyMessage = () => {
  const Dispatch = useDispatch();

  const showReply = useSelector((store) => store.chat.showReply);
  const getReplyMessage = useSelector((store) => store.chat.getReplyMessage);

  const { setShowReply } = actions;

  return (
    <main className="w-full py-[10px] flex justify-between items-start">
      <div className="wrapper-reply-message flex items-center gap-5">
        <ReplyIcon fontSize="large" className="text-[#007cd2]" />
        <div className="reply-message">
          <p className="text-[#007cd2] font-medium">
            В ответ {getReplyMessage.name}
          </p>
          <p className="text-[#939393]">{getReplyMessage.text}</p>
        </div>
      </div>
      <IconButton onClick={() => Dispatch(setShowReply(false))}>
        <CloseIcon />
      </IconButton>
    </main>
  );
};

export default ReplyMessage;
