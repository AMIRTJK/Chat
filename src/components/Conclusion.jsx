import React, { useState, useEffect } from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getSubTabConclusionListEds,
  putSubTabConclusionListEds,
} from "../actions/chatApi";

import SetNameConclusion from "./SetNameConclusion";
import SubConclusionEdsUsers from "./SubConclusionEdsUsers";
import CommentsConclusion from "./CommentsConclusion";

import { useSelector, useDispatch } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  getSubTabConclusionList,
  putSubTabConclusionList,
  putSubTabConclusionListText,
} from "../actions/chatApi";

const Conclusion = ({ handleModalConclusion }) => {
  const Dispatch = useDispatch();

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

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const subTabConclusionListEds = useSelector(
    (store) => store.chat.subTabConclusionListEds
  );

  const filteredExecutor = users.filter(
    (e) => e.userAuthId === subUserChatTabsById[0]?.userAuthId
  );

  const filteredConclusionListCurrent =
    Array.isArray(subTabConclusionList) &&
    subTabConclusionList.filter(
      (e) =>
        subUserChatTabsById[0]?.id === e.subUserChatTabId &&
        // e.userAuthId === accessLogin.id &&
        e.status === true
    );

  console.log(filteredConclusionListCurrent);

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

  const handlePutSubTabConclusionList = async (item) => {
    for (const e of Array.isArray(subTabConclusionList) &&
      subTabConclusionList) {
      if (e.status === true) {
        await Dispatch(putSubTabConclusionList({ ...e, status: false }));
      }
    }

    // Включаем выбранную вкладку
    await Dispatch(putSubTabConclusionList({ ...item, status: true }));
    setEditConclusion(false);
  };

  // Получаем актуальную вкладку - заключение
  const filteredConclusionList =
    Array.isArray(subTabConclusionList) &&
    subTabConclusionList.filter((e) => e.status === true);

  const [value, setValue] = useState("");

  // const [value, setValue] = useState(filteredConclusionList[0]?.text || "");
  const [editConclusion, setEditConclusion] = useState(true);

  const handlePutSubTabConclusionListText = () => {
    Dispatch(
      putSubTabConclusionListText({ ...filteredConclusionList[0], text: value })
    );
    setEditConclusion(false);
  };

  const [showConclusionEdsUsers, setShowConclusionEdsUsers] = useState(false);

  const handleShowConclusionEdsUsers = (state) => {
    setShowConclusionEdsUsers(state);
  };

  const [showCommentsConclusion, setShowCommentsConclusion] = useState();

  const handleShowCommentsConclusion = (state) => {
    setShowCommentsConclusion(state);
  };

  const handlePutSubTabConclusionListEds = (value) => {
    const currentEds = subTabConclusionListEds.filter(
      (e) =>
        e.userAuthId === accessLogin.id &&
        e.subTabConclusionListId === filteredConclusionListCurrent[0]?.id
    );
    Dispatch(
      putSubTabConclusionListEds({
        ...currentEds[0],
        edsStatus: true,
        comments: value,
      })
    );
    handleShowCommentsConclusion(false);
  };

  const [showInfoBlockOfConclusionEds, setShowInfoBlockOfConclusionEds] =
    useState(false);

  const handlePutShowInfoBlockOfConclusionEds = (clickedItem) => {
    console.log(clickedItem);
    setShowInfoBlockOfConclusionEds(!showInfoBlockOfConclusionEds);
    Dispatch(
      putSubTabConclusionListEds({
        ...clickedItem,
        status: !clickedItem.status,
      })
    );
  };

  useEffect(() => {
    Dispatch(getSubTabConclusionList());
    Dispatch(getSubTabConclusionListEds());
  }, []);

  useEffect(() => {
    if (filteredConclusionList.length > 0) {
      setValue(filteredConclusionList[0]?.text || "");
    }
  }, [filteredConclusionList[0]?.id]);

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
                                        onClick={() =>
                                          handlePutSubTabConclusionList(
                                            conclusion
                                          )
                                        }
                                        key={conclusion.id}
                                        className={`${
                                          conclusion.status
                                            ? "bg-[#d4d4d9]"
                                            : ""
                                        } p-[10px] border-b-[1px] hover:bg-[#d4d4d9] cursor-pointer text-[14px]`}
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
              {!editConclusion && (
                <div
                  className="text-[14px] p-[15px]"
                  dangerouslySetInnerHTML={{
                    __html: filteredConclusionList[0]?.text,
                  }}
                />
              )}
              {editConclusion && (
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  className="react-quill-editor"
                />
              )}
            </main>
            {/* Подпись ======= */}
            <aside className="right aside-left-conclusion h-full min-w-[135px] relative  flex flex-col items-center gap-5 py-[20px]">
              <p className="text-[14px] text-[#939393] font-[500]">Подписи</p>
              <IconButton
                onClick={() => {
                  handleShowConclusionEdsUsers(true);
                }}
              >
                <AddIcon />
              </IconButton>
              {Array.isArray(subTabConclusionListEds) &&
                subTabConclusionListEds.map((e) => {
                  if (
                    filteredConclusionListCurrent[0]?.id ===
                    e.subTabConclusionListId
                  )
                    return (
                      <>
                        <IconButton
                          onClick={() =>
                            handlePutShowInfoBlockOfConclusionEds(e)
                          }
                          className={`${
                            e.edsStatus ? "opacity-100" : "opacity-50"
                          }`}
                          key={e.id}
                          sx={{ padding: "0px" }}
                        >
                          <Avatar
                            src={e.image}
                            className="border-[2px] border-[#007cd2]"
                          />
                        </IconButton>
                        {e.status ? (
                          <div className="bg-[#ffffffbd] py-[20px] px-[10px] w-full">
                            <p className="text-[14px]">{e.name}</p>
                            <p
                              className={`text-[14px] cursor-pointer ${
                                e.edsStatus ? "text-[#007cd2]" : "text-[red]"
                              }`}
                            >
                              {e.edsStatus ? "Подписан" : "Не подписан"}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                })}
            </aside>
          </div>
          <div className="bg-[#fff] flex justify-between text-[red] border-t-[1px] p-[20px]">
            <div className="panel-control flex gap-5 items-center">
              <Button
                onClick={() => setEditConclusion(true)}
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Изменить
              </Button>
              <Button
                onClick={() => handleShowCommentsConclusion(true)}
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Подписать
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "400" }}
              >
                Завершить
              </Button>
            </div>
            <div className="wrapper-buttons flex gap-5">
              <Button
                onClick={() => handleModalConclusion(false)}
                sx={{ textTransform: "none" }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => handlePutSubTabConclusionListText()}
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "400" }}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </div>
      {nameConclusion && (
        <SetNameConclusion handleSetNameConclusion={handleSetNameConclusion} />
      )}
      {showConclusionEdsUsers && (
        <SubConclusionEdsUsers
          handleShowConclusionEdsUsers={handleShowConclusionEdsUsers}
          filteredExecutor={filteredExecutor}
          filteredConclusionListCurrent={filteredConclusionListCurrent}
        />
      )}
      {showCommentsConclusion && (
        <CommentsConclusion
          handleShowCommentsConclusion={handleShowCommentsConclusion}
          handlePutSubTabConclusionListEds={handlePutSubTabConclusionListEds}
        />
      )}
    </>
  );
};

export default Conclusion;
