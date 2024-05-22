import React, { useState, useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getVisaMessage, postVisaMessage } from "../actions/chatApi";

const VisaListExecutors = ({ item }) => {
  const Dispatch = useDispatch();

  const visaListTemp = useSelector((store) => store.chat.visaListTemp);
  const visaMessage = useSelector((store) => store.chat.visaMessage);
  const visaUsers = useSelector((store) => store.chat.visaUsers);
  const chatById = useSelector((store) => store.chat.chatById);

  const defaultVisa = useSelector((store) => store.chat.defaultVisa);
  const ownVisa = useSelector((store) => store.chat.ownVisa);

  const handlePostVisaStatus = (clickedItem) => {
    const newObj = {
      id: clickedItem.id,
      name: clickedItem.name,
      status: true,
      visaUserId: chatById[0].id,
    };

    Dispatch(postVisaMessage(newObj));
  };

  useEffect(() => {
    Dispatch(getVisaMessage());
  }, []);

  const isActive =
    Array.isArray(visaMessage) &&
    visaMessage.some((e) => e.id === item.id && e.status === true);

  return (
    <div
      onClick={() => {
        handlePostVisaStatus(item);
      }}
      className={`${
        isActive ? "bg-[#e8e8e8]" : ""
      } list border-b-[1px] border-b-[#00000020] p-[15px] hover:bg-[#e8e8e8] cursor-pointer flex items-center justify-between`}
    >
      <div className="wrapper-info flex items-center gap-2">
        <AssignmentIcon className="text-[#007cd2]" />
        <p>{item.name}</p>
      </div>
      <div className="panel-control">
        <IconButton>
          <DeleteIcon
            sx={{
              ":hover": {
                color: "red",
              },
              transition: "all 0.1s",
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default VisaListExecutors;
