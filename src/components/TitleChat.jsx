import React, { useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { getChatById } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";

const TitleChat = () => {
  const Dispatch = useDispatch();
  const chatById = useSelector((store) => store.chat.chatById);

  useEffect(() => {
    getChatById();
  }, [Dispatch]);


  return (
    <div className="wrapper-title p-[30px] h-[10%] border-b-[1px] flex justify-between items-center">
      <div className="wrapper-user flex items-center gap-2">
        <IconButton sx={{ padding: "0px" }}>
          <Avatar src={chatById[0]?.image} />
        </IconButton>
        <div className="text flex flex-col">
          <p className="text-[#007cd2] font-[500]">{chatById[0]?.name}</p>
          <p className="text-[#989898] text-[14px]">{chatById[0]?.role}</p>
        </div>
      </div>
      <div className="settings flex items-center">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <AccessTimeOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TitleChat;
