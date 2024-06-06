import React, { useEffect } from "react";
import { Button, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  postInvitedToSubChatTabs,
  getSubUserChatTabsById,
} from "../actions/chatApi";
import DeleteIcon from "@mui/icons-material/Delete";

const InviteToSubChat = ({ handleModal }) => {
  const Dispatch = useDispatch();

  const users = useSelector((store) => store.chat.users);
  const subChatById = useSelector((store) => store.chat.subChatById);
  const chatById = useSelector((store) => store.chat.chatById);

  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );
  const subUserChatTabs = useSelector((store) => store.chat.subUserChatTabs);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const handlePostInvitedToSubChatTabs = (item) => {
    const newObj = {
      id: Date.now().toString(),
      subUserChatTabId: subUserChatTabsById[0]?.id,
      name: item.name,
      role: item.role,
      image: item.image,
      status: true,
      login: item.login,
      userAuthId: item.userAuthId,
      userChatId: chatById[0]?.id,
    };

    if (
      subUserChatTabsById[0]?.userAuthId === accessLogin.id &&
      chatById[0]?.id === subUserChatTabsById[0]?.userChatId
    ) {
      Dispatch(postInvitedToSubChatTabs(newObj));
    }
  };

  useEffect(() => {
    Dispatch(getUsers());
  }, [Dispatch]);

  return (
    <div
      onClick={() => handleModal(false)}
      className="modal bg-[#00000030] w-full h-[100vh] fixed z-10"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="modal flex flex-col shadow-lg items-center w-[30%] rounded-lg bg-[#fff] absolute translate-x-[-90%] translate-y-[-50%] top-1/2 left-1/2"
      >
        <header className="border-b-[1px] p-[20px] w-full text-center">
          <h1 className="font-bold">Пригласить участника</h1>
        </header>
        <main className="category-scrollbar w-full overflow-auto h-[30vh]">
          <input
            type="text"
            placeholder="Поиск"
            className="w-full outline-none p-[10px] border-b-[1px] focus:border-[#007bd24b]"
          />
          <ul>
            {users.map((e) => {
              return (
                <li
                  onClick={() => handlePostInvitedToSubChatTabs(e)}
                  key={e.id}
                  className="flex justify-between items-center p-[10px] border-b-[1px] hover:bg-[#00000010] cursor-pointer transition-all duration-100"
                >
                  <div className="user flex items-center gap-5">
                    <Avatar src={e.image} />
                    <div className="role-title flex flex-col ">
                      <p className="font-semibold">{e.name}</p>
                      <p className="font-medium text-[#00000095]">{e.role}</p>
                    </div>
                  </div>
                  <IconButton>
                    <DeleteIcon
                      sx={{
                        transition: "all .2s",
                        "&:hover": {
                          color: "red",
                        },
                      }}
                    />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        </main>
        <footer className="py-[15px]">
          <Button onClick={() => handleModal(false)} variant="contained">
            Пригласить
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default InviteToSubChat;
