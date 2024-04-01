import React from "react";

const AttachedDocuments = ({ document }) => {
  return (
    <div className="documents border-[1px] relative border-[#007cd2] h-[50px] w-[70px] rounded-lg overflow-hidden cursor-pointer">
      <img src={document} alt="" className="w-full h-full" />
    </div>
  );
};

export default AttachedDocuments;
