import React, { useEffect } from "react";

import { getMessageById } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";

const BodyMessages = () => {
  const Dispatch = useDispatch();
  const messageById = useSelector((store) => store.chat.messageById);

  useEffect(() => {
    getMessageById();
  }, [Dispatch]);

  console.log(messageById);

  return (
    <div className="h-[74%] p-[30px]">
      <p>{messageById[0]?.text}</p>
    </div>
  );
};

export default BodyMessages;
