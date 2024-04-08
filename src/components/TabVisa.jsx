import React from "react";
import "../../src/App.css";

const TabVisa = ({ text, Icon, handleClick }) => {
  return (
    <div
      onClick={() => {
        handleClick(true);
      }}
      className="wrapper-tab flex justify-between border-[2px] border-[#007cd2] p-[10px] rounded-lg cursor-pointer hover:bg-[#007cd2] transition-all duration-100"
    >
      <p className="text-[#007cd2] font-medium">{text}</p>
      {Icon}
    </div>
  );
};

export default TabVisa;
