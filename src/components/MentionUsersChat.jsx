import React, { useEffect } from "react";
import MentionUser from "./MentionUser";
import { getUserChats } from "../actions/chatApi";

import { useDispatch, useSelector } from "react-redux";

const MentionUsersChat = () => {
  const Dispatch = useDispatch();

  const userChats = useSelector((store) => store.chat.userChats);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const subUserChatTabs = useSelector((store) => store.chat.subUserChatTabs);
  const chatById = useSelector((store) => store.chat.chatById);

  const subChatMemberIsActive =
    Array.isArray(subUserChatTabs) &&
    subUserChatTabs.every((e) => e.status === false);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const filteredUserChat = userChats.filter((e) => accessLogin.id === e.id);

  const filteredSubUserChat = subUserChats.filter(
    (e) => subChatMemberIsActive && chatById[0]?.id !== accessLogin.id
  );

  console.log(chatById[0]);

  useEffect(() => {
    Dispatch(getUserChats());
  }, [Dispatch]);

  return (
    <div className="pop-up absolute w-[20%] bg-[#fff] border-[2px] shadow-lg rounded-lg bottom-[100%] overflow-hidden">
      <h1 className="text-center font-[500] bg-[#e4e4e4] py-[5px] border-b-[2px]">
        Пользователи чата
      </h1>
      <ul className="wrapper-users flex flex-col overflow-auto max-h-[30vh]">
        {filteredUserChat.map((e) => {
          return <MentionUser key={e.id} item={e} />;
        })}
        {filteredSubUserChat.map((e) => {
          return <MentionUser key={e.id} item={e} />;
        })}
      </ul>
    </div>
  );
};

export default MentionUsersChat;
