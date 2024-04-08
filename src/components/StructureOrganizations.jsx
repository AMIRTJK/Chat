import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button, IconButton } from "@mui/material";
import UserStructure from "./UserStructure";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slices/chat-slice";
import {
  getUsers,
  postUsers,
  getUserStructure,
  multiDeleteUsers,
  postUserChat,
} from "../actions/chatApi";
import { deleteUsers } from "../actions/chatApi";

const StructureOrganizations = () => {
  const Dispatch = useDispatch();

  const { setShowStructure } = actions;
  const showStructure = useSelector((store) => store.chat.showStructure);
  const users = useSelector((store) => store.chat.users);
  const userStructure = useSelector((store) => store.chat.userStructure);
  const userChats = useSelector((store) => store.chat.userChats);

  const handleModal = () => {
    Dispatch(setShowStructure(false));
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handlePostUser = (newObj) => {
    Dispatch(postUsers(newObj));
    Dispatch(postUserChat(newObj));
  };

  useEffect(() => {
    Dispatch(getUsers());
    Dispatch(getUserStructure());
  }, [Dispatch]);

  console.log(userChats);

  return (
    <div
      onClick={handleModal}
      className="wrapper-modal w-full h-full bg-red fixed top-0 left-0"
    >
      <div
        onClick={stopPropagation}
        className="modal bg-[#343434] w-[85%] h-[85%] rounded-lg absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 flex flex-col justify-between overflow-hidden"
      >
        <header className="bg-[#3E3E3E] p-[20px] flex items-center justify-between">
          <h1 className="text-[#fff] text-center text-[20px] mx-auto">
            Структура организации
          </h1>
          <IconButton onClick={handleModal}>
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
        <main className="h-[100%] flex flex-col items-center px-[20px]">
          <UserStructure
            key={users[0]?.id}
            userImage={users[0]?.image}
            userName={users[0]?.name}
            userPosition={users[0]?.role}
          />
          <div className="main-position flex justify-between flex-wrap gap-x-40">
            {users.map((e, index) => {
              if (index > 0)
                return (
                  <UserStructure
                    key={e.id}
                    userImage={e.image}
                    userName={e.name}
                    userPosition={e.role}
                    userStatus={e.status}
                    userId={e.id}
                    handlePostUser={handlePostUser}
                  />
                );
            })}
          </div>
        </main>
        <footer className="bg-[#3E3E3E] flex justify-between h-[15%] items-center p-[20px]">
          <div className="wrapper-users">
            {userStructure.length > 0 &&
              userStructure.map((e) => {
                return (
                  <IconButton
                    onClick={() => Dispatch(deleteUsers(e?.id))}
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
                handleModal();
                for (const user of userStructure) {
                  await Dispatch(multiDeleteUsers(user.id));
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

export default StructureOrganizations;
