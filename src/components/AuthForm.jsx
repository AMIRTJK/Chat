import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { actions } from "../slices/chat-slice";
import { useDispatch, useSelector } from "react-redux";
import { postUserAuth } from "../actions/chatApi";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ stateStore, actionStore }) => {
  const { signLogin, signPassword, signNumber } = stateStore || {};
  const { setSignLogin, setSignPassword, setSignNumber } = actionStore || {};
  const usersAuth = useSelector((store) => store.chat.usersAuth);
  const { setRegLog } = actions;
  const regLog = useSelector((store) => store.chat.regLog);

  const stateObj = {
    id: Date.now(),
    login: signLogin,
    password: signPassword,
    number: signNumber,
  };

  const handleRegister = (event) => {
    event.preventDefault();
    Dispatch(postUserAuth(stateObj));
    Dispatch(setRegLog(true));
  };

  const Dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-[#fff] p-[30px] rounded-[40px] min-w-[360px] shadow-md border-[1px] min-h-[481px] relative">
      <h1 className="mulish font-[700] text-[18px] text-center">
        Министерство финансов
      </h1>
      <form action="" className="flex flex-col gap-5 py-[20px]">
        <TextField
          sx={{ borderColor: "red", borderSize: "4px" }}
          label="Логин"
          onChange={(event) => Dispatch(setSignLogin(event.target.value))}
          value={signLogin}
          InputProps={{ sx: { borderRadius: 5, backgroundColor: "#e8e8e8" } }}
        />
        <TextField
          label="Password"
          onChange={(event) => Dispatch(setSignPassword(event.target.value))}
          value={signPassword}
          InputProps={{ sx: { borderRadius: 5, backgroundColor: "#e8e8e8" } }}
        />
        <TextField
          label="Моб. номер"
          onChange={(event) => Dispatch(setSignNumber(event.target.value))}
          value={signNumber}
          InputProps={{ sx: { borderRadius: 5, backgroundColor: "#e8e8e8" } }}
        />
        {regLog === true ? (
          <TextField
            label="Код"
            InputProps={{ sx: { borderRadius: 5, backgroundColor: "#e8e8e8" } }}
          />
        ) : (
          <></>
        )}

        {/* <Link to="/"> */}
        <button
          onClick={(event) =>
            regLog === false
              ? handleRegister(event)
              : navigate("/Chat/messenger")
          }
          className="mulish absolute bg-[#607d8b] bottom-[-5%] left-[16%] text-[#fff] py-[10px] w-[70%] px-[35px] rounded-[30px] font-normal"
        >
          {regLog === false ? "Зарегистрироваться" : "Войти"}
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default AuthForm;
