import React from "react";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteUserChats } from "../actions/chatApi";

const ChatUser = (props) => {
  const { id, name, image, role } = props.item;
  return (
    <div className="wrapper-chat bg-[#f9f9f9] shadow-lg border-[1px] rounded-lg w-full p-[15px] hover:bg-[#007cd2] cursor-pointer transition-all duration-100">
      <header className="flex justify-between items-center">
        <div className="user-info flex items-center gap-2">
          <Avatar src={image} sx={{ border: "1px solid #fff" }} />
          <p className="text-[#007cd2] font-[500]">{name}</p>
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
