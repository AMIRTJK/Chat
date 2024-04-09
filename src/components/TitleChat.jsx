import React from "react";
import { Avatar, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const TitleChat = () => {
  return (
    <div className="wrapper-title p-[30px] border-b-[1px] flex justify-between items-center">
      <div className="wrapper-user flex items-center gap-2">
        <IconButton sx={{ padding: "0px" }}>
          <Avatar src="" />
        </IconButton>
        <p>Курбониён Сарвар</p>
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
