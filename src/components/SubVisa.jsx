import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { actions } from "../slices/chat-slice";

import {
  getDefaultVisa,
  getOwnVisa,
  getVisaUsers,
  postVisaMessage,
  putVisaUsers,
  postVisaUsers,
} from "../actions/chatApi";

import StructureOrganizationsExecutors from "./StructureOrganizationsExecutors";

import { formattedDate } from "../utils/currentDate.js";

const SubVisa = ({ handleShowSubVisa }) => {
  const [stateVisa, setStateVisa] = useState(false);

  const defaultVisa = useSelector((store) => store.chat.defaultVisa);
  const ownVisa = useSelector((store) => store.chat.ownVisa);
  const ownVisaValue = useSelector((store) => store.chat.ownVisaValue);
  const chatById = useSelector((store) => store.chat.chatById);
  const visaUsers = useSelector((store) => store.chat.visaUsers);

  const { setOwnVisaValue } = actions;

  const Dispatch = useDispatch();

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const [showStructure, setShowStructure] = useState(false);

  const handleShowStructure = (state) => {
    setShowStructure(state);
  };

  const handleShowOwnVisa = () => {
    if (ownVisaValue.length > 0) {
      const newObj = {
        id: Date.now().toString(),
        name: ownVisaValue,
        status: true,
        visaUserId: chatById[0].id,
      };
      Dispatch(postVisaMessage(newObj));
      Dispatch(setOwnVisaValue(""));
    }
  };

  const handlePostSubVisa = () => {
    Dispatch(
      postVisaUsers({
        id: Date.now().toString(),
        userAuthId: accessLogin.id,
        login: accessLogin.login,
        term: "",
        status: "",
        eds: "",
        createdAt: formattedDate,
      })
    );
  };

  const [dateTerm, setDateTerm] = useState("");

  const handlePutTerm = (event) => {
    setDateTerm(event.target.value);
  };

  console.log(visaUsers[visaUsers.length - 1]);

  const handlePutSubVisaTerm = () => {
    const newObj = {
      ...visaUsers[visaUsers.length - 1],
      term: dateTerm,
    };
    console.log(newObj);
    Dispatch(putVisaUsers(newObj));
  };

  const handlePostVisaMessage = (clickedItem) => {
    const newObj = {
      id: clickedItem.id,
      name: clickedItem.name,
      status: true,
      visaUserId: chatById[0].id,
    };
    console.log(newObj);
    Dispatch(postVisaMessage(newObj));
  };

  useEffect(() => {
    Dispatch(getDefaultVisa());
    Dispatch(getOwnVisa());
    Dispatch(getVisaUsers());
  }, [Dispatch]);

  return (
    <>
      <div className="bg-[#00000042] fixed top-0 left-0 w-full h-full z-10">
        <main
          onClick={(event) => event.stopPropagation()}
          className="bg-[#fff] absolute flex flex-col gap-5 items-start justify-between top-1/2 left-1/2 translate-x-[-20%] translate-y-[-50%] shadow-lg w-[30%] p-[20px]"
        >
          <div className="add-executors flex flex-col gap-3 items-start w-full">
            <p className="font-semibold text-[15px]">Пригласить участника</p>

            <Button
              onClick={() => handleShowStructure(true)}
              variant="outlined"
              sx={{ textTransform: "none", width: "100%" }}
            >
              Открыть структуру
            </Button>
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
                        onClick={() => {
                          handlePostSubVisa();
                          handlePostVisaMessage(e);
                        }}
                        key={e.id}
                        className="p-[10px] border-b-[1px] cursor-pointer hover:bg-[#f9f9f9]"
                      >
                        {e.name}
                      </p>
                    );
                  })
                : Array.isArray(ownVisa) &&
                  ownVisa.map((e) => {
                    return (
                      <p
                        onClick={() => {
                          handlePostSubVisa();
                          handlePostVisaMessage(e);
                        }}
                        key={e.id}
                        className="p-[10px] border-b-[1px] cursor-pointer hover:bg-[#f9f9f9]"
                      >
                        {e.name}
                      </p>
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
          <div className="add-term w-full flex gap-3">
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
                onClick={() => handleShowSubVisa(false)}
                variant="text"
                sx={{ textTransform: "none", fontWeight: "400" }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => {
                  handleShowSubVisa(false);
                  handlePutSubVisaTerm();
                }}
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "400" }}
              >
                Создать
              </Button>
            </div>
          </div>
        </main>
      </div>
      {showStructure && (
        <StructureOrganizationsExecutors
          handleShowStructure={handleShowStructure}
        />
      )}
    </>
  );
};

export default SubVisa;
