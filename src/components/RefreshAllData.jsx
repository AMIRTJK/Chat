import React from "react";

const RefreshAllData = ({ handleShowRefreshModal, refreshAllData }) => {
  return (
    <main className="w-full h-full fixed bg-[#00000030] left-0 top-0 z-10">
      <div className="content w-[30%] absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 bg-[#fff] rounded-[20px] shadow-sm border-[1px]">
        <div className="title p-[20px] border-b-[1px]">
          <h1 className="text-[20px] font-medium">Очистить данные?</h1>
        </div>
        <div className="info p-[20px]">
          <p>
            При нажатии на кнопку удалить все данные очистятся и процесс
            начнется с нуля.
          </p>
        </div>
        <div className="panel-control p-[20px] flex justify-end">
          <div className="buttons flex gap-5">
            <button
              onClick={() => handleShowRefreshModal(false)}
              className="bg-[#fff] py-[10px] px-[15px] rounded-[25px] border-[1px] hover:bg-[#f3f2f2] transition-all duration-100"
            >
              Отменить
            </button>
            <button
              onClick={refreshAllData}
              className="bg-[#EF4444] py-[10px] px-[15px] rounded-[25px] text-[#fff] border-[1px] hover:bg-[#b91c1c] transition-all duration-100"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RefreshAllData;
