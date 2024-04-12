import React from "react";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deleteUserChats } from "../actions/chatApi";

import { useDispatch } from "react-redux";

const MoreVert = ({ id }) => {
  const Dispatch = useDispatch();

  return (
    <div className="wrapper absolute bg-[#fff] shadow-lg border-[1px] rounded-lg overflow-hidden right-0 z-10">
      <ul>
        <li className="min-w-[150px] hover:bg-[#f0f0f0] p-[10px] flex items-center gap-2">
          <PushPinOutlinedIcon className="text-[#3a3a3a]" fontSize="small" />
          <p className="text-[15px] text-[#3a3a3a] font-[500]">Закрепить</p>
        </li>
        <li
          onClick={() => {
            Dispatch(deleteUserChats(id));
          }}
          className="min-w-[150px] hover:bg-[#f0f0f0] p-[10px] flex items-center gap-2"
        >
          <DeleteOutlinedIcon className="text-[#3a3a3a]" fontSize="small" />{" "}
          <p className="text-[15px] text-[#3a3a3a] font-[500]">Удалить</p>
        </li>
      </ul>
    </div>
  );
};

export default MoreVert;
