import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { getChatById, getUserChatsExecutor } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../slices/chat-slice";
import SubChat from "./SubChat";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MemoVisaExecutors from "./MemoVisaExecutors";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TitleChat = () => {
  const dispatch = useDispatch();
  const chatById = useSelector((store) => store.chat.chatById);
  const showVisaPopUp = useSelector((store) => store.chat.showVisaPopUp);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const visaUsers = useSelector((store) => store.chat.visaUsers);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const { setShowVisaPopUp } = actions;

  const handleShow = (event, state) => {
    event.stopPropagation();
    dispatch(setShowVisaPopUp(!state));
  };

  const handleCloseVisaPopUp = () => {
    dispatch(setShowVisaPopUp(false));
  };

  useEffect(() => {
    dispatch(getChatById());
    dispatch(getUserChatsExecutor());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("click", handleCloseVisaPopUp);

    return () => {
      window.removeEventListener("click", handleCloseVisaPopUp);
    };
  }, []);

  const isActive = visaUsers.some(
    (e) => e.id === chatById[0]?.id && visaUsers.length > 0
  );

  const [state, setState] = useState(false);

  // const notify = () => {
  //   toast.info("Вы не являетесь участником этого чата!", {
  //     position: "top-right",
  //   });
  // };

  const toggleDrawer = (open) => () => {
    // Алгоритм для того чтобы тот кто создал подчат и пользователи подчата моги открыть этот чат
    // const isActiveToCreatorsSubChat = subUserChats.some(
    //   (e) =>
    //     (e.userAuthId === accessLogin.id && e.userChatId === chatById[0]?.id) ||
    //     (e.userChatId === accessLogin.id && e.userChatId === chatById[0]?.id)
    // );

    setState(open);
    // if (isActiveToCreatorsSubChat) {
    // } else {
    //   notify();
    // }
  };

  const emblem = "https://i.ibb.co/xCjbnnw/emblem.png";

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
          <div className="settings flex items-center">
            {/* <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton> */}
            <IconButton onClick={toggleDrawer(true)}>
              <EmailOutlinedIcon />
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
    </>
  );
};

export default TitleChat;
