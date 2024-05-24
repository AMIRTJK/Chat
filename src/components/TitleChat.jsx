import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { getChatById, getUserChatsExecutor } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../slices/chat-slice";
import SubChat from "./SubChat";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const TitleChat = () => {
  const dispatch = useDispatch();
  const chatById = useSelector((store) => store.chat.chatById);
  const showVisaPopUp = useSelector((store) => store.chat.showVisaPopUp);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const visaUsers = useSelector((store) => store.chat.visaUsers);

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

  const toggleDrawer = (open) => () => {
    setState(open);
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
        {isActive && (
          <div className="title text-center flex flex-col justify-center items-center w-[15%]">
            <img src="src/assets/emblem.png" alt="" className="w-[20%]" />
            <p className="text-[14px]">Муовини вазири Чумхурии Точикистон</p>
            <p
              onClick={(event) => handleShow(event, showVisaPopUp)}
              className="text-[14px] text-[#007cd2] font-medium cursor-pointer"
            >
              Посмотреть визу
            </p>
          </div>
        )}

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
