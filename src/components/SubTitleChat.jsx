import React, { useEffect, useState } from "react";
import { Button, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { putUserChatsExecutor, getSubChatById } from "../actions/chatApi";

const SubTitleChat = () => {
  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const chatById = useSelector((store) => store.chat.chatById);
  const subChatById = useSelector((store) => store.chat.subChatById);

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
              chatById[0]?.id === e.userChatId &&
              accessLogin?.id === e.userAuthId
              // accessLogin?.id === "6" нужно доработать логику, чтобы тот кого выбрал визирующий (внутренного чата) тоже видел вкладки, к примеру Юсуф Хайрулло выбрал Акрамшох Рамазоновича, а он в свою очередь Бехруз Рамазоновича и чтобы Бехруз Рамазонович видел вкладки
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
        <IconButton sx={{ padding: "0px" }}>
          <Avatar src="" sx={{ width: "24px", height: "24px" }} />
        </IconButton>
        <IconButton sx={{ padding: "0px" }}>
          <Avatar src="" sx={{ width: "24px", height: "24px" }} />
        </IconButton>
      </div>
    </header>
  );
};

export default SubTitleChat;
