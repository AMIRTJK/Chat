//https://json-server-deployment-blbe.onrender.com/

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getUserStructure = createAsyncThunk(
  "getUserStructure",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_STRUCTURE);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postUsers = createAsyncThunk(
  "postUsers",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_STRUCTURE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getUserStructure());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "deleteUsers",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_STRUCTURE}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getUserStructure());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const multiDeleteUsers = createAsyncThunk(
  "multiDeleteUsers",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_STRUCTURE}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getUserStructure());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getUserChats = createAsyncThunk(
  "getUserChats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_CHATS);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postUserChat = createAsyncThunk(
  "postUserChat",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_CHATS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = response.json();
      dispatch(getUserChats());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteUserChats = createAsyncThunk(
  "deleteUserChats",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_CHATS}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getUserChats());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const putUserChatStatus = createAsyncThunk(
  "putUserChatStatus",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_CHATS}/${newObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getUserChats());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getVisaList = createAsyncThunk(
  "getVisaList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_LIST);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getVisaListTemp = createAsyncThunk(
  "getVisaListTemp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_LIST_TEMP);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postVisaListTemp = createAsyncThunk(
  "postVisaListTemp",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_LIST_TEMP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getVisaListTemp());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteVisaListTemp = createAsyncThunk(
  "deleteVisaListTemp",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_VISA_LIST_TEMP}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getVisaListTemp());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getChatById = createAsyncThunk(
  "getChatById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_CHATS}?id=${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getMessageById = createAsyncThunk(
  "getMessageById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_MESSAGES}?userChatId=${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getShowUserChat = createAsyncThunk(
  "getShowUserChat",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_SHOW_USER_CHAT);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postShowUserChat = createAsyncThunk(
  "postShowUserChat",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_SHOW_USER_CHAT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getShowUserChat());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// export const postUserMessage = createAsyncThunk(
//   "postUserMessage",
//   async (newObj, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await fetch(import.meta.env.VITE_API_USERS_MESSAGE, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newObj),
//       });
//       const data = await response.json();
//       dispatch(getUserMessage());
//       return data;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error);
//     }
//   }
// );

// export const getMessages = createAsyncThunk(
//   "getMessages",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(import.meta.env.VITE_API_MESSAGES);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error);
//     }
//   }
// );
