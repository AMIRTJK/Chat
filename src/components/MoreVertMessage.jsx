import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deleteMessageById } from "../actions/chatApi";
import { useDispatch } from "react-redux";
const MoreVertMessage = ({ item }) => {
  const Dispatch = useDispatch();
  return (
    <div className="wrapper absolute bg-[#fff] shadow-lg border-[1px] rounded-lg overflow-hidden right-0 z-10">
      <ul>
        <li className="min-w-[150px] hover:bg-[#f0f0f0] p-[10px] flex items-center gap-2 cursor-pointer">
          <EditOutlinedIcon className="text-[#3a3a3a]" fontSize="small" />
          <p className="text-[15px] text-[#3a3a3a] font-[500]">Изменить</p>
        </li>
        <li
          onClick={() => {
            Dispatch(deleteMessageById(item));
          }}
          className="min-w-[150px] hover:bg-[#f0f0f0] p-[10px] flex items-center gap-2 cursor-pointer"
        >
          <DeleteOutlinedIcon className="text-[#3a3a3a]" fontSize="small" />{" "}
          <p className="text-[15px] text-[#3a3a3a] font-[500]">Удалить</p>
        </li>
      </ul>
    </div>
  );
};

export default MoreVertMessage;
