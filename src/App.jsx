import React, { useEffect } from "react";
import "./App.css";

import TabVisa from "./components/TabVisa";
import AttachedDocuments from "./components/AttachedDocuments";
import StructureOrganizations from "./components/StructureOrganizations";
import VisaModal from "./components/VisaModal";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slices/chat-slice";

import {
  getUsers,
  getUserChats,
  putUserChatStatus,
  getVisaListTemp,
  getUserMessage,
  postUserMessage,
  // clearUserMessage,
} from "./actions/chatApi";
import LoadingChat from "./components/LoadingChat";

import { IconButton } from "@mui/material";

import ChatUser from "./components/ChatUser";

import MemoVisa from "./components/MemoVisa";

import DocumentPdf from "./components/DocumentPdf";

import TitleChat from "./components/TitleChat";

import WrapperInputMessage from "./components/WrapperInputMessage";

import BodyMessages from "./components/BodyMessages";

function App() {
  const Dispatch = useDispatch();

  const { setShowStructure, setShowVisa, setShowDocPdf, setAsideMessage } =
    actions;
  const showStructure = useSelector((store) => store.chat.showStructure);
  const userChats = useSelector((store) => store.chat.userChats);
  const showVisa = useSelector((store) => store.chat.showVisa);
  const users = useSelector((store) => store.chat.users);
  const visaListTemp = useSelector((store) => store.chat.visaListTemp);
  const showDocPdf = useSelector((store) => store.chat.showDocPdf);
  const userMessage = useSelector((store) => store.chat.userMessage);

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

  const ministerImg = "https://i.ibb.co/HqvF08R/image.jpg";
  const docNo1Img = "https://i.ibb.co/L1Bj3fb/Document-1.png";

  useEffect(() => {
    Dispatch(getUserChats());
    Dispatch(getUsers());
    Dispatch(getVisaListTemp());
    Dispatch(getUserMessage());
  }, [Dispatch]);

  return (
    <>
      <main className="flex overflow-hidden">
        <aside className="left category-scrollbar bg-[#f9f9f9] p-[20px] h-[100vh] flex flex-col justify-between w-[20%] overflow-auto">
          <div
            className={`${showStructure ? "blur-[3px]" : "none"} wrapperNo1`}
          >
            <div className="avatar flex items-center gap-5 mb-[30px]">
              <IconButton sx={{ padding: "0px" }}>
                <div className="wrapper-image w-[60px] h-[60px] rounded-[30px] overflow-hidden border-[1px] border-[#007cd2]">
                  <img src={ministerImg} alt="" />
                </div>
              </IconButton>

              <div className="text">
                <p className="text-[#007cd2] font-bold">Каҳҳорзода Файзиддин</p>
                <p className="text-[#c0c9cb] text-[14px]">Министр Финансов</p>
              </div>
            </div>
            <div className="panel-control flex flex-col gap-5">
              {visaListTemp.length > 0 && (
                <MemoVisa
                  item={users}
                  userChats={userChats}
                  visaListTemp={visaListTemp}
                />
              )}
              <TabVisa
                handleClick={handleClick}
                text="Исполнитель"
                Icon={<PersonIcon className="colorIcon text-[#007cd2]" />}
              />
              <TabVisa
                text="Виза"
                handleClick={handleShowVisa}
                Icon={<AssignmentIcon className="colorIcon text-[#007cd2]" />}
              />
              {/* <TabVisa
                text="Срок"
                Icon={<ScheduleIcon className="colorIcon text-[#007cd2]" />}
              /> */}
              <input
                type="date"
                className="border-[#007cd2] border-[2px] rounded-lg p-[10px] text-[#007cd2] font-medium cursor-pointer hover:bg-[#007cd2] hover:text-[#fff]"
              />
              <fieldset className="tab-visa-select border-[#007cd2] border-[2px] rounded-lg p-[10px] text-[#007cd2] font-medium cursor-pointer">
                <select
                  name=""
                  id=""
                  className="bg-transparent outline-none  w-full cursor-pointer"
                >
                  <option value="">Назоратӣ</option>
                  <option value="">Фаврӣ</option>
                </select>
              </fieldset>
              <div className="wrapper-documents flex flex-col gap-2">
                <p className="text-[14px] text-[#007cd2] font-medium">
                  Вложенные документы
                </p>
                <div className="wrapper-list flex gap-4">
                  <AttachedDocuments
                    handleShowDocPdf={handleShowDocPdf}
                    document={docNo1Img}
                  />
                  <AttachedDocuments
                    handleShowDocPdf={handleShowDocPdf}
                    document={docNo1Img}
                  />
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
          </div>
          <div
            className={`${
              showStructure ? "blur-[3px]" : "none"
            } wrapperNo2 pt-[20px]`}
          >
            <Button
              onClick={() => {
                Dispatch(setAsideMessage(true));
                userChats.forEach((e) => {
                  if (e.status === true) {
                    Dispatch(
                      postUserMessage({
                        id: Date.now(),
                        userChatId: e.id,
                      })
                    );
                  }
                  if (userMessage[0] && userMessage[0].userChatId) {
                    // Dispatch(clearUserMessage(userMessage[0].id));
                  }
                });
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
          {showStructure && <StructureOrganizations />}
          {showVisa && <VisaModal handleShowVisa={handleShowVisa} />}
          {showDocPdf && (
            <div
              onClick={(event) => handleShowDocPdf(false, event)}
              className="wrapper-pdf fixed top-0 left-0 w-full h-full z-10 bg-[#00000020]"
            >
              <div
                onClick={(event) => handlePropagation(event)}
                className="pdf h-[60vh] w-[26%] absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 shadow-lg border-[1px] rounded-lg"
              >
                <DocumentPdf />
              </div>
            </div>
          )}
        </aside>
        {userMessage.length > 0 && (
          <aside className="right w-[80%]">
            {userChats.length < 1 && <LoadingChat />}
            {userMessage.length > 0 && (
              <TitleChat userChats={userChats} userMessage={userMessage} />
            )}
            {userMessage.length > 0 && <BodyMessages />}
            {userMessage.length > 0 && <WrapperInputMessage />}
          </aside>
        )}
      </main>
    </>
  );
}

export default App;
