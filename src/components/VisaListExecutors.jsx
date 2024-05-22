import React, { useState, useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getVisaMessage, postVisaMessage, putVisaMessage } from "../actions/chatApi";

const VisaListExecutors = ({ name, item }) => {
  const Dispatch = useDispatch();

  const visaListTemp = useSelector((store) => store.chat.visaListTemp);
  const visaUsers = useSelector((store) => store.chat.visaUsers);
  const visaMessage = useSelector((store) => store.chat.visaMessage);
  const chatById = useSelector((store) => store.chat.chatById);

  const handlePostVisaStatus = (clickedItem, event) => {
    const newObj = {
      id: clickedItem.id,
      name: clickedItem.name,
      status: true,
      visaUserId: chatById[0].id,
    };

    event.preventDefault();
    Dispatch(postVisaMessage(newObj));
  };

  useEffect(() => {
    Dispatch(getVisaMessage());
  }, []);

  return (
    <div
      onClick={(event) => {
        handlePostVisaStatus(item, event);
      }}
      className="list border-b-[1px] border-b-[#00000020] p-[15px] hover:bg-[#e8e8e8] cursor-pointer flex items-center justify-between"
    >
      <div className="wrapper-info flex items-center gap-2">
        <AssignmentIcon className="text-[#007cd2]" />
        <p>{name}</p>
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
