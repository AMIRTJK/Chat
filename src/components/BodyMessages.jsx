import React, { useEffect } from "react";

import { getMessageById } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";

import MessageText from "./MessageText";

const BodyMessages = () => {
  const Dispatch = useDispatch();
  const messageById = useSelector((store) => store.chat.messageById);
  const chatById = useSelector((store) => store.chat.chatById);

  useEffect(() => {
    getMessageById();
  }, [Dispatch]);

  return (
    <div className="category-scrollbar h-[74%] overflow-auto">
      <ul>
        {Array.isArray(messageById) &&
          messageById.map((e) => {
            return <MessageText key={e.id} item={e} />;
          })}
      </ul>
    </div>
  );
};

export default BodyMessages;
