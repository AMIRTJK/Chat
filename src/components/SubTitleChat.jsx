import React, { useEffect, useState } from "react";
import { Button, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import {
  putUserChatsExecutor,
  getSubChatById,
  getInviteToSubChat,
} from "../actions/chatApi";

const SubTitleChat = () => {
  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const chatById = useSelector((store) => store.chat.chatById);
  const subChatById = useSelector((store) => store.chat.subChatById);
  const inviteToSubChat = useSelector((store) => store.chat.inviteToSubChat);

  const Dispatch = useDispatch();

  const handlePutSubUserChatStatus = (item) => {
    Dispatch(putUserChatsExecutor({ ...item, status: true }));
    Array.isArray(subUserChats) &&
      subUserChats.forEach((e) => {
        if (e.status === true) {
          Dispatch(putUserChatsExecutor({ ...e, status: false }));
        }
      });
  };

  useEffect(() => {
    Array.isArray(subUserChats) &&
      subUserChats.map((e) => {
        if (e.status) {
          Dispatch(getSubChatById(e.id));
        }
      });
    Dispatch(getInviteToSubChat());
  }, [Dispatch, subUserChats]);

  console.log(subChatById);

  return (
    <header className="bg-[#f5f5f5]  p-[30px] flex justify-between items-center">
      <div className="wrapper-tabs flex gap-5">
        {Array.isArray(subUserChats) &&
          subUserChats.map((e) => {
            // Алгоритм для создателей родительского чата
            if (
              accessLogin?.id === e.userChatId &&
              chatById[0]?.id === e.userChatId
            ) {
              return (
                <Button
                  onClick={() => {
                    handlePutSubUserChatStatus(e);
                  }}
                  key={e.id}
                  variant={e.status ? "contained" : "outlined"}
                >
                  {e.name}
                </Button>
              );
            }
            // Алгоритм для создателей дочернего чата
            else if (
              (chatById[0]?.id === e.userChatId &&
                accessLogin?.id === e.userAuthId) ||
              // Алгоритм для участников дочернего чата - неккоректно работает, пока что у меня недостаточно знаний чтобы написать этот алгоритм. Нужно доработать логику, хоть и исполнители визирующего (Акрамшох Рамазонович) и видят вкладки относящиеся к ним, они также видят вкладки других визирующих
              inviteToSubChat.some(
                (invite) =>
                  invite.userAuthId === accessLogin.id &&
                  chatById[0]?.id === e.userChatId &&
                  invite.subUserChatId === e.userAuthId
              )
            ) {
              return (
                <Button
                  onClick={() => {
                    handlePutSubUserChatStatus(e);
                  }}
                  key={e.id}
                  variant={e.status ? "contained" : "outlined"}
                >
                  {e.name}
                </Button>
              );
            }
          })}
      </div>
      <div className="panel-user flex items-end gap-2">
        <IconButton sx={{ padding: "0px" }}>
          <Avatar src={subChatById[0]?.image} />
        </IconButton>
        {Array.isArray(inviteToSubChat) &&
          inviteToSubChat.map((e) => {
            if (
              (chatById[0]?.id === e.userChatId &&
                subChatById[0]?.userAuthId === e.subUserChatId) ||
              //Условие ниже не совсем точно работает
              (accessLogin?.id === e.userAuthId &&
                accessLogin?.id !== e.userChatId &&
                accessLogin?.id !== e.subUserChatId)
            ) {
              return (
                <IconButton key={e.id} sx={{ padding: "0px" }}>
                  <Avatar
                    src={e.image}
                    sx={{ width: "24px", height: "24px" }}
                  />
                </IconButton>
              );
            }
          })}
      </div>
    </header>
  );
};

export default SubTitleChat;
