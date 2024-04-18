import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreVertMessage from "./MoreVertMessage";

const MessageText = ({ item }) => {
  const chatById = useSelector((store) => store.chat.chatById);
  const users = useSelector((store) => store.chat.users);

  const [showMoreVert, setShowMoreVert] = useState(false); // Локальное состояние для каждого ChatUser

  const handleShowMoreVert = () => {
    setShowMoreVert(!showMoreVert);
  };

  console.log(users[0]);

  return (
    <li className="border-b-[1px] p-[30px] flex items-center justify-between">
      <div className="wrapper-user flex items-center gap-2">
        <IconButton sx={{ padding: "0px" }}>
          <Avatar src={users[0]?.image} />
        </IconButton>
        <div className="wrapper-text">
          <div className="name-time flex items-center gap-2">
            <p className="cursor-pointer font-[500]">{users[0]?.name}</p>
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
