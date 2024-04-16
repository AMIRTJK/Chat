import React from "react";
import logo from "../assets/logo.svg";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
import AuthForm from "./AuthForm";

const Authorization = () => {
  return (
    <section className="bg-[#fff] w-full h-full absolute z-10">
      <header className="bg-[#fff] flex justify-between items-center py-[24px] pl-[15px]">
        <div className="wrapper-logo flex items-center gap-5 cursor-pointer ml-[193px]">
          <img src={logo} alt="" />
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
        <div className="wrapper-form flex items-center justify-center gap-5 w-full">
          <AuthForm />
          <AuthForm />
          <AuthForm />
        </div>
      </main>
    </section>
  );
};

export default Authorization;
