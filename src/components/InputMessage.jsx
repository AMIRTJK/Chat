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
  const authedLogin = JSON.parse(localStorage.getItem("accessLogin"));

  let date = new Date();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let time = `${hours}:${minutes}`;

  let obj = {
    newObj: {
      id: Date.now().toString(),
      userChatId: chatById[0]?.id,
      text: showSend,
      userAuthId: authedLogin?.id,
      dateTime: time,
    },
    id: chatById[0]?.id,
  };

  return (
    <div
      className={`${
        chatById[0]?.id !== authedLogin?.id &&
        authedLogin.login !== "f.kahorzoda"
          ? "bg-[#fafafa] cursor-not-allowed"
          : ""
      } input-message border-[2px] rounded-lg border-[#007fd2] p-[5px] w-full flex justify-between relative`}
    >
      <input
        disabled={
          chatById[0]?.id !== authedLogin?.id &&
          authedLogin.login !== "f.kahorzoda"
        }
        onChange={(event) => Dispatch(setShowSend(event.target.value))}
        value={showSend}
        type="text"
        placeholder="Введите сообщение"
        className={`${
          chatById[0]?.id !== authedLogin?.id &&
          authedLogin.login !== "f.kahorzoda"
            ? "cursor-not-allowed"
            : ""
        } w-full h-[100%] p-[15px] outline-none placeholder:text-[#00558e] placeholder:font-medium`}
      />
      <div
        className={`${
          chatById[0]?.id !== authedLogin?.id &&
          authedLogin.login !== "f.kahorzoda"
            ? "cursor-not-allowed bg-[#fafafa]"
            : ""
        } panel-submit flex items-center gap-2`}
      >
        <IconButton>
          <AddToDriveIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (
              chatById[0]?.id === authedLogin?.id ||
              authedLogin.login === "f.kahorzoda"
            ) {
              Dispatch(postMessageById(obj));
              Dispatch(setShowSend(""));
            }
          }}
        >
          <SendIcon
            className={`${showSend.length > 0 ? "text-[#007fd2]" : ""} `}
          />
        </IconButton>
      </div>
      {arr.includes("@") && <MentionUsersChat />}
    </div>
  );
};

export default InputMessage;
