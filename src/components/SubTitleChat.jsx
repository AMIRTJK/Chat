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

  // const isActive =
  //   Array.isArray(inviteToSubChat) &&
  //   inviteToSubChat.some((e) => {
  //     if (
  //       (chatById[0]?.id === e.userChatId &&
  //         accessLogin?.id === e.subUserChatId) ||
  //       (chatById[0]?.id === e.userChatId && accessLogin?.id === e.userAuthId)
  //     ) {
  //       return e;
  //     }
  //   });

  useEffect(() => {
    Array.isArray(subUserChats) &&
      subUserChats.map((e) => {
        if (e.status) {
          Dispatch(getSubChatById(e.id));
        }
      });
    Dispatch(getInviteToSubChat());
  }, [Dispatch, subUserChats]);

  return (
    <header className="bg-[#f5f5f5]  p-[30px] flex justify-between items-center">
      <div className="wrapper-tabs flex gap-5">
        {Array.isArray(subUserChats) &&
          subUserChats.map((e) => {
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
            } else if (
              (chatById[0]?.id === e.userChatId &&
                accessLogin?.id === e.userAuthId) ||
              (inviteToSubChat[0]?.userAuthId === accessLogin.id &&
                chatById[0]?.id === e.userChatId &&
                inviteToSubChat[0]?.subUserChatId === e.userAuthId)
              // accessLogin?.id === "6" нужно доработать логику, хоть и исполнители визирующего (Акрамшох Рамазонович) и видят вкладки относящиеся к ним, они также видят вкладки других визирующих + нужно добавить цикл для InviteToSubChat сейчас для теста просто указан первый элемент массива, но данная логика не будет работать если в массиве больше 1 значение
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
                accessLogin?.id === e.subUserChatId) ||
              (accessLogin?.id === e.userChatId &&
                chatById[0]?.id === e.userChatId)
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
