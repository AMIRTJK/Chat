import React, { useEffect } from "react";
import { getSubMessages } from "../actions/chatApi";
import SubMessageText from "./SubMessageText";
import { useSelector, useDispatch } from "react-redux";

const SubBodyMessages = () => {
  const subChatById = useSelector((store) => store.chat.subChatById);
  const subMessages = useSelector((store) => store.chat.subMessages);
  const chatById = useSelector((store) => store.chat.chatById);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const subUserChatsTabs = useSelector((store) => store.chat.subUserChatsTabs);

  const subChatUser =
    Array.isArray(subMessages) &&
    subMessages.some((message) => {
      return (
        Array.isArray(subUserChats) &&
        subUserChats.some(
          (subUser) =>
            chatById[0]?.id === message.userChatId &&
            message.subUserChatId === subUser.userAuthId
        )
      );
    });

  const isActiveSubChatUser =
    Array.isArray(subUserChats) &&
    subUserChats.some((subChat) => {
      return (
        Array.isArray(subMessages) &&
        subMessages.some(
          (subMessage) =>
            subChat.userAuthId === subMessage.subUserChatId &&
            chatById[0]?.id === subMessage.userChatId
        )
      );
    });

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getSubMessages());
  }, []);

  return (
    <main className="category-scrollbar h-[69vh] overflow-auto relative">
      <ul>
        {/* {Array.isArray(subMessages) &&
          subMessages.map((e) => {
            // Алгоритм для того что только исполнитель видел свои сообщения в том чате в котором приглашен
            if (isActiveSubChatUser) {
              return <SubMessageText key={e.id} item={e} />;
            }
            // Алгоритм для того чтобы создател чата мог просматривать внутренные чаты тех кого добавил
            else if (subChatUser) {
              return <SubMessageText key={e.id} item={e} />;
            }
          })} */}
        {Array.isArray(subUserChats) &&
          subUserChats.map((subChat) => {
            return (
              Array.isArray(subMessages) &&
              subMessages.map((subMessage) => {
                if (
                  subChat.userAuthId === subMessage.subUserChatId &&
                  chatById[0]?.id === subMessage.userChatId &&
                  subMessage.subUserTabId === null
                ) {
                  return (
                    <SubMessageText key={subMessage.id} item={subMessage} />
                  );
                }
                return null;
              })
            );
          })}
        {Array.isArray(subUserChatsTabs) &&
          subUserChatsTabs.map((subTab) => {
            return (
              Array.isArray(subMessages) &&
              subMessages.map((subMessage) => {
                if (
                  subTab.id === subMessage.subUserTabId &&
                  chatById[0]?.id === subMessage.userChatId &&
                  subTab.status === true
                ) {
                  console.log(subMessage);
                  return (
                    <SubMessageText key={subMessage.id} item={subMessage} />
                  );
                }
                return null;
              })
            );
          })}
      </ul>
    </main>
  );
};

export default SubBodyMessages;
