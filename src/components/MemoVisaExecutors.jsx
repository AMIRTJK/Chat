import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVisaMessage, getVisaUsers, getUsers } from "../actions/chatApi";

import { Avatar } from "@mui/material";

const MemoVisaExecutors = () => {
  const visaUsers = useSelector((store) => store.chat.visaUsers);
  const chatById = useSelector((store) => store.chat.chatById);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const visaMessage = useSelector((store) => store.chat.visaMessage);

  const Dispatch = useDispatch();

  // const emblem = "https://i.ibb.co/xCjbnnw/emblem.png";

  const [visaUser, setVisaUser] = useState({});

  const tempVisaUser = () => {
    Array.isArray(visaUsers) &&
      visaUsers.forEach((e) => {
        if (e.userAuthId === chatById[0]?.id) {
          setVisaUser(e);
        }
      });
  };

  const date = visaUser?.createdAt?.split("-");

  const users = useSelector((store) => store.chat.users);

  const filteredExecutor = users.find(
    (e) => e.userAuthId === visaUsers[0]?.userAuthId
  );

  console.log(filteredExecutor);

  useEffect(() => {
    Dispatch(getVisaUsers());
    Dispatch(getVisaMessage());
  }, [Dispatch]);

  useEffect(() => {
    tempVisaUser();
  }, [visaUsers, chatById]);

  return (
    // <main className="flex justify-between items-start flex-wrap w-[70%]">
    //   <div className="wrapper-logo flex flex-col items-center gap-2 w-[19%]">
    //     {/* <img src={emblem} alt="" className="w-[20%]" /> */}
    //     <h1 className="uppercase text-center text-[#345581] font-semibold text-[13px]">
    //       {chatById[0]?.id === "3"
    //         ? "Муовини якуми Вазири молияи Чумхурии Точикистон"
    //         : "Муовини Вазири молияи Чумхурии Точикистон"}
    //     </h1>
    //   </div>
    //   <div className="executors w-[19%] flex flex-col items-start">
    //     {Array.isArray(subUserChats) &&
    //       subUserChats.map((e) => {
    //         if (e.userChatId === chatById[0]?.id && !e.showInSubChat) {
    //           return (
    //             <p key={e.id} className="font-semibold text-[13px]">
    //               {e.name}
    //             </p>
    //           );
    //         }
    //       })}
    //   </div>
    //   <div className="visa-message w-[19%] flex items-center flex-col">
    //     {Array.isArray(visaMessage) &&
    //       visaMessage.map((e) => {
    //         if (e.visaUserId === chatById[0]?.id) {
    //           return (
    //             <p key={e.id} className="text-center text-[13px]">
    //               {e.name}
    //             </p>
    //           );
    //         }
    //       })}
    //   </div>
    //   <div className="term-state">
    //     <p className="text-[14px]">До: {visaUser.term}</p>
    //     {/* <p className="text-[14px]">Статус: Назорати {visaUser.status}</p> */}
    //   </div>
    //   <div className="wrapper-signature flex flex-col">
    //     <div className="signature flex flex-col">
    //       <p className="hover:text-[#ff0000] cursor-pointer text-[13px] text-[#345581] font-bold">
    //         {visaUser.eds ? "Подпись" : "Подпсать"}
    //       </p>
    //       <p className="font-semibold text-[#345581] text-[14px]">
    //         {chatById[0]?.name}
    //       </p>
    //     </div>
    //     <div className="term flex gap-2">
    //       <p className="underline text-[#345581] font-semibold text-[14px]">
    //         «{Array.isArray(date) && date[0]}»
    //       </p>
    //       <p className="underline text-[#345581] font-semibold text-[14px]">
    //         &emsp;&emsp;&emsp;{Array.isArray(date) && date[1]}&emsp;&emsp;&emsp;
    //       </p>
    //       <p className="text-[#345581] font-semibold text-[14px]">
    //         {Array.isArray(date) && date[2]}c.
    //       </p>
    //     </div>
    //   </div>
    // </main>
    <div className="visa flex justify-between items-start p-[30px] border-b-[1px]">
      <div className="user flex items-center gap-5">
        <Avatar src={filteredExecutor?.image} />
        <div className="user-text">
          <p className="text-[#007cd2] font-[500]">{filteredExecutor?.name}</p>
          <p className="text-[#989898] text-[14px]">{filteredExecutor?.role}</p>
        </div>
      </div>
      <div className="executors w-[19%] flex flex-col items-start">
        {Array.isArray(subUserChats) &&
          subUserChats.map((e) => {
            if (e.userChatId === chatById[0]?.id && !e.showInSubChat) {
              return <p key={e.id}>{e.name}</p>;
            }
          })}
      </div>
      <div className="visa-message">
        {Array.isArray(visaMessage) &&
          visaMessage.map((e) => {
            if (e.visaUserId === chatById[0]?.id) {
              return <p key={e.id}>{e.name}</p>;
            }
          })}
      </div>
      <div className="term-state">
        <p className="text-[14px]">До: {visaUser.term}</p>
        {/* <p className="text-[14px]">Статус: Назорати {visaUser.status}</p> */}
      </div>
      <div className="wrapper-signature flex flex-col">
        <div className="signature flex flex-col">
          <p className="hover:text-[#ff0000] cursor-pointer">
            {visaUser.eds ? "Подпись" : "Подпись"}
          </p>
          <p className="font-semibold text-[#345581]">{chatById[0]?.name}</p>
        </div>
        <div className="term flex gap-2">
          <p className="underline text-[#345581] font-semibold text-[14px]">
            «{Array.isArray(date) && date[0]}»
          </p>
          <p className="underline text-[#345581] font-semibold text-[14px]">
            &emsp;&emsp;&emsp;{Array.isArray(date) && date[1]}&emsp;&emsp;&emsp;
          </p>
          <p className="text-[#345581] font-semibold text-[14px]">
            {Array.isArray(date) && date[2]}c.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoVisaExecutors;
