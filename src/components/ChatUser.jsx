import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteUserChats } from "../actions/chatApi";

const ChatUser = (props) => {
  const { id, name, image, role, status } = props.item;

  const newObj = {
    id: id,
    name: name,
    image: image,
    role: role,
    status: !status,
  };

  const handleChangeStatus = () => {
    props.dispatch(props.setActiveChat(id));
  };

  return (
    <div
      onClick={() => {
        props.handlePutUserChatStatus(newObj);
        handleChangeStatus();
      }}
      className={`${
        props.activeChat === id ? "bg-[#007cd2]" : "bg-[#f9f9f9]"
      } wrapper-chat  shadow-lg border-[1px] rounded-lg w-full p-[15px] hover:bg-[#007cd2] cursor-pointer transition-all duration-100`}
    >
      <header className="flex justify-between items-center">
        <div className="user-info flex items-center gap-2">
          <Avatar src={image} sx={{ border: "1px solid #fff" }} />
          <p
            className={`${
              props.activeChat === id ? "text-[#f9f9f9]" : "text-[#007cd2]"
            } font-[500]`}
          >
            {name}
          </p>
        </div>

        <div className="panel-control">
          <IconButton onClick={() => props.dispatch(deleteUserChats(id))}>
            <DeleteIcon className="text-[red]" />
          </IconButton>
        </div>
      </header>
    </div>
  );
};

export default ChatUser;
