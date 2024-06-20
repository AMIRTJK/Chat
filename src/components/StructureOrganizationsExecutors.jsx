import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button, IconButton } from "@mui/material";
import UserStructureExecutor from "./UserStructureExecutor";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slices/chat-slice";
import { formattedDate } from "../utils/currentDate.js";
import {
  getUsers,
  postUsersStructureExecutor,
  getUserStructure,
  multiDeleteUsersExecutor,
  postUserChatsExecutor,
  getUserStructureExecutor,
  deleteUsersExecutor,
  // postVisaUsers,
  getVisaUsers,
} from "../actions/chatApi";

const StructureOrganizationsExecutors = ({ handleShowStructure }) => {
  const Dispatch = useDispatch();

  const users = useSelector((store) => store.chat.users);
  const userChats = useSelector((store) => store.chat.userChats);
  const chatById = useSelector((store) => store.chat.chatById);
  const visaUsers = useSelector((store) => store.chat.visaUsers);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const userStructureExecutor = useSelector(
    (store) => store.chat.userStructureExecutor
  );

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    Dispatch(getUsers());
    Dispatch(getUserStructureExecutor());
    Dispatch(getVisaUsers());
  }, [Dispatch]);

  console.log(visaUsers);

  const handlePostUser = (newObj) => {
    Dispatch(postUsersStructureExecutor(newObj));

    // Алгоритм для добавление только уникальных id в массив subUserChats
    if (
      !subUserChats.some(
        (e) =>
          e.userChatId === chatById[0].id && e.userAuthId === newObj.userAuthId
      )
    ) {
      Dispatch(
        postUserChatsExecutor({
          ...newObj,
          userChatId: chatById[0].id,
        })
      );
    }

    // Алгоритм для добавление только уникальных id в массив visaUsers

    // Dispatch(
    //   postVisaUsers({
    //     id: chatById[0].id,
    //     userAuthId: accessLogin.id,
    //     login: accessLogin.login,
    //     term: "",
    //     status: "",
    //     eds: "",
    //     createdAt: formattedDate,
    //   })
    // );
  };

  return (
    <div
      onClick={() => handleShowStructure(false)}
      className="wrapper-modal w-full h-full bg-red fixed top-0 left-0 z-10"
    >
      <div
        onClick={stopPropagation}
        className="modal bg-[#343434] w-[85%] h-[85%] rounded-lg absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 flex flex-col justify-between overflow-hidden"
      >
        <header className="bg-[#3E3E3E] p-[20px] flex items-center justify-between">
          <h1 className="text-[#fff] text-center text-[20px] mx-auto">
            Структура организации
          </h1>
          <IconButton onClick={() => handleShowStructure(false)}>
            <CloseIcon
              className="icon-effects"
              sx={{
                fontSize: "30px",
                color: "#fff",
                fontWeight: "500",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </header>
        <main className="category-scrollbar h-[100%] flex flex-col items-center px-[20px] overflow-auto pb-[60px]">
          <UserStructureExecutor
            key={users[0]?.id}
            userImage={users[0]?.image}
            userName={users[0]?.name}
            userPosition={users[0]?.role}
          />
          <div className="main-position flex justify-between flex-wrap gap-x-40">
            {users.map((e, index) => {
              if (index > 0)
                return (
                  <UserStructureExecutor
                    key={e.id}
                    item={e}
                    userImage={e.image}
                    userName={e.name}
                    userPosition={e.role}
                    userStatus={e.status}
                    userId={e.id}
                    userLogin={e.login}
                    userAuthId={e.userAuthId}
                    handlePostUser={handlePostUser}
                  />
                );
            })}
          </div>
        </main>
        <footer className="bg-[#3E3E3E] flex justify-between h-[15%] items-center p-[20px]">
          <div className="wrapper-users">
            {userStructureExecutor.length > 0 &&
              userStructureExecutor.map((e) => {
                return (
                  <IconButton
                    onClick={() => Dispatch(deleteUsersExecutor(e?.id))}
                    key={e?.id}
                    sx={{ position: "relative" }}
                  >
                    <CloseIcon
                      className="hover:text-[#a74343]"
                      sx={{
                        position: "absolute",
                        fontSize: "14px",
                        color: "red",
                        top: "0px",
                        right: "0px",
                        zIndex: "10",
                      }}
                    />
                    <Avatar src={e?.image} />
                  </IconButton>
                );
              })}
          </div>
          <div className="panel-control">
            <Button
              onClick={async () => {
                handleShowStructure(false);
                for (const user of userStructureExecutor) {
                  await Dispatch(multiDeleteUsersExecutor(user.id));
                }
              }}
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: "normal",
                fontSize: "15px",
              }}
            >
              Добавить
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default StructureOrganizationsExecutors;
