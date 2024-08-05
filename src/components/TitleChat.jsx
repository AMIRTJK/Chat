import React, { useState, useEffect } from "react";
import { Avatar, IconButton, Button } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getChatById,
  getUserChatsExecutor,
  getSubTabConclusionList,
  getSubTabConclusionListTemp,
  getSubTabConclusionListEdsTemp,
  getSubTabConclusionListLiveChat,
  getSubTabConclusionListTempAttachment,
  deleteAllData,
} from "../actions/chatApi";
import { actions } from "../slices/chat-slice";
import MemoVisaExecutors from "./MemoVisaExecutors";
import SubChat from "./SubChat";
import SubVisa from "./SubVisa";

import RefreshAllData from "./RefreshAllData";

const TitleChat = () => {
  const dispatch = useDispatch();
  const userChats = useSelector((store) => store.chat.userChats);
  const chatById = useSelector((store) => store.chat.chatById);
  const showVisaPopUp = useSelector((store) => store.chat.showVisaPopUp);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const visaUsers = useSelector((store) => store.chat.visaUsers);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));
  const { setShowVisaPopUp } = actions;

  const emblem = "https://i.ibb.co/xCjbnnw/emblem.png";

  const handleShow = (event, state) => {
    event.stopPropagation();
    dispatch(setShowVisaPopUp(!state));
  };

  const handleCloseVisaPopUp = () => {
    dispatch(setShowVisaPopUp(false));
  };

  const isActive =
    Array.isArray(userChats) &&
    userChats.some((e) => e.status === true && subUserChats.length > 0);

  const [state, setState] = useState(false);

  const notify = () => {
    toast.info("Вы не являетесь участником этого чата!", {
      position: "top-right",
    });
  };

  const toggleDrawer = (open) => () => {
    if (subUserChats.length < 1) {
      notify();
    } else {
      setState(open);
    }
  };

  const [showSubVisa, setShowSubVisa] = useState(false);

  const handleShowSubVisa = (state) => {
    setShowSubVisa(state);
  };

  useEffect(() => {
    dispatch(getChatById());
    dispatch(getUserChatsExecutor());
    dispatch(getSubTabConclusionList());
    dispatch(getSubTabConclusionListTemp());
    dispatch(getSubTabConclusionListEdsTemp());
    dispatch(getSubTabConclusionListLiveChat());
    dispatch(getSubTabConclusionListTempAttachment());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("click", handleCloseVisaPopUp);
    return () => {
      window.removeEventListener("click", handleCloseVisaPopUp);
    };
  }, []);

  // Refresh All Data from JSON
  const visaListTemp = useSelector((store) => store.chat.visaListTemp);
  const termDate = useSelector((store) => store.chat.termDate);
  const visaStatusTemp = useSelector((store) => store.chat.visaStatusTemp);
  const userStructure = useSelector((store) => store.chat.userStructure);
  const showUserChat = useSelector((store) => store.chat.showUserChat);
  const messageById = useSelector((store) => store.chat.messageById);
  const userStructureExecutor = useSelector(
    (store) => store.chat.userStructureExecutor
  );
  const visaMessage = useSelector((store) => store.chat.visaMessage);
  const subMessages = useSelector((store) => store.chat.subMessages);
  const subUserChatTabs = useSelector((store) => store.chat.subUserChatTabs);
  const invitedToSubChatTabs = useSelector(
    (store) => store.chat.invitedToSubChatTabs
  );
  const subTabMessages = useSelector((store) => store.chat.subTabMessages);
  const subTabVisaUsers = useSelector((store) => store.chat.subTabVisaUsers);
  const subTabVisaMessages = useSelector(
    (store) => store.chat.subTabVisaMessages
  );
  const subTabConclusionList = useSelector(
    (store) => store.chat.subTabConclusionList
  );
  const subTabConclusionListTemp = useSelector(
    (store) => store.chat.subTabConclusionListTemp
  );
  const subTabConclusionListEdsTemp = useSelector(
    (store) => store.chat.subTabConclusionListEdsTemp
  );
  const liveChatMessages = useSelector((store) => store.chat.liveChatMessages);
  const conclusionAttachment = useSelector(
    (store) => store.chat.conclusionAttachment
  );

  const dataList = [
    userChats,
    visaListTemp,
    termDate,
    visaStatusTemp,
    userStructure,
    showUserChat,
    messageById,
    userStructureExecutor,
    subUserChats,
    visaUsers,
    visaMessage,
    subMessages,
    subUserChatTabs,
    invitedToSubChatTabs,
    subTabMessages,
    subTabVisaUsers,
    subTabVisaMessages,
    subTabConclusionList,
    subTabConclusionListTemp,
    subTabConclusionListEdsTemp,
    liveChatMessages,
    conclusionAttachment,
  ];

  const apiList = [
    import.meta.env.VITE_API_USERS_CHATS,
    import.meta.env.VITE_API_VISA_LIST_TEMP,
    import.meta.env.VITE_API_TERM_DATE,
    import.meta.env.VITE_API_VISA_STATUS_TEMP,
    import.meta.env.VITE_API_USERS_STRUCTURE,
    import.meta.env.VITE_API_SHOW_USER_CHAT,
    import.meta.env.VITE_API_MESSAGES,
    import.meta.env.VITE_API_USERS_STRUCTURE_EXECUTOR,
    import.meta.env.VITE_API_USERS_CHAT_EXECUTOR,
    import.meta.env.VITE_API_VISA_USERS,
    import.meta.env.VITE_API_VISA_MESSAGE,
    import.meta.env.VITE_API_SUB_MESSAGES,
    import.meta.env.VITE_API_SUB_USER_CHAT_TABS,
    import.meta.env.VITE_API_INVITED_TO_SUB_CHAT_TABS,
    import.meta.env.VITE_API_SUB_TAB_MESSAGES,
    import.meta.env.VITE_API_SUB_TAB_VISA_USERS,
    import.meta.env.VITE_API_SUB_TAB_VISA_MESSAGES,
    import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST,
    import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST_TEMP,
    import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST_EDS_TEMP,
    import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST_LIVE_CHAT,
    import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST_TEMP_ATTACHMENT,
  ];

  const [showRefreshModal, setShowRefreshModal] = useState();

  const handleShowRefreshModal = (state) => {
    setShowRefreshModal(state);
  };

  const refreshAllData = async () => {
    for (let i = 0; i < dataList.length; i++) {
      const api = apiList[i];
      const dataArray = dataList[i];

      if (Array.isArray(dataArray)) {
        for (let data of dataArray) {
          await dispatch(deleteAllData({ api, id: data.id }));
        }
      }
    }
    handleShowRefreshModal(false);
  };

  return (
    <>
      <div className="wrapper-title p-[30px] h-[13%] border-b-[1px] flex gap-5 w-full justify-between items-center">
        <div className="wrapper-user flex items-center gap-2">
          <IconButton sx={{ padding: "0px" }}>
            <Avatar src={chatById[0]?.image} />
          </IconButton>
          <div className="text flex flex-col">
            <p className="text-[#007cd2] font-[500]">{chatById[0]?.name}</p>
            <p className="text-[#989898] text-[14px]">{chatById[0]?.role}</p>
          </div>
        </div>
        {isActive && <MemoVisaExecutors />}
        <div className="panel-monitoring flex items-center gap-5">
          <div className="visa-users flex gap-2 items-center">
            {subUserChats.length > 0 &&
              subUserChats.map((e) => {
                if (chatById[0]?.id === e.userChatId) {
                  return (
                    <IconButton key={e.id} sx={{ padding: "0" }}>
                      <Avatar
                        src={e.image}
                        sx={{ width: "35px", height: "35px" }}
                      />
                    </IconButton>
                  );
                }
              })}
          </div>
          <div className="settings flex items-center gap-3">
            {subUserChats.length < 1 && (
              <Button onClick={() => handleShowSubVisa(true)}>
                Создать визу
              </Button>
            )}
            <IconButton onClick={toggleDrawer(true)}>
              <EmailOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => handleShowRefreshModal(true)}>
              <SettingsOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <SubChat />
      </SwipeableDrawer>
      {showSubVisa && <SubVisa handleShowSubVisa={handleShowSubVisa} />}
      {showRefreshModal && (
        <RefreshAllData
          handleShowRefreshModal={handleShowRefreshModal}
          refreshAllData={refreshAllData}
        />
      )}
    </>
  );
};

export default TitleChat;
