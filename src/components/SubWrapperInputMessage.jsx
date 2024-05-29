import React, { useState } from "react";
import SubInputMessage from "./SubInputMessage";
import InviteToSubChat from "./InviteToSubChat";
import { Button } from "@mui/material";

const SubWrapperInputMessage = () => {
  const [invite, setInvite] = useState(false);

  const handleModal = (state) => {
    setInvite(state);
  };

  return (
    <>
      <div className="wrapper-input-message border-t-[1px] p-[30px] justify-center flex flex-col items-center gap-4">
        <div className="panel-control flex items-center gap-5">
          <Button variant="contained">Упомянуть</Button>
          <Button onClick={() => handleModal(true)} variant="contained">
            Пригласить
          </Button>
        </div>
        <SubInputMessage />
      </div>
      {invite && <InviteToSubChat handleModal={handleModal} />}
    </>
  );
};

export default SubWrapperInputMessage;
