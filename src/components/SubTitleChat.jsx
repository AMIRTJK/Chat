import React, { useEffect, useState } from "react";
import { Button, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import InviteToSubChat from "./InviteToSubChat";

import {
  putUserChatsExecutor,
  getSubChatById,
  getInviteToSubChat,
  getUserChatsExecutorTabs,
  postUserChatsExecutorTabs,
  putUserChatsExecutorTabs,
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

  // const handlePutSubUserChatStatus = (item) => {
  //   Dispatch(putUserChatsExecutor({ ...item, status: true }));
  //   Array.isArray(subUserChats) &&
  //     subUserChats.forEach((e) => {
  //       if (e.status === true) {
  //         Dispatch(putUserChatsExecutor({ ...e, status: false }));
  //       }
  //     });
  // };

  useEffect(() => {
    Dispatch(getInviteToSubChat());
    Dispatch(getUserChatsExecutorTabs());
  }, [Dispatch, subUserChats]);

  const handlePostSubUserChatsTab = () => {
    let cnt = 1;
    Array.isArray(subUserChatsTabs) &&
      subUserChatsTabs.forEach((e) => {
        if (
          e.userAuthId === accessLogin.id &&
          chatById[0]?.id === e.userChatId
        ) {
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
            status: subUserChatsTabs.length === 0 ? true : false,
          };
        }
      });
    Dispatch(postUserChatsExecutorTabs(newObj));
  };

  const isActiveAddTab =
    Array.isArray(subUserChats) &&
    subUserChats.some((e) => e.userAuthId === accessLogin.id);

  const isActiveSubUserChat =
    Array.isArray(subUserChats) &&
    subUserChats.some(
      (e) =>
        (chatById[0]?.id === e.userChatId &&
          accessLogin?.id === e.userAuthId) ||
        (accessLogin?.id === e.userChatId && chatById[0]?.id === e.userChatId)
    );

  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleIntiveToSubChat = (state) => {
    setShowInviteModal(state);
    if (subUserChatsTabs[0]?.status === true) {
      Array.isArray(subUserChats) &&
        subUserChats.map((e) => {
          Dispatch(putUserChatsExecutor({ ...e, status: false }));
        });
    }
  };

  const isActiveUserFromTab =
    Array.isArray(subUserChatsTabs) &&
    subUserChatsTabs.some((subUserTab) => {
      return (
        Array.isArray(subUserChats) &&
        subUserChats.some(
          (subUser) =>
            subUserTab.userAuthId === subUser.userAuthId &&
            subUserTab.status === true
        )
      );
    });

  const handleSetStateSubChatId = async () => {
    if (Array.isArray(subUserChatsTabs)) {
      for (const e of subUserChatsTabs) {
        if (e.status === true) {
          Dispatch(putUserChatsExecutorTabs({ ...e, status: false }));
        }
      }
    }
    if (Array.isArray(subUserChats)) {
      for (const e of subUserChats) {
        Dispatch(putUserChatsExecutor({ ...e, status: true }));
        // После успешного обновления, получаем данные
        Dispatch(getSubChatById(e.id));
      }
    }
  };

  const handleSetStateChatTabs = async (item) => {
    Dispatch(putUserChatsExecutorTabs({ ...item, status: true }));
    Array.isArray(subUserChatsTabs) &&
      subUserChatsTabs.forEach((e) => {
        if (e.status === true) {
          Dispatch(putUserChatsExecutorTabs({ ...e, status: false }));
        }
      });
  };

  //   Array.isArray(subUserChats) &&
  //     subUserChats.forEach((e) => {
  //       if (e.status === true) {
  //         Dispatch(putUserChatsExecutor({ ...e, status: false }));
  //       }
  //     });

  const isActiveTabs =
    Array.isArray(subUserChatsTabs) &&
    subUserChatsTabs.some((e) => e.status === true);

  return (
    <>
      <header className="bg-[#f5f5f5]  p-[30px] flex justify-between items-center flex-wrap">
        <div className="wrapper-tabs flex items-end gap-3">
          {isActiveSubUserChat && (
            <Button
              // onClick={() => {
              //   handlePutSubUserChatStatus();
              // }}
              // variant={e.status ? "contained" : "outlined"}
              onClick={() => handleSetStateSubChatId()}
              variant="contained"
            >
              Исполнители
            </Button>
          )}
          <div className="wrapper-sub-tabs flex gap-5">
            {Array.isArray(subUserChatsTabs) &&
              subUserChatsTabs.map((e) => {
                if (
                  (e.userAuthId === accessLogin.id &&
                    chatById[0]?.id === e.userChatId) ||
                  (e.userChatId === accessLogin.id &&
                    chatById[0]?.id === e.userChatId)
                ) {
                  return (
                    <Button
                      onClick={() => handleSetStateChatTabs(e)}
                      key={e.id}
                      variant="outlined"
                      sx={{
                        fontSize: "13px",
                        color: e.status ? "white" : "green",
                        height: "30px",
                        width: "160px",
                        position: "relative",
                        borderColor: "green",
                        backgroundColor: e.status ? "green" : "transparent",
                        "&:hover": {
                          borderColor: "green",
                          backgroundColor: e.status ? "green" : "transparent",
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
                          color: e.status ? "white" : "000000af",
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
          {isActiveAddTab && (
            <IconButton
              onClick={() => {
                handlePostSubUserChatsTab();
                handleIntiveToSubChat(true);
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "#007bd220",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          )}
        </div>
        <div className="panel-user flex items-end gap-3">
          {/* Показать чат Avatar исполнителей */}
          {Array.isArray(subUserChats) &&
            !isActiveTabs &&
            subUserChats.map((e) => {
              return (
                <IconButton key={e.id} sx={{ padding: "0px" }}>
                  <Avatar src={e.image} />
                </IconButton>
              );
            })}
          {/* Показать Avatar вкладок */}
          {Array.isArray(subUserChats) &&
            isActiveTabs &&
            subUserChats.map((e) => {
              if (e.userAuthId === accessLogin.id) {
                return (
                  <IconButton key={e.id} sx={{ padding: "0px" }}>
                    <Avatar src={e.image} />
                  </IconButton>
                );
              }
            })}

          {/* {Array.isArray(inviteToSubChat) &&
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
            })} */}
        </div>
      </header>
      {showInviteModal && (
        <InviteToSubChat handleModal={handleIntiveToSubChat} />
      )}
    </>
  );
};

export default SubTitleChat;
