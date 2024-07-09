import React from "react";

import { Avatar, IconButton, Button } from "@mui/material";

import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

const ConclusionEnd = ({ user, creatorEndingConclusion, date }) => {
  return (
    <li className="border-b-[1px] p-[30px] flex items-start justify-between">
      <div className="wrapper">
        <div className="wrapper-user flex items-center gap-2">
          <IconButton sx={{ padding: "0px" }}>
            <Avatar src={user?.image} />
          </IconButton>
          <div className="wrapper-text">
            <div className="name-time flex items-center gap-2">
              <p className="cursor-pointer font-[500]">{user?.name}</p>
              <p className="text-[14px] text-[#7b7b7b]">{date}</p>
            </div>
            <p className="text-[#345581] font-medium">
              {creatorEndingConclusion?.title}
            </p>
          </div>
        </div>
        <div className="wrapper-panel ml-[40px] flex gap-5 items-center">
          <Button sx={{ display: "flex", gap: "5px", textTransform: "none" }}>
            <FindInPageOutlinedIcon />
            <p>Посмотреть</p>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default ConclusionEnd;
