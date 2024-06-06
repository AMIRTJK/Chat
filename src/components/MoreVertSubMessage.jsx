import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deleteSubMessage } from "../actions/chatApi";
import { useDispatch } from "react-redux";

const MoreVertSubMessage = ({ item }) => {
  const Dispatch = useDispatch();

  const handleDeleteSubMessage = (id) => {
    Dispatch(deleteSubMessage(id));
  };

  return (
    <div className="wrapper absolute bg-[#fff] shadow-lg border-[1px] rounded-lg overflow-hidden right-0 z-10">
      <ul>
        <li className="min-w-[150px] hover:bg-[#f0f0f0] p-[10px] flex items-center gap-2 cursor-pointer">
          <EditOutlinedIcon className="text-[#3a3a3a]" fontSize="small" />
          <p className="text-[15px] text-[#3a3a3a] font-[500]">Изменить</p>
        </li>
        <li
          onClick={() => {
            handleDeleteSubMessage(item.id);
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

export default MoreVertSubMessage;
