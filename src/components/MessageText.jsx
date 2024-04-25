import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreVertMessage from "./MoreVertMessage";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const MessageText = ({ item }) => {
  const users = useSelector((store) => store.chat.users);

  const [showMoreVert, setShowMoreVert] = useState(false); // Локальное состояние для каждого ChatUser

  const handleShowMoreVert = () => {
    setShowMoreVert(!showMoreVert);
  };

  let sender = null;

  users.forEach((e) => {
    if (item.userAuthId === e.userAuthId) {
      sender = {
        ...e,
      };
    }
  });

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  console.log();

  return (
    <li className="border-b-[1px] p-[30px] flex items-center justify-between">
      <div className="wrapper">
        <div className="wrapper-user flex items-center gap-2 mb-[15px]">
          <IconButton sx={{ padding: "0px" }}>
            <Avatar src={sender.image} />
          </IconButton>
          <div className="wrapper-text">
            <div className="name-time flex items-center gap-2">
              <p className="cursor-pointer font-[500]">{sender.name}</p>
              <p className="text-[14px] text-[#7b7b7b]">
                {item.userAuthId === sender.userAuthId ? item.dateTime : ""}
              </p>
            </div>
            <p>{item?.text}</p>
          </div>
        </div>
        <div className="wrapper-panel ml-[50px] flex gap-5 items-center">
          <IconButton sx={{ padding: "0" }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ padding: "0" }}>
            <SaveAltIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ padding: "0" }}>
            <VolumeUpOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ padding: "0" }}>
            <CheckCircleOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      {sender.userAuthId === accessLogin.id && (
        <div className="panel-control relative">
          <IconButton onClick={() => handleShowMoreVert()}>
            <MoreVertIcon />
          </IconButton>
          {showMoreVert && <MoreVertMessage item={item} />}
        </div>
      )}
    </li>
  );
};

export default MessageText;
