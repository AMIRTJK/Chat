import React, { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
import AuthForm from "../components/AuthForm";
import { actions } from "../slices/chat-slice";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.svg";

const Authorization = () => {
  const signLogin = useSelector((store) => store.chat.signLogin);
  const signPassword = useSelector((store) => store.chat.signPassword);
  const signNumber = useSelector((store) => store.chat.signNumber);

  const { setSignLogin, setSignPassword, setSignNumber, setRegLog } = actions;

  const stateStore = {
    signLogin: signLogin,
    signPassword: signPassword,
    signNumber: signNumber,
  };

  const actionStore = {
    setSignLogin: setSignLogin,
    setSignPassword: setSignPassword,
    setSignNumber: setSignNumber,
  };

  const Dispatch = useDispatch();

  const regLog = useSelector((store) => store.chat.regLog);

  console.log(regLog);

  return (
    <section className="bg-[#fff] w-full h-full absolute z-10">
      <header className="bg-[#fff] flex justify-between items-center py-[24px] pl-[15px]">
        <div className="wrapper-logo flex items-center gap-5 cursor-pointer ml-[193px]">
          <img
            src={logo}
            // src="https://i.ibb.co/xCjbnnw/emblem.png"
            alt=""
            // className="w-[4%]"
          />
          <div className="text flex flex-col items-center">
            <p className="mulish text-[#607d8b]">Вазорати молияи</p>
            <p className="mulish font-[700] text-[#607d8b]">
              Ҷумҳурии Тоҷикистон
            </p>
          </div>
        </div>
        <Button sx={{ textTransform: "none", padding: "5px 25px" }}>
          <div className="wrapper-lang flex items-center gap-2">
            <LanguageIcon className="text-[#607d8b]" fontSize="small" />
            <p className="mulish text-[#607d8b] text-[16px]">Рус</p>
            <KeyboardArrowDownIcon
              className="text-[#607d8b]"
              fontSize="small"
            />
          </div>
        </Button>
      </header>
      <main className="linear h-[100vh] pt-[182px]">
        <div className="wrapper-form flex items-center justify-center gap-5 flex-col">
          <div className="auth-pop-up flex items-center gap-5">
            <button
              onClick={() => Dispatch(setRegLog(false))}
              className={`${
                regLog === false ? "bg-[green]" : ""
              } mulish bg-[#607d8b] text-[#fff] min-w-[180px] py-[10px] px-[35px] rounded-[30px] font-normal`}
            >
              Регистрация
            </button>
            <button
              onClick={() => Dispatch(setRegLog(true))}
              className={`${
                regLog === true ? "bg-[green]" : ""
              } mulish bg-[#607d8b] text-[#fff] min-w-[180px] py-[10px] px-[35px] rounded-[30px] font-normal`}
            >
              Войти
            </button>
          </div>
          <AuthForm stateStore={stateStore} actionStore={actionStore} />
        </div>
      </main>
    </section>
  );
};

export default Authorization;
