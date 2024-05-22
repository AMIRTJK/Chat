import React, { useState, useEffect } from "react";
import VisaListExecutors from "./VisaListExecutors";
import { Button } from "@mui/material";
import { getDefaultVisa, getOwnVisa } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";

import { TextField } from "@mui/material";
import { actions } from "../slices/chat-slice";

const VisaModalExecutors = ({ handleShowVisa }) => {
  const Dispatch = useDispatch();

  const defaultVisa = useSelector((store) => store.chat.defaultVisa);
  const ownVisa = useSelector((store) => store.chat.ownVisa);
  const ownVisaValue = useSelector((store) => store.chat.ownVisaValue);
  const visaListTemp = useSelector((store) => store.chat.visaListTemp);

  const visaMessage = useSelector((store) => store.chat.visaMessage);

  const { setOwnVisaValue, setExecutorVisa } = actions;

  const handlePropagation = (event) => {
    event.stopPropagation();
  };

  const [stateVisa, setStateVisa] = useState(false);
  const [ownVisaInput, setOwnVisaInput] = useState(false);

  const handleShowOwnVisa = () => {
    if (visaListTemp.length > 0) {
      handleShowVisa(false);
    }
  };

  useEffect(() => {
    Dispatch(getDefaultVisa());
    Dispatch(getOwnVisa());
  }, []);

  return (
    <div
      onClick={() => {
        Dispatch(setExecutorVisa(false));
      }}
      className="modal relative h-full bg-transparent z-10"
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
              Дефолтные визы
            </button>
            <button
              onClick={() => setStateVisa(true)}
              className={`${
                stateVisa === true ? "bg-[#007bd248]" : ""
              } border-r-[1px] border-[#00000058] w-[50%] p-[10px] bg-[#007bd22a] hover:bg-[#007bd248] transition-all duration-100`}
            >
              Собственные визы
            </button>
          </div>
        </header>
        <main className="bg-[#f9f9f9] overflow-auto h-[30vh]">
          {stateVisa === false
            ? Array.isArray(defaultVisa) &&
              defaultVisa.map((e) => {
                return <VisaListExecutors key={e.id} name={e.name} item={e} />;
              })
            : Array.isArray(ownVisa) &&
              ownVisa.map((e) => {
                return <VisaListExecutors key={e.id} item={e} />;
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
              Своя виза
            </Button>
          ) : (
            <input
              onChange={(event) =>
                Dispatch(setOwnVisaValue(event.target.value))
              }
              value={ownVisaValue}
              type="text"
              placeholder="Собственная виза"
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
            Добавить
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default VisaModalExecutors;
