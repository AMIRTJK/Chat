import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton, Button } from "@mui/material";

const SubConclusionEdsUsers = ({ handleShowConclusionEdsUsers }) => {
  const invitedToSubChatTabs = useSelector(
    (store) => store.chat.invitedToSubChatTabs
  );

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const subUserChatTabsById = useSelector(
    (store) => store.chat.subUserChatTabsById
  );

  const subTabConclusionList = useSelector(
    (store) => store.chat.subTabConclusionList
  );

  const users = useSelector((store) => store.chat.users);

  const filteredExecutor = users.filter(
    (e) => e.userAuthId === subUserChatTabsById[0]?.userAuthId
  );

  const filteredConclusionList =
    Array.isArray(subTabConclusionList) &&
    subTabConclusionList.filter(
      (e) =>
        subUserChatTabsById[0]?.id === e.subUserChatTabId &&
        e.userAuthId === accessLogin.id &&
        e.status === true
    );

  const handlePostSubTabConclusionListEds = (item) => {
    console.log(filteredConclusionList[0]);
    const newObj = {
      id: Date.now().toString(),
      subTabConclusionListId: filteredConclusionList[0]
        ? filteredConclusionList[0]?.id
        : null,
      userAuthId: item.userAuthId,
      edsStatus: false,
      name: item.name,
      role: item.role,
      image: item.image,
    };
    console.log(newObj);
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
            <li
              onClick={() =>
                handlePostSubTabConclusionListEds(filteredExecutor[0])
              }
              key={filteredExecutor[0]?.id}
              className="border-b-[1px] p-[10px] flex gap-5 items-center cursor-pointer hover:bg-[#f0f0f0] transition-all duration-100"
            >
              <IconButton sx={{ padding: "0px" }}>
                <Avatar src={filteredExecutor[0]?.image} />
              </IconButton>
              <div className="user-name flex flex-col">
                <p className="text-[#007cd2] font-[500]">
                  {filteredExecutor[0]?.name}
                </p>
                <p className="text-[#989898] text-[15px]">
                  {filteredExecutor[0]?.role}
                </p>
              </div>
            </li>
            {Array.isArray(invitedToSubChatTabs) &&
              invitedToSubChatTabs.map((e) => {
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
