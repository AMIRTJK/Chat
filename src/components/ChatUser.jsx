import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreVert from "./MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { getChatById, getMessageById } from "../actions/chatApi";

const ChatUser = ({ item, handlePutUserChatStatus }) => {
  const Dispatch = useDispatch();

  const { id, name, image, role, status } = item;

  const newObj = {
    id: id,
    name: name,
    image: image,
    role: role,
    status: true,
  };

  const [showMoreVert, setShowMoreVert] = useState(false); // Локальное состояние для каждого ChatUser
  const renderOfRole = useSelector((store) => store.chat.renderOfRole);

  const handleShowMoreVert = () => {
    setShowMoreVert(!showMoreVert);
  };

  const handleGetById = () => {
    Dispatch(getChatById(newObj.id));
    Dispatch(getMessageById(newObj.id));
  };

  return (
    <div
      onClick={() => {
        handlePutUserChatStatus(newObj);
        handleGetById();
      }}
      className={`${
        item.status ? "bg-[#007cd2]" : "bg-[#f9f9f9]"
      } wrapper-chat  shadow-lg border-[1px] rounded-lg w-full p-[15px] hover:bg-[#007cd2] cursor-pointer transition-all duration-100`}
    >
      <header className="flex justify-between items-center">
        <div className="user-info flex items-center gap-2">
          <Avatar src={image} sx={{ border: "1px solid #fff" }} />
          <div className="text">
            <p
              className={`${
                item.status ? "text-[#f9f9f9]" : "text-[#007cd2]"
              } font-[500]`}
            >
              {name}
            </p>
            <p
              className={`${
                item.status ? "text-[#f9f9f9] text-[15px]" : "text-[#a9a9a9]"
              } text-[15px]`}
            >
              {role}
            </p>
          </div>
        </div>
        {renderOfRole && (
          <div className="panel-control relative">
            <IconButton onClick={() => handleShowMoreVert()}>
              <MoreVertIcon
                className={`${item.status ? "text-[#f9f9f9]" : ""} more-vert`}
              />
            </IconButton>
            {showMoreVert && <MoreVert id={id} />}
          </div>
        )}
      </header>
    </div>
  );
};

export default ChatUser;
