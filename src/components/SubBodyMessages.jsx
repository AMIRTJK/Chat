import React, { useEffect } from "react";
import { getSubMessages } from "../actions/chatApi";
import SubMessageText from "./SubMessageText";
import { useSelector, useDispatch } from "react-redux";

const SubBodyMessages = () => {
  const subChatById = useSelector((store) => store.chat.subChatById);
  const subMessages = useSelector((store) => store.chat.subMessages);

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getSubMessages());
  }, []);

  console.log(subChatById);

  return (
    <main className="category-scrollbar h-[69vh] overflow-auto relative">
      <ul>
        {subMessages.map((e) => {
          if (subChatById[0]?.userAuthId === e.subUserChatId) {
            return <SubMessageText key={e.id} item={e} />;
          }
        })}
      </ul>
    </main>
  );
};

export default SubBodyMessages;
