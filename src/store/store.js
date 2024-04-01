import { configureStore } from "@reduxjs/toolkit";
import { reducer as chatReducer } from "../slices/chat-slice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
