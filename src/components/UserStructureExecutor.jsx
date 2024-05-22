import React from "react";
import { IconButton } from "@mui/material";

const UserStructureExecutor = ({
  item,
  userId,
  userImage,
  userName,
  userPosition,
  userStatus,
  userLogin,
  userAuthId,
  handleGetUser,
  handlePostUser,
}) => {
  return (
    <div className="wrapper-user mt-[50px] flex flex-col items-center">
      <IconButton
        onClick={() =>
          handlePostUser({
            id: userId,
            name: userName,
            role: userPosition,
            image: userImage,
            status: userStatus,
            login: userLogin,
            userAuthId: userAuthId,
          })
        }
      >
        <div className="wrapper-image w-[90px] relative h-[90px] rounded-[45px] overflow-hidden mb-[20px] border-[3px] border-[transparent] hover:border-[#007cd2] cursor-pointer transition-all duration-100">
          <img src={userImage} alt="" />
        </div>
      </IconButton>
      <div className="wrapper-info bg-[#fff] min-w-[250px] px-[15px] py-[5px] rounded-lg text-center">
        <p className="text-[#007cd2] font-bold">{userName}</p>
        <p className="text-[#3E3E3E] text-[14px] font-semibold">
          {userPosition}
        </p>
      </div>
    </div>
  );
};

export default UserStructureExecutor;
