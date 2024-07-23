import React, { useState, useEffect, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

import { Avatar, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import EmailIcon from "@mui/icons-material/Email";

import SetNameConclusion from "./SetNameConclusion";
import SubConclusionEdsUsers from "./SubConclusionEdsUsers";
import CommentsConclusion from "./CommentsConclusion";
import NewConclusionCopy from "./NewConclusionCopy";

import NotesIcon from "@mui/icons-material/Notes";

import LiveChat from "./LiveChat";

import VideocamIcon from "@mui/icons-material/Videocam";

import { useSelector, useDispatch } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import DocumentPdf from "./DocumentPdf";

import { actions } from "../slices/chat-slice";

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
  putSubTabConclusionListEdsTempStatus,
  getSubTabConclusionListLiveChat,
  getSubTabConclusionListTempAttachment,
  postSubTabConclusionListTempAttachment,
  putSubTabConclusionListTempAttachment,
  putSubTabConclusionListTempStatusEnd,
} from "../actions/chatApi";

const Conclusion = ({ handleModalConclusion }) => {
  const Dispatch = useDispatch();

  const { showEndConclusion } = actions;

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

  // Получаем актуальную версионность вкладки - заключение
  const [filteredConclusionListTemp, setFilteredConclusionListTemp] = useState(
    []
  );

  // Получаем актуальную вкладку - заключение
  const filteredConclusionList =
    Array.isArray(subTabConclusionList) &&
    subTabConclusionList.filter((e) => e.status === true);

  const handlePutSubTabConclusionList = async (item) => {
    for (const e of Array.isArray(subTabConclusionList) &&
      subTabConclusionList) {
      if (e.status === true) {
        await Dispatch(putSubTabConclusionList({ ...e, status: false }));
      }
    }

    // Включаем выбранную вкладку
    await Dispatch(putSubTabConclusionList({ ...item, status: true }));

    // Делаем тоже самое но для массива subTabConclusionListTemp
    for (const e of Array.isArray(subTabConclusionListTemp) &&
      subTabConclusionListTemp) {
      if (e.status === true) {
        await Dispatch(
          putSubTabConclusionListTempStatus({ ...e, status: false })
        );
      }
    }

    const itemTemp = subTabConclusionListTemp.filter((e1) => {
      return subTabConclusionList.some((e2) => {
        return e1.subTabConclusionListId !== e2.id && e2.status === true;
      });
    });

    // Включаем выбранную вкладку для subTabConclusionListTemp
    await Dispatch(
      putSubTabConclusionListTempStatus({ ...itemTemp[0], status: true })
    );

    setEditConclusion(false);
  };

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
    buttonEndIsDisabled && handleModalConclusion(false);
  };

  const [showConclusionEdsUsers, setShowConclusionEdsUsers] = useState(false);

  const handleShowConclusionEdsUsers = (state) => {
    setShowConclusionEdsUsers(state);
  };

  const [showCommentsConclusion, setShowCommentsConclusion] = useState();

  const handleShowCommentsConclusion = (state) => {
    setShowCommentsConclusion(state);
  };

  // Раньше вместо e.subTabConclusionListId было subTabConclusionListTempId
  const handlePutSubTabConclusionListEds = (value) => {
    const currentEds = subTabConclusionListEdsTemp.filter(
      (e) =>
        e.userAuthId === accessLogin.id &&
        e.subTabConclusionListTempId === filteredConclusionListTemp[0]?.id
    );

    Dispatch(
      putSubTabConclusionListEdsTempStatus({
        ...currentEds[0],
        edsStatus: true,
        comments: value,
      })
    );
    handleShowCommentsConclusion(false);
    setEditConclusion(false);
  };

  const [showInfoBlockOfConclusionEds, setShowInfoBlockOfConclusionEds] =
    useState(false);

  const handlePutShowInfoBlockOfConclusionEds = (clickedItem) => {
    setShowInfoBlockOfConclusionEds(!showInfoBlockOfConclusionEds);
    Dispatch(
      putSubTabConclusionListEdsTempStatus({
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

  const [showNewConclusionOfCopy, setShowNewConclusionOfCopy] = useState(false);

  const handleShowNewConclusionOfCopy = (state) => {
    setShowNewConclusionOfCopy(state);
  };

  const handlePostSubTabConclusionListTemp = () => {
    if (!filteredConclusionList[0]) {
      console.error("No filtered conclusion list found");
      return;
    }

    const conclusionListTemp = {
      ...filteredConclusionList[0],
      subTabConclusionListId: filteredConclusionList[0]?.id,
      title: `V${subTabConclusionListTemp.length + 1}`,
      image: filteredCurrentMember[0]?.image,
      statusTemp: subTabConclusionListTemp.length === 0 ? true : false,
      text: subTabConclusionListTemp[subTabConclusionListTemp.length - 1]?.text,
      id: Date.now().toString(),
    };

    Dispatch(postSubTabConclusionListTemp(conclusionListTemp));

    const updatedFilteredConclusionListTemp = [
      ...filteredConclusionListTemp,
      conclusionListTemp,
    ];
    setFilteredConclusionListTemp(updatedFilteredConclusionListTemp);
  };

  const handlePostSubTabConclusionListEdsTemp = () => {
    let copyEds = {};

    Array.isArray(subTabConclusionListEdsTemp) &&
      subTabConclusionListEdsTemp.forEach((e) => {
        copyEds = {
          ...e,
          id: uuidv4(),
          comments: "",
          edsStatus: false,
          subTabConclusionListTempId:
            subTabConclusionListTemp[subTabConclusionListTemp.length - 1]?.id,
        };
        Dispatch(postSubTabConclusionListEdsTemp(copyEds));
      });

    handleShowNewConclusionOfCopy(false);
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

  const inputRef = useRef(null);

  const handleDisabledChange = () => {
    Array.isArray(subTabConclusionListEdsTemp) &&
      subTabConclusionListEdsTemp.forEach((e) => {
        // Раньше вместо e.subTabConclusionListId было subTabConclusionListTempId
        if (
          e.edsStatus === true &&
          e.subTabConclusionListId ===
            filteredConclusionListTemp[0]?.subTabConclusionListId
        ) {
          setEditConclusion(false);
        }
      });
  };

  // Раньше вместо e.subTabConclusionListId было subTabConclusionListTempId
  const isDisabledIfNotEds =
    Array.isArray(subTabConclusionListEdsTemp) &&
    subTabConclusionListEdsTemp.some(
      (e) =>
        e.edsStatus === true &&
        e.subTabConclusionListTempId === filteredConclusionListTemp[0]?.id
    );

  const isDisabledIfNotInvite =
    Array.isArray(subTabConclusionListEdsTemp) &&
    subTabConclusionListEdsTemp.some((e) => e.userAuthId === accessLogin.id);

  const isCreator =
    filteredConclusionListTemp[0]?.userAuthId === accessLogin.id;

  const isDisabled =
    isDisabledIfNotEds || (!isDisabledIfNotInvite && !isCreator);

  const filteredAllListTemp =
    Array.isArray(subTabConclusionListEdsTemp) &&
    subTabConclusionListEdsTemp.filter(
      (e) => e.subTabConclusionListTempId === filteredConclusionListTemp[0]?.id
    );

  const isDisabledEnd =
    Array.isArray(filteredAllListTemp) &&
    filteredAllListTemp.every((e) => e.edsStatus === true);

  const buttonEndIsDisabled =
    subTabConclusionListTemp[subTabConclusionListTemp.length - 1]?.statusEnd;

  const [showLiveChat, setShowLiveChat] = useState(false);

  const handleShowLiveChat = (state) => {
    setShowLiveChat(state);
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [fileValue, setFileValue] = useState(null);

  const conclusionAttachment = useSelector(
    (store) => store.chat.conclusionAttachment
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileValue(file);
  };

  const handlePostConclusionAttachment = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const year = currentDate.getFullYear();
    const date = `${day}.${month}.${year}`;

    const fileType = fileValue.name.split(".");

    const newObj = {
      id: Date.now().toString(),
      subTabConclusionListId:
        filteredConclusionListTemp[0]?.subTabConclusionListId,
      subTabConclusionListTempId: filteredConclusionListTemp[0]?.id,
      fileName: fileValue?.name,
      fileUrl: fileValue?.name,
      fileType: fileType[1],
      fileDate: date,
      name: filteredCurrentMember[0]?.name,
      role: filteredCurrentMember[0]?.role,
      image: filteredCurrentMember[0]?.image,
      userAuthId: accessLogin.id,
      status: conclusionAttachment.length === 0 ? true : false,
    };

    Dispatch(postSubTabConclusionListTempAttachment(newObj));
    setFileValue("");
  };

  const filteredCurrentConclusionAttachment =
    Array.isArray(conclusionAttachment) &&
    conclusionAttachment.filter((e) => e.status === true);

  const handlePutSubTabConclusionListTempAttachment = (item) => {
    for (let key of conclusionAttachment) {
      console.log(key.status);
      if (key.status === true) {
        Dispatch(
          putSubTabConclusionListTempAttachment({ ...key, status: false })
        );
      }
    }

    const newObj = {
      ...item,
      status: true,
    };

    Dispatch(putSubTabConclusionListTempAttachment(newObj));
  };

  const [showCommentEds, setShowCommentEds] = useState(false);

  const handleShowCommentEds = () => {
    setShowCommentEds(!showCommentEds);
  };

  const isActiveCommentsEds =
    Array.isArray(subTabConclusionListEdsTemp) &&
    subTabConclusionListEdsTemp.some(
      (e) =>
        e.userAuthId === accessLogin.id &&
        e.edsStatus === true &&
        e.subTabConclusionListTempId === filteredConclusionListTemp[0]?.id
    );

  // Disabled для кнопки "Новый" на данный момент нужно чтобы она всегда была active
  const isActiveButtonIfInvite =
    Array.isArray(subTabConclusionListEdsTemp) &&
    subTabConclusionListEdsTemp.some(
      (e) =>
        e.subTabConclusionListTempId === filteredConclusionListTemp[0]?.id &&
        e.userAuthId === accessLogin.id
    );

  const handleShowEndConclusion = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Добавляем 1, так как getMonth() возвращает месяцы с 0 по 11
    const year = date.getFullYear();

    Dispatch(
      putSubTabConclusionListTempStatusEnd({
        ...subTabConclusionListTemp[subTabConclusionListTemp.length - 1],
        statusEnd: true,
        endTime: `${day}.${month}.${year}`,
      })

      // const [year, month, day] = dateTerm.split("-");

      // const newObj = {
      //   ...visaUsers[visaUsers.length - 1],
      //   term: `${day}.${month}.${year}`,
      // };
      // console.log(newObj);
    );
  };

  // Убираем дублирующие подписи
  const currentSubTabConclusionListEdsTemp =
    Array.isArray(subTabConclusionListEdsTemp) &&
    subTabConclusionListEdsTemp.filter(
      (e, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.subTabConclusionListTempId === e.subTabConclusionListTempId &&
            t.userAuthId === e.userAuthId
        )
    );

  console.log(currentSubTabConclusionListEdsTemp);

  useEffect(() => {
    handleDisabledChange();
  }, [subTabConclusionListEdsTemp]);

  useEffect(() => {
    Dispatch(getSubTabConclusionList());
    Dispatch(getSubTabConclusionListEds());
    Dispatch(getSubTabConclusionListTemp());
    Dispatch(getSubTabConclusionListEdsTemp());
    Dispatch(getSubTabConclusionListLiveChat());
    Dispatch(getSubTabConclusionListTempAttachment());
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [filteredConclusionListTemp[0]?.status]);

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
        className="fixed conclusion-animation w-full h-full top-0 left-0 z-10"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="wrapper-conclusion absolute bg-[#fff] w-[80%] h-full flex flex-col right-0  border-[1px] shadow-lg"
        >
          {/* Заключение создателя вкладки */}
          <div className="conclusion-content flex justify-between h-full">
            <aside className="left aside-left-conclusion h-full min-w-[150px] flex flex-col items-center gap-5 py-[20px]">
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
                            {invite.userAuthId === accessLogin.id && (
                              <IconButton
                                onClick={() => handleSetNameConclusion(true)}
                              >
                                <AddIcon />
                              </IconButton>
                            )}

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
            <main className="bg-[#fff] w-full relative">
              {!editConclusion && (
                <>
                  <div className="wrapper-conclusions-temp flex border-b-[1px] flex-wrap">
                    {Array.isArray(subTabConclusionListTemp) &&
                      subTabConclusionListTemp.map((e) => {
                        // Раньше вместо e.subTabConclusionListId было subTabConclusionListTempId
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
                <div>
                  <div className="wrapper-conclusions-temp flex w-full overflow-x-auto">
                    {Array.isArray(subTabConclusionListTemp) &&
                      subTabConclusionListTemp.map((e) => {
                        // Раньше вместо e.subTabConclusionListId было subTabConclusionListTempId
                        if (
                          e.subTabConclusionListId ===
                          filteredConclusionList[0]?.id
                        ) {
                          return (
                            <Button
                              key={e.id}
                              onClick={() =>
                                handlePutSubTabConclusionListTempStatus(e)
                              }
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
                  <ReactQuill
                    ref={inputRef}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    className="react-quill-editor"
                  />
                </div>
              )}
              {/* ================================= */}
              {showLiveChat && (
                <LiveChat
                  handleShowLiveChat={handleShowLiveChat}
                  filteredConclusionListCurrent={filteredConclusionListCurrent}
                />
              )}
              {/* ================================= */}
              {(conclusionAttachment.length > 0 || fileValue?.name) && (
                <div className="attachment absolute w-full bottom-0 overflow-auto">
                  <p className="text-[15px] px-[15px] py-[5px] bg-[#007cd2] text-[#fff]">
                    Вложение
                  </p>
                  <table className="w-full" border="1">
                    <tr className="border-b-[1px]">
                      <th className="text-left p-[15px] font-[600] text-[15px]">
                        Название
                      </th>
                      <th className="text-left p-[15px] font-[600] text-[15px]">
                        Исполнитель
                      </th>
                      <th className="text-left p-[15px] font-[600] text-[15px]">
                        Тип
                      </th>
                      <th className="text-left p-[15px] font-[600] text-[15px]">
                        Дата
                      </th>
                    </tr>
                    {Array.isArray(conclusionAttachment) &&
                      conclusionAttachment.map((e) => {
                        return (
                          <tr
                            onClick={() =>
                              handlePutSubTabConclusionListTempAttachment(e)
                            }
                            key={e.id}
                            className={`${
                              e.status ? "bg-[#00000008]" : ""
                            } border-b-[1px] hover:bg-[#00000008] transition-all duration-100 cursor-pointer`}
                          >
                            <td className="p-[15px] text-[15px]">
                              {e.fileName}
                            </td>
                            <td className="p-[15px] text-[15px]">{e.name}</td>
                            <td className="p-[15px] text-[15px]">
                              {e.fileType}
                            </td>
                            <td className="p-[15px] text-[15px]">
                              {e.fileDate}
                            </td>
                          </tr>
                        );
                      })}
                    {fileValue?.name && (
                      <tr className="border-b-[1px] ">
                        <th className="text-left p-[15px] font-[600] text-[15px]">
                          {fileValue?.name}
                        </th>
                        <th className="text-left p-[15px] font-[600] text-[15px]"></th>
                        <th className="text-left p-[15px] font-[600] text-[15px]">
                          <Button
                            onClick={() => handlePostConclusionAttachment()}
                            sx={{ textTransform: "none" }}
                          >
                            Сохранить
                          </Button>
                        </th>
                        <th className="text-left p-[15px] font-[600] text-[15px]">
                          <Button
                            onClick={() => setFileValue("")}
                            sx={{ textTransform: "none" }}
                          >
                            Отмена
                          </Button>
                        </th>
                      </tr>
                    )}
                  </table>
                  <DocumentPdf
                    url={`src/assets/${filteredCurrentConclusionAttachment[0]?.fileUrl}`}
                    height="h-[30vh]"
                  />
                </div>
              )}

              {/* <div className="attachment absolute w-full bottom-0">
                <p className="px-[15px] py-[5px] font-[500] bg-[#007cd2] text-[#fff]">
                  Вложение
                </p>
                <ul className="flex flex-col">
                  <li className="border-b-[1px] py-[5px] px-[15px] text-[15px]">
                    Вложение №1
                  </li>
                  <li className="border-b-[1px] py-[5px] px-[15px] text-[15px]">
                    Вложение №2
                  </li>
                  <li className="border-b-[1px] py-[5px] px-[15px] text-[15px]">
                    Вложение №3
                  </li>
                </ul>
              </div> */}
            </main>
            {/* Подпись ======= */}
            <aside className="right aside-left-conclusion h-full min-w-[180px] relative  flex flex-col items-center gap-5 py-[20px]">
              <p className="text-[14px] text-[#939393] font-[500]">Подписи</p>
              {Array.isArray(currentSubTabConclusionListEdsTemp) &&
                currentSubTabConclusionListEdsTemp.map((e) => {
                  // Раньше вместо e.subTabConclusionListId было subTabConclusionListTempId
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
                            e.edsStatus ? "opacity-100" : "opacity-30"
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
                          <div className="bg-[#ffffffbd] flex flex-col gap-1 items-start py-[20px] px-[10px] w-full">
                            <p className="text-[14px] font-[600]">{e.name}</p>
                            <p
                              className={`text-[14px] cursor-pointer ${
                                e.edsStatus ? "text-[#007cd2]" : "text-[red]"
                              }`}
                            >
                              {e.edsStatus ? "Подписан" : "Не подписан"}
                            </p>
                            {e.comments && (
                              <Button
                                onClick={() => handleShowCommentEds()}
                                variant="text"
                                sx={{
                                  paddingY: "0",
                                  paddingX: "5px",
                                  paddingLeft: "0",
                                  textTransform: "none",
                                  fontWeight: "400",
                                  display: "flex",
                                  gap: "5px",
                                }}
                              >
                                <NotesIcon fontSize="small" />
                                <p>Комментарий</p>
                              </Button>
                            )}
                            {showCommentEds && (
                              <p className="text-[14px]">{e.comments}</p>
                            )}
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
                disabled={!isActiveButtonIfInvite}
                onClick={() => handleShowNewConclusionOfCopy(true)}
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Новый
              </Button>
              <Button
                disabled={!isActiveButtonIfInvite}
                onClick={() => {
                  handleShowConclusionEdsUsers(true);
                }}
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Пригласить
              </Button>
              <Button
                disabled={isActiveCommentsEds || !isActiveButtonIfInvite}
                onClick={() => handleShowCommentsConclusion(true)}
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Подписать
              </Button>
              <Button
                disabled={isDisabled || !isActiveButtonIfInvite}
                variant="outlined"
                sx={{ textTransform: "none" }}
                onClick={() => setEditConclusion(true)}
              >
                Изменить
              </Button>
              <Button
                onClick={() => handleShowEndConclusion()}
                disabled={
                  filteredAllListTemp.length === 0
                    ? true
                    : !isDisabledEnd || buttonEndIsDisabled
                }
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Завершить
              </Button>
              <Button
                onClick={() => setShowLiveChat(!showLiveChat)}
                className="flex gap-2"
              >
                <EmailIcon />
                <p>Live Chat</p>
              </Button>
              <Button className="flex gap-2">
                <VideocamIcon />
                <p>Video Chat</p>
              </Button>
              <Button
                type="submit"
                className="flex gap-2"
                onClick={handleButtonClick}
                disabled={isDisabled || !isActiveButtonIfInvite}
              >
                <input
                  onChange={handleFileChange}
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                />
                <ArrowCircleUpIcon />
                <p>Загрузить</p>
              </Button>
              {/* <Button
                disabled={true}
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "400" }}
              >
                Завершить
              </Button> */}
            </div>
            <div className="wrapper-buttons flex gap-5">
              <Button
                onClick={() => handleModalConclusion(false)}
                sx={{ textTransform: "none" }}
              >
                Отмена
              </Button>
              <Button
                disabled={!isActiveButtonIfInvite}
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
        <SetNameConclusion
          handleSetNameConclusion={handleSetNameConclusion}
          filteredConclusionListTemp={filteredConclusionListTemp}
        />
      )}
      {showConclusionEdsUsers && (
        <SubConclusionEdsUsers
          handleShowConclusionEdsUsers={handleShowConclusionEdsUsers}
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
      {showNewConclusionOfCopy && (
        <NewConclusionCopy
          handleShowNewConclusionOfCopy={handleShowNewConclusionOfCopy}
          handlePostSubTabConclusionListTemp={
            handlePostSubTabConclusionListTemp
          }
          handlePostSubTabConclusionListEdsTemp={
            handlePostSubTabConclusionListEdsTemp
          }
        />
      )}
    </>
  );
};

export default Conclusion;
