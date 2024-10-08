import React, { useState, useEffect } from "react";
import VisaList from "./VisaList";
import { Button } from "@mui/material";
import {
  getVisaList,
  getVisaListTemp,
  deleteVisaListTemp,
  postVisaListTemp,
} from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";

import { TextField } from "@mui/material";
import { actions } from "../slices/chat-slice";

const VisaModal = ({ handleShowVisa }) => {
  const Dispatch = useDispatch();

  const visaList = useSelector((store) => store.chat.visaList);
  const visaListTemp = useSelector((store) => store.chat.visaListTemp);
  const ownVisa = useSelector((store) => store.chat.ownVisa);
  const ownVisaValue = useSelector((store) => store.chat.ownVisaValue);

  const { setOwnVisaValue } = actions;

  const handlePropagation = (event) => {
    event.stopPropagation();
  };

  let newObj = null;

  Array.isArray(visaListTemp) &&
    visaListTemp.map((e) => {
      return (newObj = e);
    });



  const [stateVisa, setStateVisa] = useState(false);
  const [ownVisaInput, setOwnVisaInput] = useState(false);

  const newOwnVisa = {
    id: Date.now().toString(),
    name: ownVisaValue,
    status: true,
  };



  const handleShowOwnVisa = () => {
    if (visaListTemp.length > 0) {
      handleShowVisa(false);
    }
    if (ownVisaValue.length > 0) {
      Dispatch(postVisaListTemp(newOwnVisa));
      Dispatch(setOwnVisaValue(""));
    }
  };

  useEffect(() => {
    Dispatch(getVisaList());
    Dispatch(getVisaListTemp());
  }, []);

  return (
    <div
      onClick={() => {
        handleShowVisa(false);
        Dispatch(deleteVisaListTemp(newObj?.id));
      }}
      className="modal fixed w-full h-full bg-transparent z-10"
    >
      <div
        onClick={(event) => handlePropagation(event)}
        className="modal-content overflow-hidden shadow-lg border-[1px] w-[30%] rounded-lg absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      >
        <header className="pt-[15px] bg-[#007cd2]">
          <div className="title">
            <h1 className="text-center text-[#f9f9f9] text-[18px]">
              Выбрать визу
            </h1>
          </div>
          <div className="visa-category bg-[#fff] mt-[15px]">
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
        </header>
        <main className="bg-[#f9f9f9] overflow-auto h-[30vh]">
          {stateVisa === false
            ? Array.isArray(visaList[0]?.defaultVisa) &&
              visaList[0]?.defaultVisa.map((e) => {
                return (
                  <VisaList
                    key={e.id}
                    name={e.name}
                    item={e}
                    deleteItem={newObj}
                  />
                );
              })
            : Array.isArray(visaList[0]?.ownVisa) &&
              visaList[0]?.ownVisa.map((e) => {
                return (
                  <VisaList
                    key={e.id}
                    name={e.name}
                    item={e}
                    deleteItem={newObj}
                  />
                );
              })}
        </main>
        <footer className="bg-[#007cd2] flex justify-end gap-5 items-center p-[10px]">
          {ownVisaInput === false ? (
            <Button
              onClick={() => setOwnVisaInput(true)}
              variant="outlined"
              sx={{
                border: "1px solid #f9f9f9",
                color: "#f9f9f9",
                "&:hover": {
                  bgcolor: "#f9f9f9",
                  border: "1px solid #f9f9f9",
                  color: "#007cd2",
                },
              }}
            >
              Создать
            </Button>
          ) : (
            <input
              onChange={(event) =>
                Dispatch(setOwnVisaValue(event.target.value))
              }
              value={ownVisaValue}
              type="text"
              placeholder="Комментарии"
              className="bg-[transparent] text-[#fff] border-[1px] border-[#fff] outline-none p-[5.7px] w-full rounded-[5px] placeholder:text-[#fff] placeholder:font-light"
            />
          )}
          <Button
            onClick={() => {
              handleShowOwnVisa();
            }}
            variant="outlined"
            sx={{
              border: "1px solid #f9f9f9",
              color: "#f9f9f9",
              "&:hover": {
                bgcolor: "#f9f9f9",
                border: "1px solid #f9f9f9",
                color: "#007cd2",
              },
            }}
          >
            Сохранить
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default VisaModal;
