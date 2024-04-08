import React, { useEffect } from "react";
import VisaList from "./VisaList";
import { Button } from "@mui/material";
import { getVisaList, getVisaListTemp } from "../actions/chatApi";
import { useSelector, useDispatch } from "react-redux";

const VisaModal = ({ handleShowVisa }) => {
  const Dispatch = useDispatch();

  const visaList = useSelector((store) => store.chat.visaList);
  const visaListTemp = useSelector((store) => store.chat.visaListTemp);

  const handlePropagation = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    Dispatch(getVisaList());
    Dispatch(getVisaListTemp());
  }, []);

  console.log(visaListTemp);

  let newObj = null;

  Array.isArray(visaListTemp) &&
    visaListTemp.map((e) => {
      return (newObj = e);
    });

  console.log(newObj);

  return (
    <div
      onClick={() => handleShowVisa(false)}
      className="modal fixed w-full h-full bg-transparent"
    >
      <div
        onClick={(event) => handlePropagation(event)}
        className="modal-content overflow-hidden shadow-lg border-[1px] w-[20%] rounded-lg absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      >
        <header className="p-[15px] bg-[#007cd2]">
          <h1 className="text-center text-[#f9f9f9] text-[18px]">
            Выбрать визу
          </h1>
        </header>
        <main className="bg-[#f9f9f9] overflow-auto h-[30vh]">
          {Array.isArray(visaList) &&
            visaList.map((e) => {
              return (
                <VisaList
                  key={e.id}
                  name={e.name}
                  item={e}
                  deleteItem={newObj}
                />
              );
            })}
        </main>
        <footer className="bg-[#007cd2] flex justify-center items-center py-[10px]">
          <Button
            onClick={() => handleShowVisa(false)}
            variant="outlined"
            sx={{
              border: "1px solid #f9f9f9",
              color: "#f9f9f9",
              "&:hover": {
                bgcolor: "#f9f9f9",
                border: "1px solid #f9f9f9",
                color: "#007cd2",
              },
            }}
          >
            Добавить
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default VisaModal;
