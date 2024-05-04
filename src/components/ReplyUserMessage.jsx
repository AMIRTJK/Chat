import React from "react";

export const ReplyUserMessage = ({ item }) => {
  return (
    <div className="wrapper w-full bg-[#0000001a] p-[10px] rounded-md border-l-[10px] border-[#0000001a] mb-[10px]">
      <p className="font-semibold text-[#000000a0]">{item.replyMessage.name}</p>
      <p className="text-[#000000a0]">{item.replyMessage.text}</p>
    </div>
  );
};
