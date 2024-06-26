import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { postSubMessage, postSubTabMessages } from "../actions/chatApi";
// Нужно реализовать postSubTabMessages

import { IconButton } from "@mui/material";

import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import SendIcon from "@mui/icons-material/Send";

import MentionUsersChat from "./MentionUsersChat";

const SubInputMessage = () => {
  const Dispatch = useDispatch();

  const [showSend, setShowSend] = useState("");
  const arr = showSend.split("");

  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const subChatById = useSelector((store) => store.chat.subChatById);
  const chatById = useSelector((store) => store.chat.chatById);
  const invitedToSubChatTabs = useSelector(
    (store) => store.chat.invitedToSubChatTabs
  );
  const subUserChatTabs = useSelector((store) => store.chat.subUserChatTabs);
  const subTabMessages = useSelector((store) => store.chat.subTabMessages);
  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );

  const userChats = useSelector((store) => store.chat.userChats);

  const idxSubTab = useSelector((store) => store.chat.idxSubTab);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  let date = new Date();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let time = `${hours}:${minutes}`;

  let newObj = {};

  Array.isArray(subUserChats) &&
    subUserChats.forEach((subChat) => {
      if (subChat.userAuthId === accessLogin.id) {
        newObj = { ...subChat };
      }
    });

  if (Object.keys(newObj).length === 0) {
    invitedToSubChatTabs.forEach((invited) => {
      if (invited.userAuthId === accessLogin.id) {
        newObj = { ...invited };
      }
    });
  }

  const activeTab = subUserChatTabsById[0]?.status
    ? subUserChatTabsById[0]?.id
    : false;

  const activeSubUser =
    Array.isArray(subUserChats) &&
    subUserChats.find(
      (e) => e.userAuthId === accessLogin.id && e.status === false
    );
  // Исправить
  const activeSubInvitorUser =
    Array.isArray(subUserChatTabs) &&
    subUserChatTabs.find((e) => e.status === true);

  let messageSubUser = {
    id: Date.now().toString(),
    subUserChatId: activeSubUser?.id,
    name: newObj.name,
    role: newObj.role,
    image: newObj.image,
    text: showSend,
    userAuthId: accessLogin.id,
    userChatId: chatById[0]?.id,
    subUserTabId: activeTab,
    dateTime: time,
    replyMessage: {},
  };

  let messageSubTabUser = {
    id: Date.now().toString(),
    subUserChatId: activeSubInvitorUser?.subUserChatId,
    name: newObj.name,
    role: newObj.role,
    image: newObj.image,
    text: showSend,
    userAuthId: accessLogin.id,
    userChatId: chatById[0]?.id,
    subUserTabId: activeTab,
    dateTime: time,
    replyMessage: {},
  };

  const isActivePostSubMessageStatus =
    Array.isArray(subUserChatTabs) &&
    subUserChatTabs.every((e) => e.status === false);

  const isActivePostSubMessageUser =
    Array.isArray(subUserChats) &&
    subUserChats.some((e) => e.userAuthId === accessLogin.id);

  // Условие для отправки мессенджа исполнителей
  const isActivePostSubMessage =
    isActivePostSubMessageStatus && isActivePostSubMessageUser;

  // Условие для отправки мессенджа участников вкладки
  const isActivePostSubTabMessages =
    Array.isArray(subUserChatTabs) &&
    subUserChatTabs.some((e) => e.status === true);

  const handlePostSubMessage = () => {
    console.log(isActivePostSubMessageStatus);
    // console.log(messageSubUser);
    // Добавил новое условие, что до создание вкладок можно писать сообщение, на данный момент если вкладок нет то и сообщение не пишутся и тем более не отображаются
    if (isActivePostSubMessage || subUserChatTabs.length === 0) {
      console.log(messageSubUser);
      Dispatch(postSubMessage(messageSubUser));
    }
    setShowSend("");
  };

  const handlePostSubTabMessage = () => {
    if (isActivePostSubTabMessages) {
      Dispatch(postSubTabMessages(messageSubTabUser));
    }
    setShowSend("");
  };

  useEffect(() => {
    setShowSend("");
  }, [subUserChatTabsById[0]?.id]);

  return (
    <div className="input-message border-[2px] rounded-lg border-[#007fd2] p-[5px] w-full flex justify-between relative">
      <input
        value={showSend}
        onChange={(event) => setShowSend(event.target.value)}
        type="text"
        placeholder="Введите сообщение"
        disabled={chatById[0]?.id === accessLogin?.id}
        className={`${
          chatById[0]?.id === accessLogin?.id ? "cursor-not-allowed" : ""
        } w-full h-[100%] p-[15px] outline-none placeholder:text-[#00558e] placeholder:font-medium`}
      />
      <div className="panel-submit flex items-center gap-2">
        <IconButton>
          <AddToDriveIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            handlePostSubMessage();
            handlePostSubTabMessage();
          }}
        >
          <SendIcon
            className={`${showSend.length > 0 ? "text-[#007fd2]" : ""} `}
          />
        </IconButton>
      </div>
      {arr.includes("@") && <MentionUsersChat />}
    </div>
  );
};

export default SubInputMessage;
