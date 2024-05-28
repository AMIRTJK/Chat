import React from "react";
import SubInputMessage from "./SubInputMessage";

const SubWrapperInputMessage = () => {
  return (
    <div className="wrapper-input-message border-t-[1px] p-[30px] justify-center flex flex-col items-center gap-4">
      <div className="panel-control flex items-center gap-5">
        <p>TAB 1</p>
        <p>TAB 2</p>
        <p>TAB 3</p>
        <p>TAB 4</p>
      </div>
      <SubInputMessage />
    </div>
  );
};

export default SubWrapperInputMessage;
