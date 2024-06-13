import React, { useEffect, useState } from "react";
import { Button, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  getSubUserChatTabs,
  deleteSubUserChatTabs,
  getSubUserChatTabsById,
  putSubUserChatTabsById,
  putSubMessages,
  getInvitedToSubChatTabs,
  postSubTabMessages,
} from "../actions/chatApi";

import InputTabName from "./InputTabName";

import { actions } from "../slices/chat-slice";

const SubTitleChat = () => {
  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const chatById = useSelector((store) => store.chat.chatById);
  const subChatById = useSelector((store) => store.chat.subChatById);
  const subMessages = useSelector((store) => store.chat.subMessages);
  const subUserChatTabs = useSelector((store) => store.chat.subUserChatTabs);
  const idxSubTab = useSelector((store) => store.chat.idxSubTab);
  const invitedToSubChatTabs = useSelector(
    (store) => store.chat.invitedToSubChatTabs
  );
  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );

  const tabNameValue = useSelector((store) => store.chat.tabNameValue);

  const { setIdxSubTab, setTabNameValue } = actions;

  const [tabName, setTabName] = useState(false);

  const Dispatch = useDispatch();

  const handleSubTabMessagesById = async (item) => {
    // Отключаем все вкладки
    for (const e of Array.isArray(subUserChatTabs) && subUserChatTabs) {
      if (e.status === true) {
        await Dispatch(putSubUserChatTabsById({ ...e, status: false }));
      }
    }

    // Включаем выбранную вкладку
    await Dispatch(putSubUserChatTabsById({ ...item, status: true }));

    for (const subMessage of Array.isArray(subMessages) && subMessages) {
      if (subMessage.subUserTabId === false) {
        await Dispatch(putSubMessages({ ...subMessage, subUserTabId: true }));
      }
    }

    // Получаем данные для выбранной вкладки
    Dispatch(getSubUserChatTabsById(item.id));
    Dispatch(setIdxSubTab(item.id));
  };

  const handleSetStatusSubChat = async () => {
    // Отключаем все вкладки
    for (const subTab of Array.isArray(subUserChatTabs) && subUserChatTabs) {
      if (subTab.status === true) {
        for (const subMessage of Array.isArray(subMessages) && subMessages) {
          await Dispatch(
            putSubMessages({ ...subMessage, subUserTabId: false })
          );
        }
        await Dispatch(putSubUserChatTabsById({ ...subTab, status: false }));
      }
    }
  };

  const handleShowTabName = (state) => {
    setTabName(state);
  };

  const handleDeleteSubUserChatTabs = (id) => {
    Dispatch(deleteSubUserChatTabs(id));
  };

  useEffect(() => {
    Dispatch(getSubUserChatTabs());
    Dispatch(getInvitedToSubChatTabs());
  }, [Dispatch, subMessages]);

  return (
    <>
      <header className="bg-[#f5f5f5]  p-[30px] flex justify-between items-center flex-wrap">
        <div className="wrapper-tabs flex items-end gap-3">
          <Button
            onClick={() => handleSetStatusSubChat()}
            variant={subMessages[0]?.subUserTabId ? "outlined" : "contained"}
          >
            Исполнители
          </Button>
          <div className="wrapper-sub-tabs flex gap-5">
            {Array.isArray(subUserChatTabs) &&
              subUserChatTabs.map((e) => {
                if (
                  (accessLogin.id === e.userAuthId &&
                    chatById[0]?.id === e.userChatId) ||
                  // нижнее второе условие конфликтует с вышестояшим, то есть Зафар Азими видит лишние вкладки
                  (invitedToSubChatTabs[0]?.subUserChatTabId === e.id &&
                    chatById[0]?.id === e.userChatId)
                )
                  return (
                    <Button
                      onClick={() => handleSubTabMessagesById(e)}
                      key={e.id}
                      variant={e.status ? "contained" : "outlined"}
                      sx={{
                        fontSize: "13px",
                        height: "30px",
                        position: "relative",
                        paddingRight: "30px",
                      }}
                    >
                      {e.name}
                      <CloseIcon
                        onClick={() => handleDeleteSubUserChatTabs(e.id)}
                        sx={{
                          fontSize: "17px",
                          color: e.status ? "white" : "000000af",
                          position: "absolute",
                          bottom: "10px",
                          right: "0",
                          padding: "2px",
                          "&:hover": {
                            color: "#000000",
                          },
                        }}
                      />
                    </Button>
                  );
              })}
          </div>
          <IconButton
            onClick={() => {
              handleShowTabName(true);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#007bd220",
              },
            }}
          >
            <AddIcon />
          </IconButton>
          {tabName && <InputTabName handleShowTabName={handleShowTabName} />}
        </div>
        <div className="panel-user flex items-end gap-3">
          {subUserChats?.map((e) => {
            if (
              e.userChatId === chatById[0]?.id &&
              e.userAuthId === subUserChatTabsById[0]?.userAuthId
              // Нужно добавить условие либо еще один map для того чтобы вывести Avatar пользователей подчата, на данный момент выводятся только пользователи вкладок подчата
            )
              return (
                <>
                  <IconButton key={e.id} sx={{ padding: "0px" }}>
                    <Avatar src={e.image} />
                  </IconButton>
                  {invitedToSubChatTabs?.map((invite) => {
                    if (
                      subUserChatTabsById[0]?.id === invite.subUserChatTabId
                    ) {
                      return (
                        <IconButton key={invite.id} sx={{ padding: "0px" }}>
                          <Avatar
                            src={invite.image}
                            sx={{ width: "24px", height: "24px" }}
                          />
                        </IconButton>
                      );
                    }
                  })}
                </>
              );
          })}
        </div>
      </header>
    </>
  );
};

export default SubTitleChat;
