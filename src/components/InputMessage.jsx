import React from "react";

import { actions } from "../slices/chat-slice";
import { useDispatch, useSelector } from "react-redux";

import { IconButton } from "@mui/material";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import SendIcon from "@mui/icons-material/Send";

import MentionUsersChat from "./MentionUsersChat";
import { postMessageById } from "../actions/chatApi";

const InputMessage = () => {
  const { setShowSend } = actions;
  const showSend = useSelector((store) => store.chat.showSend);
  const Dispatch = useDispatch();
  const arr = showSend.split("");

  const chatById = useSelector((store) => store.chat.chatById);

  let obj = {
    newObj: {
      id: Date.now().toString(),
      userChatId: chatById[0]?.id,
      text: showSend,
    },
    id: chatById[0]?.id,
  };

  return (
    <div className="input-message border-[2px] rounded-lg border-[#007fd2] p-[5px] w-full flex justify-between relative">
      <input
        onChange={(event) => Dispatch(setShowSend(event.target.value))}
        value={showSend}
        type="text"
        placeholder="Введите сообщение"
        className="w-full h-[100%] p-[15px] outline-none placeholder:text-[#00558e] placeholder:font-medium"
      />
      <div className="panel-submit flex items-center gap-2">
        <IconButton>
          <AddToDriveIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            Dispatch(postMessageById(obj));
            Dispatch(setShowSend(""));
          }}
        >
          <SendIcon
            className={`${showSend.length > 0 ? "text-[#007fd2]" : ""}`}
          />
        </IconButton>
      </div>
      {arr.includes("@") && <MentionUsersChat />}
    </div>
  );
};

export default InputMessage;
