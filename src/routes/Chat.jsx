import React, { useState, useEffect } from "react";
import "../App.css";

import Authorization from "../routes/Authorization";

import TabVisa from "../components/TabVisa";
import AttachedDocuments from "../components/AttachedDocuments";
import StructureOrganizations from "../components/StructureOrganizations";
import VisaModal from "../components/VisaModal";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slices/chat-slice";

import { TextField } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

import {
  getUsers,
  getUserChats,
  putUserChatStatus,
  getVisaListTemp,
  getTermDate,
  postTermDate,
  getVisaStatus,
  getVisaStatusTemp,
  postVisaStatusTemp,
  getShowUserChat,
  postShowUserChat,
} from "../actions/chatApi";
import LoadingChat from "../components/LoadingChat";

import { IconButton } from "@mui/material";

import ChatUser from "../components/ChatUser";

import MemoVisa from "../components/MemoVisa";

import DocumentPdf from "../components/DocumentPdf";

import TitleChat from "../components/TitleChat";

import WrapperInputMessage from "../components/WrapperInputMessage";

import BodyMessages from "../components/BodyMessages";

import WebToolBox from "../components/WebToolBox";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

import DeleteIcon from "@mui/icons-material/Delete";

const Chat = () => {
  const Dispatch = useDispatch();

  const {
    setShowStructure,
    setShowVisa,
    setShowDocPdf,
    setAsideMessage,
    setRenderOfRole,
  } = actions;

  const showStructure = useSelector((store) => store.chat.showStructure);
  const userChats = useSelector((store) => store.chat.userChats);
  const showVisa = useSelector((store) => store.chat.showVisa);
  const users = useSelector((store) => store.chat.users);
  const visaListTemp = useSelector((store) => store.chat.visaListTemp);
  const termDate = useSelector((store) => store.chat.termDate);
  const visaStatus = useSelector((store) => store.chat.visaStatus);
  const visaStatusTemp = useSelector((store) => store.chat.visaStatusTemp);
  const showDocPdf = useSelector((store) => store.chat.showDocPdf);
  const showUserChat = useSelector((store) => store.chat.showUserChat);
  const renderOfRole = useSelector((store) => store.chat.renderOfRole);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const handleClick = (state) => {
    Dispatch(setShowStructure(state));
  };

  const handlePutUserChatStatus = (newObj) => {
    userChats.forEach((e) => {
      if (e.status === true) {
        Dispatch(putUserChatStatus({ ...e, status: false }));
      }
    });
    Dispatch(putUserChatStatus(newObj));
  };

  const handleShowVisa = (state) => {
    Dispatch(setShowVisa(state));
  };

  const handleShowDocPdf = (state) => {
    Dispatch(setShowDocPdf(state));
  };

  const handlePropagation = (event) => {
    event.stopPropagation();
  };

  const docNo1Img = "src/assets/Document№1.png";

  const renderRoleUsers = () => {
    if (accessLogin.login === "f.kahhorzoda") {
      Dispatch(setRenderOfRole(true));
    } else {
      Dispatch(setRenderOfRole(false));
    }
  };

  const [date, setDate] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleChange = (event) => {
    setDate(event.target.value);
    setIsDateSelected(true);
  };

  const handleBlur = () => {
    if (date === "") {
      setIsDateSelected(false);
    }
  };

  const handleClickDate = () => {
    if (!isDateSelected) {
      setIsDateSelected(true);
    }
  };

  const handlePostTermDate = (event) => {
    const [year, month, day] = event.target.value.split("-");
    const newObj = {
      id: Date.now().toString(),
      date: `${day}.${month}.${year}`,
    };
    Dispatch(postTermDate(newObj));
  };

  const handlePostVisaStatusTemp = (event) => {
    const newObj = {
      id: Date.now().toString(),
      status: event.target.value,
    };
    Dispatch(postVisaStatusTemp(newObj));
  };

  useEffect(() => {
    Dispatch(getUserChats());
    Dispatch(getUsers());
    Dispatch(getVisaListTemp());
    Dispatch(getTermDate());
    Dispatch(getVisaStatus());
    Dispatch(getVisaStatusTemp());
    Dispatch(getShowUserChat());
    renderRoleUsers();
  }, [Dispatch]);

  return (
    <>
      <main className="flex overflow-hidden">
        <WebToolBox />
        <aside className="left category-scrollbar bg-[#f9f9f9] p-[20px] h-[100vh] flex flex-col justify-between w-[20%] overflow-auto">
          <div
            className={`${showStructure ? "blur-[3px]" : "none"} wrapperNo1`}
          >
            {users.map((e) => {
              if (e.login === "f.kahhorzoda") {
                return (
                  <div
                    key={e.id}
                    className="avatar flex items-center gap-5 mb-[30px]"
                  >
                    <IconButton sx={{ padding: "0px" }}>
                      <div className="wrapper-image w-[60px] h-[60px] rounded-[30px] overflow-hidden border-[1px] border-[#007cd2]">
                        <img src={e.image} alt="" />
                      </div>
                    </IconButton>
                    <div className="text">
                      <p className="text-[#007cd2] font-bold">{e.name}</p>
                      <p className="text-[#a9a9a9] text-[14px]">{e.role}</p>
                    </div>
                  </div>
                );
              }
            })}
            <div className="panel-control flex flex-col gap-5 mb-[20px]">
              {visaListTemp.length > 0 && (
                <MemoVisa
                  item={users}
                  userChats={userChats}
                  visaListTemp={visaListTemp}
                  termDate={termDate}
                  visaStatusTemp={visaStatusTemp}
                />
              )}
              {renderOfRole && showUserChat.length < 1 && (
                <>
                  <TabVisa
                    handleClick={handleClick}
                    text="Исполнитель"
                    Icon={<PersonIcon className="colorIcon text-[#007cd2]" />}
                  />
                  <TabVisa
                    text="Виза"
                    handleClick={handleShowVisa}
                    Icon={
                      <AssignmentIcon className="colorIcon text-[#007cd2]" />
                    }
                  />
                  <input
                    type={isDateSelected ? "date" : "text"}
                    value={isDateSelected ? date : "Срок"}
                    onChange={(event) => {
                      handleChange(event);
                      handlePostTermDate(event);
                    }}
                    onBlur={handleBlur}
                    onClick={handleClickDate}
                    className="border-[#007cd2] border-[2px] rounded-lg p-[10px] text-[#007cd2] font-medium cursor-pointer hover:bg-[#007cd2] hover:text-[#fff]"
                  />
                  <fieldset className="tab-visa-select border-[#007cd2] border-[2px] rounded-lg p-[10px] text-[#007cd2] font-medium cursor-pointer">
                    <select
                      onChange={(event) => handlePostVisaStatusTemp(event)}
                      name=""
                      id=""
                      className="bg-transparent outline-none  w-full cursor-pointer"
                    >
                      {visaStatus.map((e) => {
                        return (
                          <option key={e.id} value={e.status}>
                            {e.status}
                          </option>
                        );
                      })}
                    </select>
                  </fieldset>
                </>
              )}
            </div>

            <div className="wrapper-documents flex flex-col gap-2 mb-[20px]">
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  gap: 1,
                  width: "58%",
                  textTransform: "none",
                }}
              >
                <FileUploadOutlinedIcon />
                <p>Загрузить файл</p>
              </Button>
              {/* <p className="text-[14px] text-[#007cd2] font-medium">
                Вложенные документы
              </p> */}
              <div className="wrapper-list flex gap-4">
                <div className="wrapper-document flex items-center gap-2 w-full">
                  <IconButton sx={{ justifyContent: "start" }}>
                    <FileDownloadIcon className="text-[#1976D2]" />
                  </IconButton>
                  <Button
                    onClick={() => handleShowDocPdf(true)}
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: "400",
                      width: "100%",
                    }}
                  >
                    <p className="text-[14px] text-[#000] overflow-ellipsis overflow-hidden whitespace-nowrap">
                      Мактуб оиди модернезацияи низоми
                    </p>

                    <DeleteIcon />
                  </Button>
                </div>
                {/* <AttachedDocuments
                  handleShowDocPdf={handleShowDocPdf}
                  document={docNo1Img}
                />
                <AttachedDocuments
                  handleShowDocPdf={handleShowDocPdf}
                  document={docNo1Img}
                /> */}
              </div>
            </div>
            <div className="wrapper-chats flex flex-col gap-5">
              {userChats.length > 0 &&
                userChats.map((e) => {
                  return (
                    <ChatUser
                      key={e.id}
                      item={e}
                      handlePutUserChatStatus={handlePutUserChatStatus}
                    />
                  );
                })}
            </div>
          </div>
          {renderOfRole && (
            <div
              className={`${
                showStructure ? "blur-[3px]" : "none"
              } wrapperNo2 pt-[20px]`}
            >
              <Button
                onClick={() => {
                  Dispatch(setAsideMessage(true));
                  if (userChats.length > 0) {
                    Dispatch(
                      postShowUserChat({
                        id: Date.now(),
                      })
                    );
                  }
                }}
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "none",
                  fontWeight: "normal",
                  fontSize: "15px",
                }}
              >
                Визировать
              </Button>
            </div>
          )}

          {showStructure && <StructureOrganizations />}
          {showVisa && <VisaModal handleShowVisa={handleShowVisa} />}
          {showDocPdf && (
            <div
              onClick={(event) => handleShowDocPdf(false, event)}
              className="wrapper-pdf  fixed top-0 left-0 w-full h-full z-10 bg-[#00000020]"
            >
              <div
                onClick={(event) => handlePropagation(event)}
                className="pdf w-[30%] h-[80vh] absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 shadow-lg border-[1px] rounded-lg"
              >
                <Swiper
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <DocumentPdf
                      url="src/assets/811_ВИ_541 Кумитаи давла_931217.pdf"
                      height="h-[70vh]"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <DocumentPdf
                      url="src/assets/Огохинома - оид ба баргардонидани ариза.pdf"
                      height="h-[70vh]"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          )}
        </aside>
        <aside className="right w-[80%]">
          {userChats.length < 1 && <LoadingChat />}
          {showUserChat.length > 0 && <TitleChat />}
          {showUserChat.length > 0 && <BodyMessages />}
          {showUserChat.length > 0 && <WrapperInputMessage />}
        </aside>
      </main>
    </>
  );
};

export default Chat;
