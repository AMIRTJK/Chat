import React, { useEffect, useState } from "react";
import { Button, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import {
  putUserChatsExecutor,
  getSubChatById,
  getInviteToSubChat,
  getUserChatsExecutorTabs,
  postUserChatsExecutorTabs,
  deleteUserChatsExecutorTabs,
} from "../actions/chatApi";

const SubTitleChat = () => {
  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const chatById = useSelector((store) => store.chat.chatById);
  const subChatById = useSelector((store) => store.chat.subChatById);
  const inviteToSubChat = useSelector((store) => store.chat.inviteToSubChat);
  const subUserChatsTabs = useSelector((store) => store.chat.subUserChatsTabs);

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
    Dispatch(getUserChatsExecutorTabs());
  }, [Dispatch, subUserChats]);

  const handlePostSubUserChatsTab = () => {
    let cnt = 1;
    subUserChatsTabs.forEach((e) => {
      if (e.userAuthId === accessLogin.id && chatById[0]?.id === e.userChatId) {
        cnt++;
      }
    });

    let newObj = {};
    Array.isArray(subUserChats) &&
      subUserChats.forEach((e) => {
        if (
          chatById[0]?.id === e.userChatId &&
          accessLogin.id === e.userAuthId
        ) {
          newObj = {
            id: Date.now().toString(),
            subUserChat: e.id,
            userAuthId: e.userAuthId,
            userChatId: e.userChatId,
            name: `Вкладка №${cnt}`,
            status: true,
          };
        }
      });
    Dispatch(postUserChatsExecutorTabs(newObj));
  };

  return (
    <header className="bg-[#f5f5f5]  p-[30px] flex justify-between items-center flex-wrap">
      <div className="wrapper-tabs flex items-end gap-5">
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
              (Array.isArray(inviteToSubChat) &&
                inviteToSubChat.some(
                  (invite) =>
                    invite.userAuthId === accessLogin.id &&
                    chatById[0]?.id === e.userChatId &&
                    invite.subUserChatId === e.userAuthId
                ))
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
        <div className="wrapper-sub-tabs flex gap-5">
          {Array.isArray(subUserChatsTabs) &&
            subUserChatsTabs.map((e) => {
              if (
                e.userAuthId === accessLogin.id &&
                chatById[0]?.id === e.userChatId
              ) {
                return (
                  <Button
                    key={e.id}
                    variant="outlined"
                    sx={{
                      fontSize: "13px",
                      color: "green",
                      height: "30px",
                      width: "160px",
                      position: "relative",
                      borderColor: "green",
                      "&:hover": {
                        borderColor: "green",
                      },
                    }}
                  >
                    {e.name}
                    <CloseIcon
                      onClick={() =>
                        Dispatch(deleteUserChatsExecutorTabs(e.id))
                      }
                      sx={{
                        fontSize: "17px",
                        color: "#000000af",
                        position: "absolute",
                        bottom: "10px",
                        left: "140px",
                        padding: "2px",
                        "&:hover": {
                          color: "#000000",
                        },
                      }}
                    />
                  </Button>
                );
              }
            })}
        </div>
        <IconButton
          onClick={() => handlePostSubUserChatsTab()}
          sx={{
            "&:hover": {
              backgroundColor: "#007bd220",
            },
          }}
        >
          <AddIcon />
        </IconButton>
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
