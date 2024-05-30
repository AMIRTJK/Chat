import React, { useEffect, useState } from "react";

import { getMessageById, getVisaUsers } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";

import MessageText from "./MessageText";

import { ToastContainer } from "react-toastify";


import VisaModalExecutors from "./VisaModalExecutors";

const BodyMessages = () => {
  const Dispatch = useDispatch();
  const messageById = useSelector((store) => store.chat.messageById);
  const visaUsers = useSelector((store) => store.chat.visaUsers);

  const executorVisa = useSelector((store) => store.chat.executorVisa);

  useEffect(() => {
    Dispatch(getMessageById());
    Dispatch(getVisaUsers());
  }, [Dispatch]);

  // console.log(visaUsers);

  return (
    <div className="category-scrollbar h-[69vh] overflow-auto relative">
   
      <ToastContainer />
      <ul>
        {Array.isArray(messageById) &&
          messageById.map((e) => {
            return <MessageText key={e.id} item={e} />;
          })}
      </ul>
      {executorVisa && <VisaModalExecutors />}
    </div>
  );
};

export default BodyMessages;
