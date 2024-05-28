import React, { useState, useEffect } from "react";
import { IconButton, Avatar } from "@mui/material";

import { useDispatch } from "react-redux";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import MoreVertSubMessage from "./MoreVertSubMessage";

const SubMessageText = ({ item }) => {
  const Dispatch = useDispatch();

  const [showMoreVert, setShowMoreVert] = useState(false);

  const handleShowMoreVert = (event) => {
    event.stopPropagation();
    setShowMoreVert(!showMoreVert);
  };

  const handleCloseMoreVert = () => {
    setShowMoreVert(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseMoreVert);

    return () => {
      window.removeEventListener("click", handleCloseMoreVert);
    };
  }, [Dispatch]);

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  return (
    <li className="border-b-[1px] p-[30px] flex items-start justify-between">
      <div className="wrapper">
        <div className="wrapper-user flex items-center gap-2 mb-[15px]">
          <IconButton sx={{ padding: "0px" }}>
            <Avatar src={item.image} />
          </IconButton>
          <div className="wrapper-text">
            <div className="name-time flex items-center gap-2">
              <p className="cursor-pointer font-[500]">{item.name}</p>
              <p className="text-[14px] text-[#7b7b7b]">{item.dateTime}</p>
            </div>
            <p>{item.text}</p>
          </div>
        </div>
        <div className="wrapper-panel ml-[50px] flex gap-5 items-center">
          <IconButton sx={{ padding: "0" }}>
            <SaveAltIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ padding: "0" }}>
            <VolumeUpOutlinedIcon fontSize="small" />
          </IconButton>
          <div
            className="wrapper-certificate relative"
            onClick={(event) => event.stopPropagation()}
          >
            <IconButton
              onClick={() => {
                handleShowCertificate(item);
              }}
              sx={{ padding: "0" }}
            >
              <CheckCircleOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
      {item?.userAuthId === accessLogin.id && (
        <div className="panel-control relative">
          <IconButton onClick={(event) => handleShowMoreVert(event)}>
            <MoreVertIcon />
          </IconButton>
          {showMoreVert && <MoreVertSubMessage item={item} />}
        </div>
      )}
    </li>
  );
};

export default SubMessageText;
