import React from "react";

import PanelTabVisa from "./PanelTabVisa";
import InputMessage from "./InputMessage";

const WrapperInputMessage = () => {
  return (
    <div className="wrapper-input-message border-t-[1px] px-[30px] py-[20px] h-[26%] flex flex-col items-center gap-4">
      <div className="panel-control flex items-center gap-5">
        <PanelTabVisa name="Упомянуть" />
        <PanelTabVisa name="Исполнитель" />
        <PanelTabVisa name="Виза" />
        <PanelTabVisa name="К исполнению" />
        <PanelTabVisa name="Срок" />
      </div>
      <InputMessage />
    </div>
  );
};

export default WrapperInputMessage;
