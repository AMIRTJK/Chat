import React, { useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { getChatById, getUserChatsExecutor } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../slices/chat-slice";

const TitleChat = () => {
  const Dispatch = useDispatch();
  const chatById = useSelector((store) => store.chat.chatById);
  const showVisaPopUp = useSelector((store) => store.chat.showVisaPopUp);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const visaUsers = useSelector((store) => store.chat.visaUsers);

  const { setShowVisaPopUp } = actions;

  const handleShow = (event, state) => {
    event.stopPropagation();
    Dispatch(setShowVisaPopUp(!state));
  };

  const handleCloseVisaPopUp = () => {
    Dispatch(setShowVisaPopUp(false));
  };

  useEffect(() => {
    Dispatch(getChatById());
    Dispatch(getUserChatsExecutor());
  }, [Dispatch]);

  useEffect(() => {
    window.addEventListener("click", handleCloseVisaPopUp);

    return () => {
      window.removeEventListener("click", handleCloseVisaPopUp);
    };
  }, []);

  return (
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
      {/* <div className="user-id-visa flex items-center gap-5"> */}

      {visaUsers.map((e) => {
        if (e.id === chatById[0]?.id && visaUsers.length > 0) {
          return (
            <div
              key={e.id}
              className="title text-center flex flex-col justify-center items-center w-[15%]"
            >
              <img src="src/assets/emblem.png" alt="" className="w-[20%]" />
              <p className="text-[14px]">Муовини вазири Чумхурии Точикистон</p>
              <p
                onClick={(event) => handleShow(event, showVisaPopUp)}
                className="text-[14px] text-[#007cd2] font-medium cursor-pointer"
              >
                Посмотреть визу
              </p>
            </div>
          );
        }
      })}

      {/* <div className="performers flex flex-wrap w-[15%] ">
          <p className="text-[15px]">Юсуф Хайрулло &nbsp;</p>
          <p className="text-[15px]">Юсуф Хайрулло &nbsp;</p>
        </div>

        <div className="visa-errand-text flex flex-wrap w-[24%]">
          <p className="text-[15px]">Барои тафтиш ва мувофика &nbsp;</p>
          <p className="text-[15px]">Барои тафтиш ва мувофика &nbsp;</p>
          <p className="text-[15px]">Барои тафтиш ва мувофика &nbsp;</p>
        </div>
        <div className="visa-status flex flex-col w-[16%] border-r-[1px]">
          <p className="text-[15px]">
            <span className="font-bold">До:</span> 2024-05-18
          </p>
          <p className="text-[15px]">
            <span className="font-bold">Статус:</span> Фаври
          </p>
          <p className="text-[15px]">
            <span className="font-bold">Дата:</span> 20.05.2024c.
          </p>
          <p className="text-[15px]">Ю.Хайрулло</p>
        </div> */}
      {/* </div> */}
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
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <AccessTimeOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TitleChat;
