import React, { useState, useEffect } from "react";
import {
  getSubMessages,
  getSubTabMessages,
  getSubUserChatTabsById,
  getTabVisaUsers,
  postSubTabVisaMessages,
  getUsers,
} from "../actions/chatApi";
import SubMessageText from "./SubMessageText";
import { useSelector, useDispatch } from "react-redux";

import { Avatar } from "@mui/material";

const SubTabVisaUser = ({ filteredSubTabVisaUser }) => {
  const subChatById = useSelector((store) => store.chat.subChatById);
  const subMessages = useSelector((store) => store.chat.subMessages);
  const chatById = useSelector((store) => store.chat.chatById);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const subUserChatsTabs = useSelector((store) => store.chat.subUserChatsTabs);
  const subTabMessages = useSelector((store) => store.chat.subTabMessages);
  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );
  const subTabVisaUsers = useSelector((store) => store.chat.subTabVisaUsers);
  const subUserChatTabs = useSelector((store) => store.chat.subUserChatTabs);
  const subTabVisaMessages = useSelector(
    (store) => store.chat.subTabVisaMessages
  );
  const users = useSelector((store) => store.chat.users);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const Dispatch = useDispatch();

  const [subVisa] = filteredSubTabVisaUser;

  const date = subVisa?.createdAt?.split("-");

  const filteredUser = users.filter(
    (e) => e.userAuthId === subVisa?.userAuthId
  );

  console.log(filteredUser);

  useEffect(() => {
    Dispatch(getTabVisaUsers());
    Dispatch(getSubUserChatTabsById());
    Dispatch(postSubTabVisaMessages());
    Dispatch(getUsers());
  }, [Dispatch]);

  return (
    <div className="visa flex justify-between items-start p-[30px] border-b-[1px]">
      <div className="user flex items-center gap-5">
        <Avatar src={filteredUser[0]?.image} />
        <div className="user-text">
          <p>{filteredUser[0]?.name}</p>
          <p>{filteredUser[0]?.role}</p>
        </div>
      </div>
      <div className="visa-members">
        <p>Бехруз Рамазонович</p>
        <p>Бехруз Рамазонович</p>
      </div>
      <div className="visa-message">
        {Array.isArray(subTabVisaMessages) &&
          subTabVisaMessages.map((e) => {
            if (e.subVisaUserId === subVisa?.id) {
              return <p>{e.name}</p>;
            }
          })}
      </div>
      <div className="visa-term">
        <p>До: {subVisa?.term}</p>
      </div>
      <div className="visa-date">
        <p>Нет подписи</p>
        <p>{filteredUser[0]?.name}</p>
        <div className="term flex gap-2">
          <p className="underline text-[#345581] font-semibold text-[14px]">
            «{Array.isArray(date) && date[0]}»
          </p>
          <p className="underline text-[#345581] font-semibold text-[14px]">
            &emsp;&emsp;&emsp;{Array.isArray(date) && date[1]}
            &emsp;&emsp;&emsp;
          </p>
          <p className="text-[#345581] font-semibold text-[14px]">
            {Array.isArray(date) && date[2]}c.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubTabVisaUser;
