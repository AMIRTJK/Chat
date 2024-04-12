import React, { useEffect } from "react";
import MentionUser from "./MentionUser";
import { getUserChats } from "../actions/chatApi";

import { useDispatch, useSelector } from "react-redux";

const MentionUsersChat = () => {
  const Dispatch = useDispatch();

  const userChats = useSelector((store) => store.chat.userChats);

  useEffect(() => {
    Dispatch(getUserChats());
  }, [Dispatch]);

  return (
    <div className="pop-up absolute w-[20%] bg-[#fff] border-[2px] shadow-lg rounded-lg bottom-[100%] overflow-hidden">
      <h1 className="text-center font-[500] bg-[#e4e4e4] py-[5px] border-b-[2px]">
        Пользователи чата
      </h1>
      <ul className="wrapper-users flex flex-col overflow-auto max-h-[30vh]">
        {userChats.map((e) => {
          return <MentionUser key={e.id} item={e} />;
        })}
      </ul>
    </div>
  );
};

export default MentionUsersChat;
