import React, { useState, useEffect } from "react";
import {
  getSubMessages,
  getSubTabMessages,
  getTabVisaUsers,
} from "../actions/chatApi";
import SubMessageText from "./SubMessageText";
import { useSelector, useDispatch } from "react-redux";

import SubTabVisaUser from "./SubTabVisaUser";

import ConclusionEnd from "./ConclusionEnd";

const SubBodyMessages = () => {
  const users = useSelector((store) => store.chat.users);
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

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const Dispatch = useDispatch();

  const filteredSubMessages =
    Array.isArray(subMessages) &&
    subMessages.filter((subMessage) => {
      return (
        Array.isArray(subUserChats) &&
        subUserChats.some((subChat) => {
          return (
            chatById[0]?.id === subMessage.userChatId &&
            subChat.id === subMessage.subUserChatId
          );
        })
      );
    });

  const filteredSubMessagesByTabId =
    Array.isArray(subTabMessages) &&
    subTabMessages.filter(
      (subTabMessage) =>
        chatById[0]?.id === subTabMessage.userChatId &&
        subUserChatTabsById[0]?.subUserChatId === subTabMessage.subUserChatId &&
        subUserChatTabsById[0]?.id === subTabMessage.subUserTabId
    );

  const filteredSubTabVisaUser =
    Array.isArray(subTabVisaUsers) &&
    subTabVisaUsers.filter((subVisa) => {
      return (
        Array.isArray(subUserChatTabs) &&
        subUserChatTabs.some(
          (subTab) =>
            subVisa.subUserChatTabId === subTab.id && subTab.status === true
        )
      );
    });

  const isActiveSubTabVisa =
    Array.isArray(subUserChatTabs) &&
    subUserChatTabs.some(
      (e) =>
        e.id ===
        filteredSubTabVisaUser[filteredSubTabVisaUser.length - 1]
          ?.subUserChatTabId
    );

  const subTabConclusionList = useSelector(
    (store) => store.chat.subTabConclusionList
  );

  const subTabConclusionListTemp = useSelector(
    (store) => store.chat.subTabConclusionListTemp
  );

  const currentSubUserChatTabs =
    Array.isArray(subUserChatTabs) &&
    subUserChatTabs.find((e) => e.status === true);

  // Чуть позже необходимо использовать, если участник находится в чате Исполнители то он должен видеть заключение
  const isActiveSubUserChatTabs =
    Array.isArray(subUserChatTabs) &&
    subUserChatTabs.every((e) => e.status === false);

  const isActiveConclusionEnd =
    subTabConclusionListTemp[subTabConclusionListTemp.length - 1]?.statusEnd &&
    currentSubUserChatTabs?.id ===
      subTabConclusionListTemp[subTabConclusionListTemp.length - 1]
        ?.subUserChatTabId;

  const date =
    subTabConclusionListTemp[subTabConclusionListTemp.length - 1]?.endTime;

  const creatorEndingConclusion =
    Array.isArray(subTabConclusionList) &&
    subTabConclusionList.find((e) => e.status);

  const userEndConclusion = users.find(
    (e) => creatorEndingConclusion?.userAuthId === e.userAuthId
  );

  useEffect(() => {
    Dispatch(getSubMessages());
    Dispatch(getSubTabMessages());
    Dispatch(getTabVisaUsers());
  }, [Dispatch]);

  return (
    <main className="category-scrollbar h-[69vh] overflow-auto relative">
      {/* Этот запрос ломает логику отображение, если закоментировать то при нажатии на вкладки и список участников и сообщение чатов отображаются, а если оставить как есть то их нет */}
      {isActiveSubTabVisa && (
        <SubTabVisaUser filteredSubTabVisaUser={filteredSubTabVisaUser} />
      )}
      <ul>
        {Array.isArray(filteredSubMessages) &&
          filteredSubMessages.map((e) => {
            if (e.subUserTabId === false) {
              return <SubMessageText key={e.id} item={e} />;
            }
          })}
        {Array.isArray(filteredSubMessagesByTabId) &&
          filteredSubMessagesByTabId.map((e) => {
            return <SubMessageText key={e.id} item={e} />;
          })}
        {isActiveConclusionEnd && (
          <ConclusionEnd
            user={userEndConclusion}
            creatorEndingConclusion={creatorEndingConclusion}
            date={date}
          />
        )}
      </ul>
    </main>
  );
};

export default SubBodyMessages;
