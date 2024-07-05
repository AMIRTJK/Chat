import React, { useState, useEffect, useRef } from "react";

import { Avatar, Button, IconButton } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";

import SetNameConclusion from "./SetNameConclusion";
import SubConclusionEdsUsers from "./SubConclusionEdsUsers";
import CommentsConclusion from "./CommentsConclusion";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  getSubTabConclusionListLiveChat,
  postSubTabConclusionListLiveChat,
  getUsers,
  deleteSubTabConclusionListLiveChat,
} from "../actions/chatApi";

const LiveChat = ({ handleShowLiveChat, filteredConclusionListCurrent }) => {
  const Dispatch = useDispatch();

  const liveChatMessages = useSelector((store) => store.chat.liveChatMessages);
  const users = useSelector((store) => store.chat.users);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const [valueMessage, setValueMessage] = useState("");

  const handlePostLiveChat = () => {
    const filteredUser = users.filter((e) => e.userAuthId === accessLogin.id);

    let date = new Date();
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let time = `${hours}:${minutes}`;

    const newObj = {
      id: Date.now().toString(),
      subTabConclusionListId: filteredConclusionListCurrent[0]?.id,
      name: filteredUser[0]?.name,
      role: filteredUser[0]?.role,
      image: filteredUser[0]?.image,
      text: valueMessage,
      userAuthId: filteredConclusionListCurrent[0]?.userAuthId,
      dateTime: time,
      replyMessage: {},
    };
    Dispatch(postSubTabConclusionListLiveChat(newObj));
    setValueMessage("");
  };

  const handleDeleteLiveChat = (item) => {
    Dispatch(deleteSubTabConclusionListLiveChat(item.id));
  };

  useEffect(() => {
    Dispatch(getSubTabConclusionListLiveChat());
    Dispatch(getUsers());
  }, []);

  return (
    <div
      onClick={() => handleShowLiveChat(false)}
      className="conclusion-live-chat-animation absolute z-10 bottom-0 left-0 w-full h-[100%]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="absolute w-full h-[50%] bottom-0 bg-[#fff]"
      >
        <div className="flex flex-col h-full justify-between items-between justify-between ">
          <header className="bg-[#007cd2] p-[15px] w-full ">
            <p className="text-[#fff]">Live Chat</p>
          </header>
          <main className="category-scrollbar border-y-[1px] h-full py-[15px] overflow-auto">
            {Array.isArray(liveChatMessages) &&
              liveChatMessages.map((e) => {
                if (
                  filteredConclusionListCurrent[0]?.id ===
                  e.subTabConclusionListId
                )
                  return (
                    <li
                      key={e.id}
                      className="border-b-[1px] p-[10px] flex items-start justify-between"
                    >
                      <div className="wrapper">
                        <div className="wrapper-user flex items-center gap-2 mb-[15px]">
                          <IconButton sx={{ padding: "0px" }}>
                            <Avatar src={e.image} />
                          </IconButton>
                          <div className="wrapper-text">
                            <div className="name-time flex items-center gap-2">
                              <p className="cursor-pointer font-[500] text-[14px]">
                                {e.name}
                              </p>
                              <p className="text-[14px] text-[#7b7b7b]">
                                {e.dateTime}
                              </p>
                            </div>
                            <p className="text-[14px]">{e.text}</p>
                          </div>
                        </div>
                      </div>
                      <div className="panel-control relative">
                        <IconButton onClick={() => handleDeleteLiveChat(e)}>
                          <MoreVertIcon />
                        </IconButton>
                      </div>
                    </li>
                  );
              })}
          </main>
          <footer className="flex justify-between w-full p-[15px]">
            <input
              onChange={(event) => setValueMessage(event.target.value)}
              value={valueMessage}
              type="text"
              className="outline-none w-full"
              placeholder="Введите сообщение..."
            />
            <IconButton
              disabled={valueMessage.length === 0 ? true : false}
              onClick={() => handlePostLiveChat()}
            >
              <SendIcon
                className={`${
                  valueMessage.length > 0 ? "text-[#007fd2]" : ""
                } `}
              />
            </IconButton>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
