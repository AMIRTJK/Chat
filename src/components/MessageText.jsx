import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreVertMessage from "./MoreVertMessage";

const MessageText = ({ item }) => {
  const users = useSelector((store) => store.chat.users);
  const messageById = useSelector((store) => store.chat.messageById);

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

  console.log(sender);

  return (
    <li className="border-b-[1px] p-[30px] flex items-center justify-between">
      <div className="wrapper-user flex items-center gap-2">
        <IconButton sx={{ padding: "0px" }}>
          <Avatar src={sender.image} />
        </IconButton>
        <div className="wrapper-text">
          <div className="name-time flex items-center gap-2">
            <p className="cursor-pointer font-[500]">{sender.name}</p>
            <p className="text-[14px] text-[#7b7b7b]">08:17</p>
          </div>
          <p>{item?.text}</p>
        </div>
      </div>
      <div className="panel-control relative">
        <IconButton onClick={() => handleShowMoreVert()}>
          <MoreVertIcon />
        </IconButton>
        {showMoreVert && <MoreVertMessage item={item} />}
      </div>
    </li>
  );
};

export default MessageText;
