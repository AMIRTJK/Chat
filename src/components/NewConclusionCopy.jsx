import React from "react";
import { Button } from "@mui/material";

const NewConclusionCopy = ({
  handleShowNewConclusionOfCopy,
  handlePostSubTabConclusionListTemp,
  handlePostSubTabConclusionListEdsTemp,
}) => {
  return (
    <main
      onClick={() => handleShowNewConclusionOfCopy(false)}
      className="w-full h-full z-10 fixed top-0 left-0 flex justify-center items-center"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="new-conclusion-copy border-[1px] absolute bg-[#fff] py-[15px] px-[30px] shadow-lg flex flex-col items-center gap-2"
      >
        <p className="text-[15px]">Создать новую версию</p>
        <div className="wrapper-buttons flex gap-3">
          <Button
            onClick={() => handlePostSubTabConclusionListTemp()}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Создать
          </Button>
          <Button
            onClick={() => handlePostSubTabConclusionListEdsTemp()}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NewConclusionCopy;
