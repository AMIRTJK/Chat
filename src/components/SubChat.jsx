import React from "react";
import SubBodyMessages from "./SubBodyMessages";
import SubTitleChat from "./SubTitleChat";
import SubWrapperInputMessage from "./SubWrapperInputMessage";

const SubChat = () => {
  return (
    <main className="min-w-[1535px] flex flex-col justify-between h-full">
      <SubTitleChat  />
      <SubBodyMessages />
      <SubWrapperInputMessage />
    </main>
  );
};

export default SubChat;
