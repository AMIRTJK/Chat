import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  postUsers,
  postUsersStructure,
  getUserStructure,
  postUserChat,
  getUserChats,
  getVisaList,
  getVisaListTemp,
  postVisaListTemp,
  getChatById,
  getMessageById,
  getShowUserChat,
  postMessageById,
  getUsersAuth,
  postUserAuth,
} from "../actions/chatApi";

const initialState = {
  data: [],
  showStructure: false,
  users: [],
  userStructure: [],
  userChats: [],
  showVisa: false,
  visaList: [],
  visaListTemp: [],
  showDocPdf: false,
  asideMessage: false,
  showSend: "",
  moreVert: false,
  chatById: [],
  messageById: [],
  showUserChat: [],
  signLogin: "",
  signPassword: "",
  signNumber: "",
  usersAuth: [],
  regLog: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setShowStructure: (state, action) => {
      state.showStructure = action.payload;
    },
    setShowVisa: (state, action) => {
      state.showVisa = action.payload;
    },
    setShowDocPdf: (state, action) => {
      state.showDocPdf = action.payload;
    },
    setAsideMessage: (state, action) => {
      state.asideMessage = action.payload;
    },
    setShowSend: (state, action) => {
      state.showSend = action.payload;
    },
    setMoreVert: (state, action) => {
      state.moreVert = action.payload;
    },
    setSignLogin: (state, action) => {
      state.signLogin = action.payload;
    },
    setSignPassword: (state, action) => {
      state.signPassword = action.payload;
    },
    setSignNumber: (state, action) => {
      state.signNumber = action.payload;
    },
    setRegLog: (state, action) => {
      state.regLog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(postUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUserStructure.fulfilled, (state, action) => {
      state.userStructure = action.payload;
    });
    builder.addCase(postUsersStructure.fulfilled, (state, action) => {
      state.userStructure = action.payload;
    });
    builder.addCase(postUserChat.fulfilled, (state, action) => {
      state.userChats = action.payload;
    });
    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.userChats = action.payload;
    });
    builder.addCase(getVisaList.fulfilled, (state, action) => {
      state.visaList = action.payload;
    });
    builder.addCase(getVisaListTemp.fulfilled, (state, action) => {
      state.visaListTemp = action.payload;
    });
    builder.addCase(postVisaListTemp.fulfilled, (state, action) => {
      state.visaListTemp = action.payload;
    });
    builder.addCase(getChatById.fulfilled, (state, action) => {
      state.chatById = action.payload;
    });
    builder.addCase(getMessageById.fulfilled, (state, action) => {
      state.messageById = action.payload;
    });
    builder.addCase(getShowUserChat.fulfilled, (state, action) => {
      state.showUserChat = action.payload;
    });
    builder.addCase(postMessageById.fulfilled, (state, action) => {
      state.messageById = action.payload;
    });
    builder.addCase(getUsersAuth.fulfilled, (state, action) => {
      state.usersAuth = action.payload;
    });
    builder.addCase(postUserAuth.fulfilled, (state, action) => {
      state.usersAuth = action.payload;
    });
  },
});

export const { reducer, actions } = chatSlice;
