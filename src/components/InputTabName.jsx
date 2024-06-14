import React, { useEffect, useState } from "react";
import { Button, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { actions } from "../slices/chat-slice";

import {
  getUsers,
  postInvitedToSubChatTabs,
  getDefaultVisa,
  getOwnVisa,
  postTabVisaUsers,
  getSubTabVisaMessages,
  postSubUserChatTabs,
  postSubTabVisaMessages,
  putTabVisaUsersTerm,
} from "../actions/chatApi";

import DeleteIcon from "@mui/icons-material/Delete";

const InputTabName = ({ handleShowTabName }) => {
  const Dispatch = useDispatch();

  const tabNameValue = useSelector((store) => store.chat.tabNameValue);

  const { setTabNameValue } = actions;

  const users = useSelector((store) => store.chat.users);
  const chatById = useSelector((store) => store.chat.chatById);

  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const subUserChatTabs = useSelector((store) => store.chat.subUserChatTabs);
  const subTabVisaMessages = useSelector(
    (store) => store.chat.subTabVisaMessages
  );
  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const defaultVisa = useSelector((store) => store.chat.defaultVisa);
  const ownVisa = useSelector((store) => store.chat.ownVisa);
  const ownVisaValue = useSelector((store) => store.chat.ownVisaValue);
  const subTabVisaUsers = useSelector((store) => store.chat.subTabVisaUsers);

  const { setOwnVisaValue } = actions;

  const [stateVisa, setStateVisa] = useState(false);
  const [ownVisaInput, setOwnVisaInput] = useState(false);
  const [dateTerm, setDateTerm] = useState("");

  // Добавляем вкладку
  const handlePostSubUserChatTabs = () => {
    let newObj = {};

  

    subUserChats.forEach((e) => {
      console.log(accessLogin.id, e.userAuthId, accessLogin.id === e.userAuthId && chatById[0].id === e.userChatId);
      if (
        (accessLogin.id === e.userAuthId && chatById[0].id === e.userChatId) ||
        (accessLogin.id === e.userChatId && chatById[0].id === e.userChatId)
      ) {
        newObj = {
          id: Date.now().toString(),
          subUserChatId: e.id,
          userAuthId: e.userAuthId,
          userChatId: e.userChatId,
          name: tabNameValue,
          status: subUserChatTabs.length === 0 ? true : false,
        };
        console.log(newObj);
      }
    });

    console.log(newObj);

    Dispatch(postSubUserChatTabs(newObj));
  };

  // Нужно написать post запрос для getSubTabVisaMessages
  const handlePostSubTabVisa = (item) => {
    const newInvitedToSubChatTabs = {
      id: Date.now().toString(),
      subUserChatTabId: subUserChatTabs[subUserChatTabs.length - 1]?.id,
      name: item.name,
      role: item.role,
      image: item.image,
      status: true,
      login: item.login,
      userAuthId: item.userAuthId,
      userChatId: chatById[0]?.id,
    };

    if (
      subUserChatTabs[subUserChatTabs.length - 1]?.userAuthId ===
        accessLogin.id &&
      chatById[0]?.id ===
        subUserChatTabs[subUserChatTabs.length - 1]?.userChatId
    ) {
      Dispatch(postInvitedToSubChatTabs(newInvitedToSubChatTabs));
    }

    // Получаем текущую дату
    const now = new Date();

    // Форматируем дату
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const year = now.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    const newSubTabMessage = {
      id: Date.now().toString(),
      subUserChatTabId: subUserChatTabs[subUserChatTabs.length - 1]?.id,
      userAuthId: accessLogin.id,
      userChatId: chatById[0]?.id,
      login: accessLogin.name,
      term: "",
      status: "",
      eds: "",
      createdAt: formattedDate,
    };

    Dispatch(postTabVisaUsers(newSubTabMessage));
  };

  const handleSubTabVisaMessage = (item) => {
    const { visaUserId, ...rest } = item;
    const newSubTabVisaMessage = {
      ...rest,
      subVisaUserId: subUserChatTabs[subUserChatTabs.length - 1]?.id,
    };
    Dispatch(postSubTabVisaMessages(newSubTabVisaMessage));
  };


  // Добавить собственную визу

  const handleShowOwnVisa = () => {
    if (ownVisaValue.length > 0) {
      const newObj = {
        id: Date.now().toString(),
        name: ownVisaValue,
        status: true,
        subVisaUserId: subTabVisaUsers[subTabVisaUsers.length - 1]?.id,
      };
      Dispatch(postSubTabVisaMessages(newObj));
      Dispatch(setOwnVisaValue(""));
    }
  };

  const handleCloseSubTabVisaUser = () => {
    handleShowTabName(false);
    Dispatch(setTabNameValue(""));
  };

  const handlePutTerm = (event) => {
    setDateTerm(event.target.value);
  };

  const handlePutSubTabVisaTerm = () => {
    const newObj = {
      ...subTabVisaUsers[subTabVisaUsers.length - 1],
      term: dateTerm,
    };
    Dispatch(putTabVisaUsersTerm(newObj));
  };

  useEffect(() => {
    Dispatch(getUsers());
    Dispatch(getDefaultVisa());
    Dispatch(getOwnVisa());
    Dispatch(getSubTabVisaMessages());
  }, [Dispatch]);

  useEffect(() => {
    handlePutSubTabVisaTerm();
  }, [Dispatch, dateTerm]);

  return (
    <div
      onClick={() => handleShowTabName(false)}
      className="bg-[#00000042] fixed top-0 left-0 w-full h-full z-10"
    >
      <main
        onClick={(event) => event.stopPropagation()}
        className="bg-[#fff] absolute flex flex-col gap-5 items-start justify-between top-1/2 left-1/2 translate-x-[-20%] translate-y-[-50%] shadow-lg w-[30%] p-[20px]"
      >
        <h1 className="text-center mx-auto font-semibold">Создание бесседы</h1>
        <div className="add-tab flex flex-col items-start w-full">
          <p className="font-semibold text-[15px]">Новая вкладка</p>
          <fieldset className="flex border-b-[1px] w-full">
            <input
              onChange={(event) =>
                Dispatch(setTabNameValue(event.target.value))
              }
              value={tabNameValue}
              type="text"
              placeholder="Введите название вкладки"
              className=" outline-none w-full py-[5px] text-[15px]"
            />
            <Button onClick={() => handlePostSubUserChatTabs()}>Создать</Button>
          </fieldset>
        </div>
        <div className="add-executors flex flex-col items-start w-full">
          <p className="font-semibold text-[15px]">Пригласить участника</p>
          <input
            type="text"
            placeholder="Поиск"
            className="border-b-[1px] outline-none w-full py-[5px] text-[15px]"
          />
          <main className="category-scrollbar w-full overflow-auto h-[20vh]">
            <ul>
              {users.map((e) => {
                return (
                  <li
                    onClick={() => handlePostSubTabVisa(e)}
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
        </div>
        <div className="add-visa w-full">
          <p className="font-semibold text-[15px]">Выбрать визу</p>
          <div className="visa-category bg-[#fff] mt-[15px] w-full">
            <button
              onClick={() => setStateVisa(false)}
              className={`${
                stateVisa === false ? "bg-[#007bd248]" : ""
              } border-r-[1px] border-[#00000058] w-[50%] p-[10px] bg-[#007bd22a] hover:bg-[#007bd248] transition-all duration-100`}
            >
              Шаблонные
            </button>
            <button
              onClick={() => setStateVisa(true)}
              className={`${
                stateVisa === true ? "bg-[#007bd248]" : ""
              } border-r-[1px] border-[#00000058] w-[50%] p-[10px] bg-[#007bd22a] hover:bg-[#007bd248] transition-all duration-100`}
            >
              Личные
            </button>
          </div>
          <main className="overflow-auto h-[20vh] category-scrollbar">
            {stateVisa === false
              ? Array.isArray(defaultVisa) &&
                defaultVisa.map((e) => {
                  return (
                    <p
                      onClick={() => handleSubTabVisaMessage(e)}
                      key={e.id}
                      className="p-[10px] border-b-[1px] cursor-pointer hover:bg-[#f9f9f9]"
                    >
                      {e.name}
                    </p>
                    // <VisaListExecutors key={e.id} name={e.name} item={e} />
                  );
                })
              : Array.isArray(ownVisa) &&
                ownVisa.map((e) => {
                  return (
                    <p
                      key={e.id}
                      className="p-[10px] border-b-[1px] cursor-pointer hover:bg-[#f9f9f9]"
                    >
                      {e.name}
                    </p>
                    // <VisaListExecutors key={e.id} item={e} />;
                  );
                })}
          </main>
          <footer className="flex justify-end gap-5 items-center">
            <fieldset className="flex border-[2px] border-[#007bd22a] p-[10px]  w-full">
              <input
                onChange={(event) =>
                  Dispatch(setOwnVisaValue(event.target.value))
                }
                value={ownVisaValue}
                type="text"
                placeholder="Введите собственную визу"
                className=" text-[#000] outline-none  w-full  placeholder:text-[#000b] placeholder:font-normal"
              />
              <Button onClick={() => handleShowOwnVisa()}>Добавить</Button>
            </fieldset>
          </footer>
        </div>
        <div className="add-term w-full">
          <input
            onChange={(event) => handlePutTerm(event)}
            value={dateTerm}
            type="date"
            className="border-[#007bd22a] w-full border-[2px] p-[10px] text-[#007cd2] font-medium cursor-pointer "
          />
        </div>
        <div className="panel-control flex justify-end w-full">
          <div className="wrapper-buttons flex gap-5">
            <Button
              onClick={() => handleShowTabName(false)}
              variant="text"
              sx={{ textTransform: "none", fontWeight: "400" }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => handleCloseSubTabVisaUser()}
              variant="contained"
              sx={{ textTransform: "none", fontWeight: "400" }}
            >
              Создать
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InputTabName;
