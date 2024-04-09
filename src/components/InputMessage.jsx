import React from "react";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { actions } from "../slices/chat-slice";

import { useDispatch, useSelector } from "react-redux";

const InputMessage = () => {
  const { setShowSend } = actions;
  const showSend = useSelector((store) => store.chat.showSend);
  const Dispatch = useDispatch();

  return (
    <div className="wrapper-input-message border-t-[1px] px-[30px] py-[20px] h-[26%] flex flex-col items-center gap-4">
      <div className="panel-control flex items-center gap-5">
        <p className="py-[5px] px-[15px] bg-[#007fd2] rounded-lg text-[#fff] cursor-pointer hover:bg-[#0065a9] transition-all duration-100">
          Упомянуть
        </p>
        <p className="py-[5px] px-[15px] bg-[#007fd2] rounded-lg text-[#fff] cursor-pointer hover:bg-[#0065a9] transition-all duration-100">
          Исполнитель
        </p>
        <p className="py-[5px] px-[15px] bg-[#007fd2] rounded-lg text-[#fff] cursor-pointer hover:bg-[#0065a9] transition-all duration-100">
          Виза
        </p>
        <p className="py-[5px] px-[15px] bg-[#007fd2] rounded-lg text-[#fff] cursor-pointer hover:bg-[#0065a9] transition-all duration-100">
          К исполнению
        </p>
        <p className="py-[5px] px-[15px] bg-[#007fd2] rounded-lg text-[#fff] cursor-pointer hover:bg-[#0065a9] transition-all duration-100">
          Срок
        </p>
      </div>
      <div className="wrapper-input border-[2px] rounded-lg border-[#007fd2] p-[5px] w-full flex justify-between">
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
    </div>
  );
};

export default InputMessage;
