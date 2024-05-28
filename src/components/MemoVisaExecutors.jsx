import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVisaMessage } from "../actions/chatApi";

const MemoVisaExecutors = () => {
  const visaUsers = useSelector((store) => store.chat.visaUsers);
  const chatById = useSelector((store) => store.chat.chatById);
  const subUserChats = useSelector((store) => store.chat.subUserChats);
  const visaMessage = useSelector((store) => store.chat.visaMessage);

  const Dispatch = useDispatch();

  // const date = new Date();
  // const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();

  // const fullName = item && item[0]?.name.split(" ");

  const emblem = "https://i.ibb.co/xCjbnnw/emblem.png";

  // const termDateObj = termDate[termDate.length - 1];
  // const visaStatusTempObj = visaStatusTemp[visaStatusTemp.length - 1];

  const [visaUser, setVisaUser] = useState({});

  const tempVisaUser = () => {
    visaUsers.forEach((e) => {
      if (e.id === chatById[0].id) {
        setVisaUser(e);
      }
    });
  };

  useEffect(() => {
    tempVisaUser();
    Dispatch(getVisaMessage());
  }, [Dispatch]);

  const date = visaUser?.createdAt?.split("-");

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className="wrapper w-[25%] fixed bg-[#fff] z-10 shadow-lg left-[36%]  border-[2px] p-[15px] rounded-lg flex flex-col gap-4"
    >
      <header className="flex flex-col items-center gap-2">
        <img src={emblem} alt="" className="w-[33%]" />
        <h1 className="uppercase text-center text-[#345581] font-semibold">
          Вазири молияи Чумхурии Точикистон
        </h1>
      </header>
      <main className="flex flex-col items-center gap-2">
        {subUserChats.map((e) => {
          if (e.userChatId === chatById[0]?.id) {
            return (
              <p key={e.id} className="font-semibold">
                {e.name}
              </p>
            );
          }
        })}
        {visaMessage.map((e) => {
          if (e.visaUserId === chatById[0]?.id) {
            return (
              <p key={e.id} className="text-center">
                {e.name}
              </p>
            );
          }
        })}

        <p>До: {visaUser.term}</p>
        <p>Статус: {visaUser.status}</p>
      </main>
      <footer className="flex flex-col gap-2">
        <div className="wrapper-signature flex justify-end">
          <div className="signature flex flex-col">
            <p className="hover:text-[#ff0000] cursor-pointer">
              {visaUser.eds ? "Подпись" : "Нет подписи"}
            </p>
            <p className="font-semibold text-[#345581]">
              {chatById[0]?.name}
              {/* {Array.isArray(fullName) && fullName[0][0]}.
              {Array.isArray(fullName) && fullName[1]} */}
            </p>
          </div>
        </div>
        <div className="term flex gap-2">
          <p className="underline text-[#345581] font-semibold">
            «{Array.isArray(date) && date[0]}»
          </p>
          <p className="underline text-[#345581] font-semibold">
            &emsp;&emsp;&emsp;{Array.isArray(date) && date[1]}&emsp;&emsp;&emsp;
          </p>
          <p className="text-[#345581] font-semibold">
            {Array.isArray(date) && date[2]}c.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MemoVisaExecutors;
