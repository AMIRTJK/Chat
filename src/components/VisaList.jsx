import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { putVisaStatus } from "../actions/chatApi";

const VisaList = ({ name, item }) => {
  const Dispatch = useDispatch();

  const handlePutVisaStatus = (newObj, event) => {
    event.preventDefault();
    Dispatch(putVisaStatus(newObj));
  };

  const newObj = {
    id: item.id,
    name: item.name,
    status: !item.status,
  };

  return (
    <div
      onClick={(event) => handlePutVisaStatus(newObj, event)}
      className={`${
        item.status ? "bg-[#e8e8e8]" : ""
      } list border-b-[1px] p-[15px] hover:bg-[#e8e8e8] cursor-pointer flex items-center justify-between`}
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

export default VisaList;
