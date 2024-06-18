import React, { useState, useEffect } from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SetNameConclusion from "./SetNameConclusion";

import { useSelector, useDispatch } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { getSubTabConclusionList } from "../actions/chatApi";

const Conclusion = ({ handleModalConclusion }) => {
  const Dispatch = useDispatch();

  const [value, setValue] = useState("");

  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );
  const users = useSelector((store) => store.chat.users);

  const invitedToSubChatTabs = useSelector(
    (store) => store.chat.invitedToSubChatTabs
  );

  const subTabConclusionList = useSelector(
    (store) => store.chat.subTabConclusionList
  );

  const filteredExecutor = users.filter(
    (e) => e.userAuthId === subUserChatTabsById[0]?.userAuthId
  );

  console.log(value);

  const [visible, setVisible] = useState({});

  const handleShowConclusion = (id) => {
    setVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [nameConclusion, setNameConclusion] = useState(false);

  const handleSetNameConclusion = (state) => {
    setNameConclusion(state);
  };

  useEffect(() => {
    Dispatch(getSubTabConclusionList());
  }, []);

  return (
    <>
      <div
        onClick={() => handleModalConclusion(false)}
        className="fixed w-full h-full top-0 left-0 z-10 bg-[#00000030]"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="wrapper-conclusion absolute bg-[#fff] h-full flex flex-col translate-x-[-35%] translate-y-[-50%] top-1/2 left-1/2 border-[1px] shadow-lg"
        >
          {/* Заключение создателя вкладки */}
          <div className="conclusion-content flex h-full">
            <aside className="left aside-left-conclusion h-full min-w-[135px] flex flex-col items-center gap-5 py-[20px]">
              <p className="text-[14px] text-[#939393] font-[500]">Документы</p>
              <IconButton
                key={filteredExecutor[0]?.id}
                sx={{ padding: "0px" }}
                onClick={() => handleShowConclusion(filteredExecutor[0]?.id)}
              >
                <Avatar
                  src={filteredExecutor[0]?.image}
                  className="border-[2px] border-[#007cd2]"
                />
              </IconButton>
              {visible[filteredExecutor[0]?.id] && (
                <div className="panel-control-conclusion flex flex-col items-center gap-4">
                  <IconButton onClick={() => handleSetNameConclusion(true)}>
                    <AddIcon />
                  </IconButton>
                  <ul className="conclusion-list">
                    {Array.isArray(subTabConclusionList) &&
                      subTabConclusionList.map((conclusion) => {
                        if (
                          conclusion.subUserChatTabId ===
                            subUserChatTabsById[0]?.id &&
                          conclusion.userAuthId ===
                            subUserChatTabsById[0]?.userAuthId
                        ) {
                          return (
                            <li
                              key={conclusion.id}
                              className="p-[10px] border-b-[1px] hover:bg-[#d4d4d9] cursor-pointer text-[14px]"
                            >
                              {conclusion.title}
                            </li>
                          );
                        }
                      })}
                  </ul>
                </div>
              )}
              {/* Заключение участников вкладки */}
              {Array.isArray(invitedToSubChatTabs) &&
                invitedToSubChatTabs.map((invite) => {
                  if (invite.subUserChatTabId === subUserChatTabsById[0]?.id)
                    return (
                      <>
                        <IconButton
                          onClick={() => handleShowConclusion(invite.id)}
                          key={invite.id}
                          sx={{ padding: "0px" }}
                        >
                          <Avatar
                            src={invite.image}
                            className="border-[2px] border-[#007cd2]"
                          />
                        </IconButton>
                        {visible[invite.id] && (
                          <div className="panel-control-conclusion flex flex-col items-center gap-4">
                            <IconButton
                              onClick={() => handleSetNameConclusion(true)}
                            >
                              <AddIcon />
                            </IconButton>
                            <ul className="conclusion-list">
                              {Array.isArray(subTabConclusionList) &&
                                subTabConclusionList.map((conclusion) => {
                                  if (
                                    invite.id ===
                                    conclusion.invitedToSubChatTabId
                                  ) {
                                    return (
                                      <li
                                        key={conclusion.id}
                                        className="p-[10px] border-b-[1px] hover:bg-[#d4d4d9] cursor-pointer text-[14px]"
                                      >
                                        {conclusion.title}
                                      </li>
                                    );
                                  }
                                })}
                            </ul>
                          </div>
                        )}
                      </>
                    );
                })}
            </aside>
            <main className="min-w-[700px] bg-[#fff]">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                className="react-quill-editor"
              />
            </main>
            {/* Подпись ======= */}
            <aside className="right aside-left-conclusion h-full min-w-[135px]  flex flex-col items-center gap-5 py-[20px]">
              <p className="text-[14px] text-[#939393] font-[500]">Подписи</p>
              {Array.isArray(invitedToSubChatTabs) &&
                invitedToSubChatTabs.map((e) => {
                  if (e.subUserChatTabId === subUserChatTabsById[0]?.id)
                    return (
                      <IconButton key={e.id} sx={{ padding: "0px" }}>
                        <Avatar
                          src={e.image}
                          className="border-[2px] border-[#007cd2]"
                        />
                      </IconButton>
                    );
                })}
            </aside>
          </div>
          <div className="bg-[#fff] w-full flex justify-end gap-5 text-[red] border-t-[1px] p-[20px]">
            <Button
              onClick={() => handleModalConclusion(false)}
              sx={{ textTransform: "none" }}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontWeight: "400" }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
      {nameConclusion && (
        <SetNameConclusion handleSetNameConclusion={handleSetNameConclusion} />
      )}
    </>
  );
};

export default Conclusion;
