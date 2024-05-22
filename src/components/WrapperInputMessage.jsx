import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slices/chat-slice";

import PanelTabVisa from "./PanelTabVisa";
import InputMessage from "./InputMessage";
import ReplyMessage from "./ReplyMessage";
import StructureOrganizationsExecutors from "./StructureOrganizationsExecutors";

const WrapperInputMessage = () => {
  const { setShowSend, setExecutorVisa } = actions;
  const showSend = useSelector((store) => store.chat.showSend);

  const [executor, setExecutor] = useState(false);

  const handleShowMention = (value) => {
    Dispatch(setShowSend("@"));
  };
  const handleShowExecutor = (state) => {
    setExecutor(state);
  };

  const handleShowVisa = (state) => {
    Dispatch(setExecutorVisa(state));
  };
  const handleShowStatus = (state) => {
    // setExecutor(state);
  };
  const handleShowTerm = (state) => {
    // setExecutor(state);
  };

  const Dispatch = useDispatch();

  const showReply = useSelector((store) => store.chat.showReply);
  const chatById = useSelector((store) => store.chat.chatById);

  const userStructureExecutor = useSelector(
    (store) => store.chat.userStructureExecutor
  );

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const [renderOfRole, setRenderOfRole] = useState();

  const renderRoleUsers = () => {
    if (
      accessLogin.login !== "f.kahhorzoda" &&
      accessLogin?.id === chatById[0]?.id
    ) {
      setRenderOfRole(true);
    } else {
      setRenderOfRole(false);
    }
  };

  // console.log(accessLogin?.id);
  // console.log(chatById[0]?.id);

  useEffect(() => {
    renderRoleUsers();
  }, [Dispatch, chatById, accessLogin]);

  return (
    <>
      <div
        className={`${
          showReply ? "h-[10%]" : "h-[20.2%]"
        } wrapper-input-message border-t-[1px] px-[30px] justify-center flex flex-col items-center gap-4`}
      >
        {renderOfRole && (
          <div className="panel-control flex items-center gap-5">
            <PanelTabVisa name="Упомянуть" handleShowTab={handleShowMention} />
            <PanelTabVisa
              name="Исполнитель"
              handleShowTab={handleShowExecutor}
            />
            <PanelTabVisa name="Виза" handleShowTab={handleShowVisa} />
            <PanelTabVisa
              name="К исполнению"
              handleShowTab={handleShowStatus}
            />
            <PanelTabVisa name="Срок" handleShowTab={handleShowTerm} />
          </div>
        )}

        {showReply && <ReplyMessage />}
        <InputMessage />
      </div>
      {executor && (
        <StructureOrganizationsExecutors
          executor={executor}
          setExecutor={setExecutor}
        />
      )}
    </>
  );
};

export default WrapperInputMessage;
