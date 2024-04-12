import React from "react";
import { actions } from "../slices/chat-slice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const MentionUser = ({ item }) => {
  const { image, name, role } = item;

  const { setShowSend } = actions;
  const showSend = useSelector((store) => store.chat.showSend);

  const Dispatch = useDispatch();
  return (
    <li
      onClick={() => Dispatch(setShowSend(name))}
      className="flex gap-2 items-center border-b-[1px] px-[15px] py-[5px] cursor-pointer hover:bg-[#e7e7e7]"
    >
      <Avatar src={image} />
      <div className="text">
        <p>{name}</p>
        <p className="text-[#6c6c6c]">{role}</p>
      </div>
    </li>
  );
};

export default MentionUser;
