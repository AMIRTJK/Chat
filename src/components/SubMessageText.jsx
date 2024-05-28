import React from "react";
import { IconButton, Avatar } from "@mui/material";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const SubMessageText = ({ item }) => {
  console.log(item);

  return (
    <li className="border-b-[1px] p-[30px] flex items-start justify-between">
      <div className="wrapper">
        <div className="wrapper-user flex items-center gap-2 mb-[15px]">
          <IconButton sx={{ padding: "0px" }}>
            <Avatar src={item.image} />
          </IconButton>
          <div className="wrapper-text">
            <div className="name-time flex items-center gap-2">
              <p className="cursor-pointer font-[500]">{item.text}</p>
              <p className="text-[14px] text-[#7b7b7b]">27.05.2024</p>
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
      <div className="panel-control relative"></div>
    </li>
  );
};

export default SubMessageText;
