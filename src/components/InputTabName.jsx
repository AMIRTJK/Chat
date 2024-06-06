import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../slices/chat-slice";

import { Button } from "@mui/material";

const InputTabName = ({ handleShowTabName, handlePostSubTabMessages }) => {
  const Dispatch = useDispatch();

  const tabNameValue = useSelector((store) => store.chat.tabNameValue);

  const { setTabNameValue } = actions;

  return (
    <div
      onClick={() => handleShowTabName(false)}
      className="bg-[#00000042] fixed top-0 left-0 w-full h-full z-10"
    >
      <main
        onClick={(event) => event.stopPropagation()}
        className="bg-[#fff] absolute flex flex-col gap-5 items-start top-1/2 left-1/2 translate-x-[-20%] translate-y-[-50%] shadow-lg w-[30%] p-[20px]"
      >
        <p className="font-semibold text-[15px]">Новая вкладка</p>
        <input
          onChange={(event) => Dispatch(setTabNameValue(event.target.value))}
          value={tabNameValue}
          type="text"
          placeholder="Введите название вкладки"
          className="border-b-[1px] border-[#000000] outline-none w-full py-[5px] text-[15px]"
        />
        <div className="panel-control flex justify-end w-full">
          <div className="wrapper-buttons flex gap-5">
            <Button
              onClick={() => handleShowTabName(false)}
              variant="text"
              sx={{ textTransform: "none", fontWeight: "400" }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                handlePostSubTabMessages();
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
  );
};

export default InputTabName;
