import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../slices/chat-slice";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreVertMessage from "./MoreVertMessage";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
import Tooltip from "@mui/material/Tooltip";
import SignCertificate from "./SignCertificate";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReplyUserMessage } from "./ReplyUserMessage";

const MessageText = ({ item }) => {
  const users = useSelector((store) => store.chat.users);
  const showCertificate = useSelector((store) => store.chat.showCertificate);

  const [showMoreVert, setShowMoreVert] = useState(false); // Локальное состояние для каждого ChatUser
  const [stateCertificate, setStateCertificate] = useState(false); // Локальное состояние для каждого ChatUser

  const handleShowMoreVert = (event) => {
    event.stopPropagation();
    setShowMoreVert(!showMoreVert);
  };

  let sender = null;

  users.forEach((e) => {
    if (item.userAuthId === e.userAuthId) {
      sender = {
        ...e,
      };
    }
  });

  const accessLogin = JSON.parse(localStorage.getItem("accessLogin"));

  const Dispatch = useDispatch();

  const { setShowReply, setGetReplyMessage, setShowCertificate } = actions;

  const handleGetReplyMessage = (clickedItem) => {
    if (clickedItem.userAuthId === sender.userAuthId) {
      const { name } = sender;

      Dispatch(setShowReply(true));
      Dispatch(setGetReplyMessage({ name, ...clickedItem }));
    }
  };

  const showToastMessage = () => {
    toast.success("Успешно скопировано!", {
      position: "top-right",
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Текст скопирован в буфер обмена");
    } catch (err) {
      console.error("Ошибка при копировании текста: ", err);
    }
  };

  const handleShowCertificate = (clickedItem) => {
    if (sender.userAuthId === clickedItem.userAuthId) {
      setStateCertificate(!stateCertificate);
      Dispatch(setShowCertificate({ ...sender, ...clickedItem }));
    }
  };

  const handleCloseCertificate = () => {
    Dispatch(setShowCertificate(null));
    setStateCertificate(false);
  };

  const handleCloseMoreVert = () => {
    setShowMoreVert(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseCertificate);
    window.addEventListener("click", handleCloseMoreVert);

    return () => {
      window.removeEventListener("click", handleCloseCertificate);
      window.removeEventListener("click", handleCloseMoreVert);
    };
  }, [Dispatch]);

  return (
    <>
      <li className="border-b-[1px] p-[30px] flex items-start justify-between">
        <div className="wrapper">
          {Object.keys(item.replyMessage).length > 0 ? (
            <ReplyUserMessage item={item} />
          ) : null}
          <div className="wrapper-user flex items-center gap-2 mb-[15px]">
            <IconButton sx={{ padding: "0px" }}>
              <Avatar src={sender.image} />
            </IconButton>
            <div className="wrapper-text">
              <div className="name-time flex items-center gap-2">
                <p className="cursor-pointer font-[500]">{sender.name}</p>
                <p className="text-[14px] text-[#7b7b7b]">
                  {item.userAuthId === sender.userAuthId ? item.dateTime : ""}
                </p>
              </div>
              <p>{item?.text}</p>
            </div>
          </div>
          <div className="wrapper-panel ml-[50px] flex gap-5 items-center">
            <IconButton
              sx={{ padding: "0" }}
              onClick={() => {
                showToastMessage();
                copyToClipboard(item.text);
              }}
            >
              <Tooltip title="Скопировать">
                <ContentCopyIcon fontSize="small" />
              </Tooltip>
            </IconButton>

            <IconButton sx={{ padding: "0" }}>
              <SaveAltIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ padding: "0" }}>
              <VolumeUpOutlinedIcon fontSize="small" />
            </IconButton>
            <div
              className="wrapper-certificate relative"
              onClick={(event) => event.stopPropagation()}
            >
              <IconButton
                onClick={() => {
                  handleShowCertificate(item);
                }}
                sx={{ padding: "0" }}
              >
                <CheckCircleOutlineOutlinedIcon fontSize="small" />
              </IconButton>
              {stateCertificate && (
                <SignCertificate showCertificate={showCertificate} />
              )}
            </div>
            <IconButton
              sx={{ padding: "0" }}
              onClick={() => handleGetReplyMessage(item)}
            >
              <Tooltip title="Ответить">
                <ShortcutOutlinedIcon
                  fontSize="small"
                  className="transform rotate-180"
                />
              </Tooltip>
            </IconButton>
          </div>
        </div>
        {sender.userAuthId === accessLogin.id && (
          <div className="panel-control relative">
            <IconButton onClick={(event) => handleShowMoreVert(event)}>
              <MoreVertIcon />
            </IconButton>
            {showMoreVert && <MoreVertMessage item={item} />}
          </div>
        )}
      </li>
    </>
  );
};

export default MessageText;
