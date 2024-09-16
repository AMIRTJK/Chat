import React, { useState } from "react";
import { IconButton } from "@mui/material";

import "../App.css";

// import AppleIcon from "@mui/icons-material/Apple";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import StormIcon from "@mui/icons-material/Storm";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import TelegramIcon from "@mui/icons-material/Telegram";
// import InstagramIcon from "@mui/icons-material/Instagram";

import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LoupeOutlinedIcon from "@mui/icons-material/LoupeOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const MotionDiv = motion.div;
const MotionIconButton = motion(IconButton);

const WebToolBox = () => {
  const [showTool, setShowTool] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleShowTool = () => {
    setShowTool(!showTool);
  };

  React.useEffect(() => {
    if (!showTool) {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [showTool]);

  console.log(showTool);

  return (
    <>
      <div
        onClick={handleShowTool}
        className={`wrapper-webtoolbox absolute bottom-10 right-10 ${
          showTool ? "hidden" : ""
        }`}
      >
        <IconButton
          sx={{
            border: "1px solid #ffffff38",
            backgroundColor: "#000000bb",
            zIndex: 1400,
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          <AddOutlinedIcon sx={{ color: "#ffffffb3" }} />
        </IconButton>
      </div>
      <AnimatePresence>
        {shouldRender && showTool && (
          <MotionDiv
            className="absolute bg-[#000000bb] text-[#ffffff38] z-[1400] p-[50px] rounded-[50px] flex flex-col items-center justify-center gap-5 cursor-grab"
            variants={container}
            initial="hidden"
            animate="visible"
            exit="hidden"
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: window.innerWidth - 300,
              bottom: window.innerHeight - 300,
            }}
            onDragEnd={(event, info) => {
              setPosition({
                x: info.point.x,
                y: info.point.y,
              });
            }}
            style={{ x: position.x, y: position.y }}
          >
            <div className="wrapper-header flex gap-5">
              <motion.div variants={item}>
                <IconButton sx={{ border: "1px solid #ffffff38" }}>
                  <VideocamOutlinedIcon sx={{ color: "#ffffffb3" }} />
                </IconButton>
              </motion.div>
              <motion.div variants={item}>
                <IconButton sx={{ border: "1px solid #ffffff38" }}>
                  <PhoneOutlinedIcon sx={{ color: "#ffffffb3" }} />
                </IconButton>
              </motion.div>
            </div>
            <div className="wrapper-main flex gap-5">
              <motion.div variants={item}>
                <IconButton sx={{ border: "1px solid #ffffff38" }}>
                  <LoupeOutlinedIcon sx={{ color: "#ffffffb3" }} />
                </IconButton>
              </motion.div>
              <motion.div variants={item}>
                <IconButton
                  onClick={handleShowTool}
                  sx={{ border: "1px solid #ffffff38" }}
                >
                  <RemoveOutlinedIcon sx={{ color: "#ffffffb3" }} />
                </IconButton>
              </motion.div>
              <motion.div variants={item}>
                <IconButton sx={{ border: "1px solid #ffffff38" }}>
                  <FolderCopyOutlinedIcon sx={{ color: "#ffffffb3" }} />
                </IconButton>
              </motion.div>
            </div>
            <div className="wrapper-footer flex gap-5">
              <motion.div variants={item}>
                <IconButton sx={{ border: "1px solid #ffffff38" }}>
                  <EmailOutlinedIcon sx={{ color: "#ffffffb3" }} />
                </IconButton>
              </motion.div>
              <motion.div variants={item}>
                <IconButton sx={{ border: "1px solid #ffffff38" }}>
                  <NotificationsOutlinedIcon sx={{ color: "#ffffffb3" }} />
                </IconButton>
              </motion.div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default WebToolBox;
