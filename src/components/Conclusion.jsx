import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import { Avatar, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SetNameConclusion from "./SetNameConclusion";
import SubConclusionEdsUsers from "./SubConclusionEdsUsers";
import CommentsConclusion from "./CommentsConclusion";

import { useSelector, useDispatch } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  getSubTabConclusionList,
  putSubTabConclusionList,
  getSubTabConclusionListEds,
  putSubTabConclusionListEds,
  getSubTabConclusionListTemp,
  postSubTabConclusionListTemp,
  putSubTabConclusionListTempText,
  putSubTabConclusionListTempStatus,
  getSubTabConclusionListEdsTemp,
  postSubTabConclusionListEdsTemp,
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

  const subTabConclusionListTemp = useSelector(
    (store) => store.chat.subTabConclusionListTemp
  );

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const subTabConclusionListEds = useSelector(
    (store) => store.chat.subTabConclusionListEds
  );

  const subTabConclusionListEdsTemp = useSelector(
    (store) => store.chat.subTabConclusionListEdsTemp
  );

  const filteredExecutor = users.filter(
    (e) => e.userAuthId === subUserChatTabsById[0]?.userAuthId
  );

  const filteredCurrentMember = users.filter(
    (e) => e.userAuthId === accessLogin.id
  );

  const filteredConclusionListCurrent =
    Array.isArray(subTabConclusionList) &&
    subTabConclusionList.filter(
      (e) =>
        subUserChatTabsById[0]?.id === e.subUserChatTabId &&
        // e.userAuthId === accessLogin.id &&
        e.status === true
    );

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

  // Получаем актуальную версионность вкладки - заключение
  const [filteredConclusionListTemp, setFilteredConclusionListTemp] = useState(
    []
  );

  // const filteredConclusionListTemp =
  //   Array.isArray(subTabConclusionListTemp) &&
  //   subTabConclusionListTemp.filter((e) => e.statusTemp === true);

  const [value, setValue] = useState("");

  const [editConclusion, setEditConclusion] = useState(true);

  const handlePutSubTabConclusionListTempText = () => {
    Dispatch(
      putSubTabConclusionListTempText({
        ...filteredConclusionListTemp[0],
        text: value,
      })
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
    setShowInfoBlockOfConclusionEds(!showInfoBlockOfConclusionEds);
    Dispatch(
      putSubTabConclusionListEds({
        ...clickedItem,
        status: !clickedItem.status,
      })
    );
  };

  useEffect(() => {
    // Фильтрация актуальной версии вкладки - заключение
    const filtered =
      Array.isArray(subTabConclusionListTemp) &&
      subTabConclusionListTemp.filter((e) => e.statusTemp === true);
    setFilteredConclusionListTemp(filtered);
  }, [subTabConclusionListTemp]);

  const handlePostSubTabConclusionListTemp = () => {
    if (!filteredConclusionList[0]) {
      console.error("No filtered conclusion list found");
      return;
    }

    const conclusionListTemp = {
      ...filteredConclusionList[0],
      subTabConclusionListId: filteredConclusionList[0].id,
      title: `${filteredConclusionList[0].title} - V`,
      image: filteredCurrentMember[0]?.image,
      statusTemp: subTabConclusionListTemp.length === 0 ? true : false,
      text: "",
      id: Date.now().toString(),
    };

    Dispatch(postSubTabConclusionListTemp(conclusionListTemp));

    const updatedFilteredConclusionListTemp = [
      ...filteredConclusionListTemp,
      conclusionListTemp,
    ];
    setFilteredConclusionListTemp(updatedFilteredConclusionListTemp);

    subTabConclusionListEds.forEach((e) => {
      const conclusionListEdsTemp = {
        ...e,
        id: uuidv4(),
        subTabConclusionListTempId: conclusionListTemp.id,
        subTabConclusionListEdsId: e.id,
      };
      Dispatch(postSubTabConclusionListEdsTemp(conclusionListEdsTemp));
    });
  };

  const handlePutSubTabConclusionListTempStatus = async (item) => {
    // Отключаем все вкладкии
    for (const e of Array.isArray(subTabConclusionListTemp) &&
      subTabConclusionListTemp) {
      if (e.statusTemp === true) {
        await Dispatch(
          putSubTabConclusionListTempStatus({ ...e, statusTemp: false })
        );
      }
    }

    // Включаем выбранную вкладку
    await Dispatch(
      putSubTabConclusionListTempStatus({ ...item, statusTemp: true })
    );
  };

  useEffect(() => {
    Dispatch(getSubTabConclusionList());
    Dispatch(getSubTabConclusionListEds());
    Dispatch(getSubTabConclusionListTemp());
    Dispatch(getSubTabConclusionListEdsTemp());
  }, []);

  // Сейчас после добавление версионности вкладок, этот алгоритм может испортить весь код
  useEffect(() => {
    if (filteredConclusionListTemp.length > 0) {
      setValue(filteredConclusionListTemp[0]?.text || "");
    }
  }, [filteredConclusionListTemp[0]?.id]);

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
                <>
                  <div className="wrapper-conclusions-temp flex border-b-[1px] flex-wrap">
                    {Array.isArray(subTabConclusionListTemp) &&
                      subTabConclusionListTemp.map((e) => {
                        if (
                          e.subTabConclusionListId ===
                          filteredConclusionList[0]?.id
                        ) {
                          return (
                            <Button
                              onClick={() =>
                                handlePutSubTabConclusionListTempStatus(e)
                              }
                              key={e.id}
                              variant={e.statusTemp ? "contained" : "variant"}
                              sx={{
                                height: "30px",
                                display: "flex",
                                gap: "10px",
                                borderLeft: "0",
                                borderTop: "0",
                                borderRadius: "0",
                                borderBottom: "0",
                                textTransform: "none",
                                "&:hover": {
                                  borderLeft: "0",
                                  borderTop: "0",
                                  borderBottom: "0",
                                },
                              }}
                            >
                              <Avatar
                                src={e.image}
                                sx={{ height: "20px", width: "20px" }}
                              />
                              <p>{e.title}</p>
                            </Button>
                          );
                        }
                      })}
                  </div>
                  <div
                    className="text-[14px] p-[15px]"
                    dangerouslySetInnerHTML={{
                      __html: filteredConclusionListTemp[0]?.text,
                    }}
                  />
                </>
              )}
              {editConclusion && (
                <>
                  <div className="wrapper-conclusions-temp flex w-full overflow-x-auto">
                    {Array.isArray(subTabConclusionListTemp) &&
                      subTabConclusionListTemp.map((e) => {
                        if (
                          e.subTabConclusionListId ===
                          filteredConclusionList[0]?.id
                        ) {
                          return (
                            <Button
                              onClick={() =>
                                handlePutSubTabConclusionListTempStatus(e)
                              }
                              variant="outlined"
                              sx={{
                                height: "30px",
                                display: "flex",
                                gap: "10px",
                                borderLeft: "0",
                                borderTop: "0",
                                borderRadius: "0",
                                borderBottom: "0",
                                textTransform: "none",
                                "&:hover": {
                                  borderLeft: "0",
                                  borderTop: "0",
                                  borderBottom: "0",
                                },
                              }}
                            >
                              <Avatar
                                src={e.image}
                                sx={{ height: "20px", width: "20px" }}
                              />
                              <p>{e.title}</p>
                            </Button>
                          );
                        }
                      })}
                  </div>
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    className="react-quill-editor"
                  />
                </>
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
              {Array.isArray(subTabConclusionListEdsTemp) &&
                subTabConclusionListEdsTemp.map((e) => {
                  if (
                    filteredConclusionListTemp[0]?.id ===
                    e.subTabConclusionListTempId
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
                onClick={() => handlePostSubTabConclusionListTemp()}
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
                variant="outlined"
                onClick={() => setEditConclusion(true)}
              >
                Edit
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
                onClick={() => handlePutSubTabConclusionListTempText()}
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
          filteredConclusionListTemp={filteredConclusionListTemp}
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
