import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slices/chat-slice";

import PanelTabVisa from "./PanelTabVisa";
import InputMessage from "./InputMessage";
import ReplyMessage from "./ReplyMessage";
import StructureOrganizationsExecutors from "./StructureOrganizationsExecutors";

import { getVisaUsers } from "../actions/chatApi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WrapperInputMessage = () => {
  const { setShowSend, setExecutorVisa } = actions;
  const showSend = useSelector((store) => store.chat.showSend);
  const visaUsers = useSelector((store) => store.chat.visaUsers);

  const handleShowMention = (value) => {
    Dispatch(setShowSend("@"));
  };
  const handleShowExecutor = (state) => {
    setExecutor(state);
  };

  const handleShowVisa = (state) => {
    Dispatch(setExecutorVisa(state));
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

  const notify = () => {
    toast.info("Виза не создана. Создайте визу!", {
      position: "top-right",
    });
  };

  const [showStructure, setShowStructure] = useState(false);

  const handleShowStructure = (state) => {
    setShowStructure(state);
  };

  useEffect(() => {
    renderRoleUsers();
  }, [Dispatch, chatById, accessLogin]);

  useEffect(() => {
    getVisaUsers();
  }, [Dispatch]);

  return (
    <>
      <div
        className={`${
          showReply ? "h-[15%]" : "h-[20.2%]"
        } wrapper-input-message bg-[#fff] border-t-[1px] px-[30px] justify-center flex flex-col items-center gap-4`}
      >
        {renderOfRole && (
          <div className="panel-control flex items-center gap-5">
            {/* <PanelTabVisa name="Упомянуть" handleShowTab={handleShowMention} /> */}
            <PanelTabVisa
              name="Пригласить"
              handleShowTab={handleShowStructure}
            />
          </div>
        )}

        {showReply && <ReplyMessage />}
        <InputMessage />
      </div>
      {showStructure && (
        <StructureOrganizationsExecutors
          handleShowStructure={handleShowStructure}
        />
      )}
    </>
  );
};

export default WrapperInputMessage;
