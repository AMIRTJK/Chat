import React from "react";
import SubBodyMessages from "./SubBodyMessages";

const SubChat = () => {
  return (
    <main className="min-w-[1535px] flex">
      <aside className="left w-[30%] category-scrollbar bg-[#f9f9f9] p-[20px] h-[100vh] flex flex-col justify-between  overflow-auto"></aside>
      <aside className="right w-[70%]">
        <SubBodyMessages />
        <input type="password" />
      </aside>
    </main>
  );
};

export default SubChat;
