import React, { useEffect } from "react";
import {
  getSubMessages,
  getSubTabMessages,
  getSubUserChatTabsById,
} from "../actions/chatApi";
import SubMessageText from "./SubMessageText";
import { useSelector, useDispatch } from "react-redux";

const SubBodyMessages = () => {
  const subChatById = useSelector((store) => store.chat.subChatById);
  const subMessages = useSelector((store) => store.chat.subMessages);
  const chatById = useSelector((store) => store.chat.chatById);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const subUserChatsTabs = useSelector((store) => store.chat.subUserChatsTabs);
  const subTabMessages = useSelector((store) => store.chat.subTabMessages);
  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getSubMessages());
    Dispatch(getSubTabMessages());
  }, [Dispatch]);

  const filteredSubMessages =
    Array.isArray(subMessages) &&
    subMessages.filter((subMessage) => {
      return (
        Array.isArray(subUserChats) &&
        subUserChats.some((subChat) => {
          return (
            chatById[0]?.id === subMessage.userChatId &&
            subChat.userAuthId === subMessage.subUserChatId
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

  return (
    <main className="category-scrollbar h-[69vh] overflow-auto relative">
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
      </ul>
    </main>
  );
};

export default SubBodyMessages;
