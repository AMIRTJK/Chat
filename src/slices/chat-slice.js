import { createSlice } from "@reduxjs/toolkit";
import { getUsers, postUsers, getUserStructure } from "../actions/chatApi";

const initialState = {
  data: [],
  showStructure: false,
  users: [],
  userStructure: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setShowStructure: (state, action) => {
      state.showStructure = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(postUsers.fulfilled, (state, action) => {
      state.userStructure = action.payload;
    });
    builder.addCase(getUserStructure.fulfilled, (state, action) => {
      state.userStructure = action.payload;
    });
  },
});

export const { reducer, actions } = chatSlice;
