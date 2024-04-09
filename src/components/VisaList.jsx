import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postVisaListTemp, deleteVisaListTemp } from "../actions/chatApi";

const VisaList = ({ name, item, deleteItem }) => {
  const Dispatch = useDispatch();

  const visaListTemp = useSelector((store) => store.chat.visaListTemp);

  const handlePostVisaStatus = (newObj, event) => {
    event.preventDefault();
    Dispatch(postVisaListTemp(newObj));
  };

  const handleDeleteVisaStatus = (id, event) => {
    event.stopPropagation();
    Dispatch(deleteVisaListTemp(id));
  };

  const newObj = {
    id: item.id,
    name: item.name,
    status: true,
  };

  const isActive =
    Array.isArray(visaListTemp) &&
    visaListTemp.some((e) => e.id === item.id && e.status === true);

  return (
    <div
      onClick={(event) => {
        handlePostVisaStatus(newObj, event);
      }}
      className={`${
        isActive ? "bg-[#e8e8e8]" : ""
      } list border-b-[1px] border-b-[#00000020] p-[15px] hover:bg-[#e8e8e8] cursor-pointer flex items-center justify-between`}
    >
      <div className="wrapper-info flex items-center gap-2">
        <AssignmentIcon className="text-[#007cd2]" />
        <p>{name}</p>
      </div>
      <div className="panel-control">
        <IconButton
          onClick={(event) => handleDeleteVisaStatus(deleteItem.id, event)}
        >
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

export default VisaList;
