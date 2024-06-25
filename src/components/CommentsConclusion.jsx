import React, { useState } from "react";
import { Button } from "@mui/material";

const CommentsConclusion = ({
  handleShowCommentsConclusion,
  handlePutSubTabConclusionListEds,
}) => {
  const [value, setValue] = useState("");

  return (
    <div
      onClick={() => handleShowCommentsConclusion(false)}
      className="fixed w-full h-full top-0 left-0 z-10"
    >
      <form
        onClick={(event) => event.stopPropagation()}
        className="absolute bg-[#fff] flex flex-col gap-5 w-[30%] shadow-lg border-[1px] translate-x-[-25%] translate-y-[-50%] top-1/2 left-1/2 p-[20px]"
      >
        <p className="font-[600]">Комментарии к заключению</p>
        <input
          onChange={(event) => setValue(event.target.value)}
          value={value}
          type="text"
          placeholder="Введите название комментарий"
          className="border-b-[1px] border-[#000] outline-none"
        />
        <div className="wrapper-buttons flex justify-end">
          <div className="buttons flex gap-5">
            <Button
              onClick={() => handleShowCommentsConclusion(false)}
              variant="text"
              sx={{ textTransform: "none" }}
            >
              Отмена
            </Button>
            <Button
              onClick={() => handlePutSubTabConclusionListEds(value)}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentsConclusion;
