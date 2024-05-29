import React, { useEffect } from "react";
import { getSubMessages } from "../actions/chatApi";
import SubMessageText from "./SubMessageText";
import { useSelector, useDispatch } from "react-redux";

const SubBodyMessages = () => {
  const subChatById = useSelector((store) => store.chat.subChatById);
  const subMessages = useSelector((store) => store.chat.subMessages);
  const chatById = useSelector((store) => store.chat.chatById);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getSubMessages());
  }, []);

  return (
    <main className="category-scrollbar h-[69vh] overflow-auto relative">
      <ul>
        {Array.isArray(subMessages) &&
          subMessages.map((e) => {
            // Алгоритм для того что только исполнитель видел свои сообщения в том чате в котором приглашен
            if (
              subChatById[0]?.userAuthId === e.subUserChatId &&
              chatById[0]?.id === e.userChatId
            ) {
              return <SubMessageText key={e.id} item={e} />;
            }
            // Алгоритм для того чтобы создател чата мог просматривать внутренные чаты тех кого добавил
            else if (
              chatById[0]?.id === e.userChatId &&
              accessLogin.id === e.userChatId && // в этом условии проблема, нужно узнать как исправить
              subChatById[0]?.userAuthId === e.subUserChatId
            ) {
              return <SubMessageText key={e.id} item={e} />;
            }
          })}
      </ul>
    </main>
  );
};

export default SubBodyMessages;
