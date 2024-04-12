import React from "react";

import { actions } from "../slices/chat-slice";
import { useDispatch, useSelector } from "react-redux";

import { IconButton } from "@mui/material";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import SendIcon from "@mui/icons-material/Send";

const InputMessage = () => {
  const { setShowSend } = actions;
  const showSend = useSelector((store) => store.chat.showSend);
  const Dispatch = useDispatch();
  return (
    <div className="input-message border-[2px] rounded-lg border-[#007fd2] p-[5px] w-full flex justify-between">
      <input
        onChange={(event) => Dispatch(setShowSend(event.target.value))}
        type="text"
        placeholder="Введите сообщение"
        className="w-full h-[100%] p-[15px] outline-none placeholder:text-[#00558e] placeholder:font-medium"
      />
      <div className="panel-submit flex items-center gap-2">
        <IconButton>
          <AddToDriveIcon />
        </IconButton>
        <IconButton>
          <SendIcon
            className={`${showSend.length > 0 ? "text-[#007fd2]" : ""}`}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default InputMessage;
