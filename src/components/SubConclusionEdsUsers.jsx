import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton, Button } from "@mui/material";
import {
  postSubTabConclusionListEds,
  postSubTabConclusionListEdsTemp,
} from "../actions/chatApi";

const SubConclusionEdsUsers = ({
  handleShowConclusionEdsUsers,
  filteredExecutor,
  filteredConclusionListCurrent,
  filteredConclusionListTemp,
}) => {
  const Dispatch = useDispatch();

  const invitedToSubChatTabs = useSelector(
    (store) => store.chat.invitedToSubChatTabs
  );

  // const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );

  // const subTabConclusionList = useSelector(
  //   (store) => store.chat.subTabConclusionList
  // );

  const handlePostSubTabConclusionListEds = (item) => {
    const newObj = {
      id: Date.now().toString(),
      subTabConclusionListId: filteredConclusionListCurrent[0]
        ? filteredConclusionListCurrent[0]?.id
        : null,
      userAuthId: item.userAuthId,
      comments: "",
      status: false,
      edsStatus: false,
      name: item.name,
      role: item.role,
      image: item.image,
      subTabConclusionListTempId: filteredConclusionListTemp[0]?.id,
    };
    Dispatch(postSubTabConclusionListEdsTemp(newObj));
  };

  return (
    <div
      onClick={() => handleShowConclusionEdsUsers(false)}
      className="w-full h-full fixed top-0 left-0 z-10"
    >
      <main
        onClick={(event) => event.stopPropagation()}
        className="bg-[#fff] shadow-lg border-[1px] absolute translate-x-[-25%] translate-y-[-50%] top-1/2 left-1/2"
      >
        <p className="p-[10px] font-[600] text-center">Добавить участников</p>
        <form>
          <ul>
            {Array.isArray(invitedToSubChatTabs) &&
              invitedToSubChatTabs.map((e) => {
                if (subUserChatTabsById[0]?.id === e.subUserChatTabId) {
                  return (
                    <li
                      onClick={() => handlePostSubTabConclusionListEds(e)}
                      key={e.id}
                      className="border-b-[1px] p-[10px] flex gap-5 items-center cursor-pointer hover:bg-[#f0f0f0] transition-all duration-100"
                    >
                      <IconButton sx={{ padding: "0px" }}>
                        <Avatar src={e.image} />
                      </IconButton>
                      <div className="user-name flex flex-col">
                        <p className="text-[#007cd2] font-[500]">{e.name}</p>
                        <p className="text-[#989898] text-[15px]">{e.role}</p>
                      </div>
                    </li>
                  );
                }
              })}
          </ul>
          <div className="panel-control flex justify-end p-[10px]">
            <div className="wrapper-buttons flex items-center gap-5">
              <Button
                onClick={() => handleShowConclusionEdsUsers(false)}
                variant="text"
                sx={{ textTransform: "none" }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => handleShowConclusionEdsUsers(false)}
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "400" }}
              >
                Добавить
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SubConclusionEdsUsers;
