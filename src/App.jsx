import React, { useEffect, useState } from "react";
import "./App.css";

import TabVisa from "./components/TabVisa";
import AttachedDocuments from "./components/AttachedDocuments";
import StructureOrganizations from "./components/StructureOrganizations";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slices/chat-slice";

import ministerImg from "./imageUrl";

function App() {
  const Dispatch = useDispatch();

  const { setShowStructure } = actions;
  const showStructure = useSelector((store) => store.chat.showStructure);

  const handleClick = () => {
    Dispatch(setShowStructure(true));
  };

  return (
    <>
      <main className="flex">
        <aside className="left bg-[#f9f9f9] p-[20px] h-[100vh] flex flex-col justify-between">
          <div
            className={`${showStructure ? "blur-[3px]" : "none"} wrapperNo1`}
          >
            <div className="avatar flex items-center gap-5 mb-[30px]">
              <div className="wrapper-image w-[60px] h-[60px] rounded-[30px] overflow-hidden border-[1px] border-[#007cd2]">
                <img src={ministerImg} alt="" />
              </div>

              <div className="text">
                <p className="text-[#007cd2] font-bold">Каҳҳорзода Файзиддин</p>
                <p className="text-[#c0c9cb] text-[14px]">Министр Финансов</p>
              </div>
            </div>
            <div className="panel-control flex flex-col gap-5">
              <TabVisa
                show={handleClick}
                text="Исполнитель"
                Icon={<PersonIcon className="colorIcon text-[#007cd2]" />}
              />
              <TabVisa
                text="Виза"
                Icon={<AssignmentIcon className="colorIcon text-[#007cd2]" />}
              />
              <TabVisa
                text="Срок"
                Icon={<ScheduleIcon className="colorIcon text-[#007cd2]" />}
              />
              <fieldset className="tab-visa-select border-[#007cd2] border-[2px] rounded-lg p-[10px] text-[#007cd2] font-medium cursor-pointer">
                <select
                  name=""
                  id=""
                  className="bg-transparent outline-none  w-full cursor-pointer"
                >
                  <option value="">Назоратӣ</option>
                  <option value="">Фаврӣ</option>
                </select>
              </fieldset>
              <div className="wrapper-documents flex flex-col gap-2">
                <p className="text-[14px] text-[#007cd2] font-medium">
                  Вложенные документы
                </p>
                <div className="wrapper-list flex gap-4">
                  <AttachedDocuments document="https://1.downloader.disk.yandex.ru/preview/e63acdfb1606ea69a96599593d1e94186fc8ddaf10a01b295380eb3b3911ea3b/inf/YvXI8oa3ol13-dKHYZz5lQ9lZHCIlEdYNMhrGtjpoDaIovFam3-1LXaiSGuygLv2qkd8vuA3uiJzjJOyeK5Hhg%3D%3D?uid=1586284750&filename=Document%E2%84%961.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=1586284750&tknv=v2&size=1920x945" />
                  <AttachedDocuments document="https://1.downloader.disk.yandex.ru/preview/e63acdfb1606ea69a96599593d1e94186fc8ddaf10a01b295380eb3b3911ea3b/inf/YvXI8oa3ol13-dKHYZz5lQ9lZHCIlEdYNMhrGtjpoDaIovFam3-1LXaiSGuygLv2qkd8vuA3uiJzjJOyeK5Hhg%3D%3D?uid=1586284750&filename=Document%E2%84%961.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=1586284750&tknv=v2&size=1920x945" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${showStructure ? "blur-[3px]" : "none"} wrapperNo2`}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "normal",
                fontSize: "15px",
              }}
            >
              Визировать
            </Button>
          </div>
          {showStructure && <StructureOrganizations />}
        </aside>
        <aside className="right"></aside>
      </main>
    </>
  );
}

export default App;
