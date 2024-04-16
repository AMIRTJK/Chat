import React from "react";
import { TextField } from "@mui/material";

const AuthForm = () => {
  return (
    <div className="bg-[#fff] p-[30px] rounded-[40px] min-w-[360px] shadow-md border-[1px] min-h-[481px] relative">
      <h1 className="mulish font-[700] text-[18px] text-center">
        Министерство финансов
      </h1>
      <form action="" className="flex flex-col gap-5 py-[20px]">
        <TextField
          sx={{ borderColor: "red", borderSize: "4px" }}
          label="Логин"
          InputProps={{ sx: { borderRadius: 5, backgroundColor: "#e8e8e8" } }}
        />
        <TextField
          label="Password"
          InputProps={{ sx: { borderRadius: 5, backgroundColor: "#e8e8e8" } }}
        />
        <TextField
          label="Моб. номер"
          InputProps={{ sx: { borderRadius: 5, backgroundColor: "#e8e8e8" } }}
        />
        <TextField
          label="Код"
          InputProps={{ sx: { borderRadius: 5, backgroundColor: "#e8e8e8" } }}
        />
        <button className="mulish absolute bg-[#607d8b] bottom-[-5%] left-[25%] text-[#fff] py-[10px] px-[35px] rounded-[30px] font-normal">
          Отправить код
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
