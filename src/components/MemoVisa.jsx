import React from "react";

import { useSelector } from "react-redux";

const MemoVisa = ({
  item,
  userChats,
  visaListTemp,
  termDate,
  visaStatusTemp,
}) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const fullName = item && item[0]?.name.split(" ");

  const emblem = "https://i.ibb.co/xCjbnnw/emblem.png";

  const termDateObj = termDate[termDate.length - 1];
  const visaStatusTempObj = visaStatusTemp[visaStatusTemp.length - 1];

  const showUserChat = useSelector((store) => store.chat.showUserChat);

  return (
    <div className="wrapper w-full border-[2px] p-[15px] rounded-lg flex flex-col gap-4">
      <header className="flex flex-col items-center gap-2">
        <img src={emblem} alt="" className="w-[33%]" />
        <h1 className="uppercase text-center text-[#345581] font-semibold">
          Вазири молияи Чумхурии Точикистон
        </h1>
      </header>
      <main className="flex flex-col items-center gap-2">
        {Array.isArray(userChats) &&
          userChats.map((e) => {
            return (
              <p key={e.id} className="font-semibold">
                {e.name}
              </p>
            );
          })}
        {visaListTemp.map((e) => {
          return (
            <p key={e.id} className="text-center">
              {e.name}
            </p>
          );
        })}
        {termDateObj && (
          <p>
            <strong>До:</strong> {termDateObj?.date}
          </p>
        )}
        {visaStatusTempObj && (
          <p>
            <strong>Статус:</strong> {visaStatusTempObj?.status}
          </p>
        )}
      </main>
      <footer className="flex flex-col gap-2">
        <div className="wrapper-signature flex justify-end">
          <div className="signature flex flex-col">
            <p className="hover:text-[#ff0000] cursor-pointer">
              {showUserChat ? "Подпись" : "Нет подписи"}
            </p>
            <p className="font-semibold text-[#345581]">
              {Array.isArray(fullName) && fullName[0][0]}.
              {Array.isArray(fullName) && fullName[1]}
            </p>
          </div>
        </div>
        <div className="term flex gap-2">
          <p className="underline text-[#345581] font-semibold">«{day}»</p>
          <p className="underline text-[#345581] font-semibold">
            &emsp;&emsp;&emsp;{month}&emsp;&emsp;&emsp;
          </p>
          <p className="text-[#345581] font-semibold">{year}c.</p>
        </div>
      </footer>
    </div>
  );
};

export default MemoVisa;
