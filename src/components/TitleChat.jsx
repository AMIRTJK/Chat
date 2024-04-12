import React from "react";
import { Avatar, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const TitleChat = ({ userChats, userMessage }) => {
  let item = null;
  Array.isArray(userChats) &&
    userChats.forEach((e) => {
      Array.isArray(userMessage) &&
        userMessage.forEach((e2) => {
          if (e.id === e2.userChatId && e.status === true) {
            item = {
              id: e.id,
              name: e.name,
              image: e.image,
              role: e.role,
              status: e.status,
            };
          }
        });
    });

  return (
    <div className="wrapper-title p-[30px] border-b-[1px] flex justify-between items-center">
      <div className="wrapper-user flex items-center gap-2">
        <IconButton sx={{ padding: "0px" }}>
          <Avatar src={item?.image} />
        </IconButton>
        <p className="text-[#007cd2] font-[500]">{item?.name}</p>
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
