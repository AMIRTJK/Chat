import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  postUsers,
  getUserStructure,
  postUserChat,
  getUserChats,
  getVisaList,
  putVisaStatus,
} from "../actions/chatApi";

const initialState = {
  data: [],
  showStructure: false,
  users: [],
  userStructure: [],
  userChats: [],
  activeChat: null,
  showVisa: false,
  visaList: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setShowStructure: (state, action) => {
      state.showStructure = action.payload;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setShowVisa: (state, action) => {
      state.showVisa = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUserStructure.fulfilled, (state, action) => {
      state.userStructure = action.payload;
    });
    builder.addCase(postUsers.fulfilled, (state, action) => {
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
    builder.addCase(putVisaStatus.fulfilled, (state, action) => {
      state.visaList = action.payload;
    });
  },
});

export const { reducer, actions } = chatSlice;
