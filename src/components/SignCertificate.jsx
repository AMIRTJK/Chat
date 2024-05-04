import React from "react";

const SignCertificate = ({ showCertificate }) => {
  const date = new Date();

  const dateCertificate = (currentlyOrFutureYear) => {
    let day = ("0" + date.getDate()).slice(-2); // День
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Месяц
    let year = date.getFullYear() + currentlyOrFutureYear; // Год
    let formattedDate = day + "." + month + "." + year;
    return formattedDate;
  };

  return (
    <main className="absolute bg-[#fff] border-[1px] border-[#0008] shadow-sm z-10 top-0 min-w-[280px] left-[100%] p-[10px]">
      <div className="wrapper-content flex items-center border-[2px] border-[blue] border-dashed p-[10px]">
        <div className="wrapper-text text-[9px] font-bold">
          <p>Сертификат: {showCertificate?.id}</p>
          <p>ФИО: {showCertificate?.name}</p>
          <p>Действителен: {dateCertificate(1)}</p>
          <p>Дата подписи: {dateCertificate(0)}</p>
        </div>
      </div>
    </main>
  );
};

export default SignCertificate;
