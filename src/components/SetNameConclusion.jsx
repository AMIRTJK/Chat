import React, { useState } from "react";
import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { postSubTabConclusionList } from "../actions/chatApi";

const SetNameConclusion = ({ handleSetNameConclusion }) => {
  const Dispatch = useDispatch();
  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );
  const invitedToSubChatTabs = useSelector(
    (store) => store.chat.invitedToSubChatTabs
  );
  const subTabConclusionList = useSelector(
    (store) => store.chat.subTabConclusionList
  );

  const [value, setValue] = useState("");

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const filterInvitedTabId =
    Array.isArray(invitedToSubChatTabs) &&
    invitedToSubChatTabs.filter(
      (e) =>
        e.userAuthId === accessLogin.id &&
        subUserChatTabsById[0]?.id === e.subUserChatTabId
    );

  const handlePostSubTabConclusionList = () => {
    const newObj = {
      id: Date.now().toString(),
      title: value,
      invitedToSubChatTabId:
        filterInvitedTabId.length > 0 ? filterInvitedTabId[0]?.id : null,
      subUserChatTabId: subUserChatTabsById[0]?.id,
      status: subTabConclusionList.length > 0 ? false : true,
      login: accessLogin.login,
      userAuthId: accessLogin.id,
      userChatId: subUserChatTabsById[0]?.userChatId,
    };
    Dispatch(postSubTabConclusionList(newObj));
    handleSetNameConclusion(false);
  };

  return (
    <div
      onClick={() => handleSetNameConclusion(false)}
      className="fixed w-full h-full top-0 left-0 z-10"
    >
      <form
        onClick={(event) => event.stopPropagation()}
        className="absolute bg-[#fff] flex flex-col gap-5 w-[30%] shadow-lg border-[1px] translate-x-[-25%] translate-y-[-50%] top-1/2 left-1/2 p-[20px]"
      >
        <p className="font-[600]">Новое заключение</p>
        <input
          onChange={() => setValue(event.target.value)}
          value={value}
          type="text"
          placeholder="Введите название заключение"
          className="border-b-[1px] border-[#000] outline-none"
        />
        <div className="wrapper-buttons flex justify-end">
          <div className="buttons flex gap-5">
            <Button
              onClick={() => handleSetNameConclusion(false)}
              variant="text"
              sx={{ textTransform: "none" }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => handlePostSubTabConclusionList()}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Создать
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetNameConclusion;
