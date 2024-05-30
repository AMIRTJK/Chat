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

export const postUsers = createAsyncThunk(
  "postUsers",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getUsers());
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

export const postUsersStructure = createAsyncThunk(
  "postUsersStructure",
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

export const getTermDate = createAsyncThunk(
  "getTermDate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_TERM_DATE);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postTermDate = createAsyncThunk(
  "postTermDate",
  async (newObj, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_TERM_DATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getTermDate());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getVisaStatus = createAsyncThunk(
  "getVisaStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_STATUS);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getVisaStatusTemp = createAsyncThunk(
  "getVisaStatusTemp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_STATUS_TEMP);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postVisaStatusTemp = createAsyncThunk(
  "postVisaStatusTemp",
  async (newObj, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_STATUS_TEMP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getVisaStatusTemp());
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

export const postMessageById = createAsyncThunk(
  "postMessageById",
  async ({ newObj, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_MESSAGES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getMessageById(id));
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteMessageById = createAsyncThunk(
  "deleteMessageById",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_MESSAGES}/${item.id}`,
        {
          method: "DELETE",
        }
      );
      dispatch(getMessageById(item.userChatId));
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getUsersAuth = createAsyncThunk(
  "getUsersAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_AUTH);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postUserAuth = createAsyncThunk(
  "postUserAuth",
  async (newObj, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_AUTH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getUserStructureExecutor = createAsyncThunk(
  "getUserStructureExecutor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_USERS_STRUCTURE_EXECUTOR
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteUsersExecutor = createAsyncThunk(
  "deleteUsersExecutor",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_STRUCTURE_EXECUTOR}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getUserStructureExecutor());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const multiDeleteUsersExecutor = createAsyncThunk(
  "multiDeleteUsersExecutor",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_STRUCTURE_EXECUTOR}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getUserStructureExecutor());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postUsersStructureExecutor = createAsyncThunk(
  "postUsersStructureExecutor",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_USERS_STRUCTURE_EXECUTOR,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getUserStructureExecutor());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getUserChatsExecutor = createAsyncThunk(
  "getUserChatsExecutor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_USERS_CHAT_EXECUTOR
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postUserChatsExecutor = createAsyncThunk(
  "postUserChatsExecutor",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_USERS_CHAT_EXECUTOR,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = response.json();
      dispatch(getUserChatsExecutor());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getVisaUsers = createAsyncThunk(
  "getVisaUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_USERS);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postVisaUsers = createAsyncThunk(
  "postVisaUsers",
  async (newObj, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_USERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getVisaMessage = createAsyncThunk(
  "getVisaMessage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_MESSAGE);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postVisaMessage = createAsyncThunk(
  "postVisaMessage",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_MESSAGE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getVisaMessage());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteVisaMessage = createAsyncThunk(
  "deleteVisaMessage",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_VISA_MESSAGE}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getVisaMessage());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getDefaultVisa = createAsyncThunk(
  "getDefaultVisa",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_DEFAULT_VISA);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getOwnVisa = createAsyncThunk(
  "getOwnVisa",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_VISA_OWN_VISA);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const putUserChatsExecutor = createAsyncThunk(
  "putUserChatsExecutor",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_CHAT_EXECUTOR}/${newObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application-json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getUserChatsExecutor());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getSubChatById = createAsyncThunk(
  "getSubChatById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_USERS_CHAT_EXECUTOR}?id=${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getSubMessages = createAsyncThunk("getSubMessages", async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_SUB_MESSAGES);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error);
  }
});

export const postSubMessage = createAsyncThunk(
  "postSubMessage",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_SUB_MESSAGES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getSubMessages());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteSubMessage = createAsyncThunk(
  "deleteSubMessage",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_MESSAGES}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(getSubMessages());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getInviteToSubChat = createAsyncThunk(
  "getInviteToSubChat",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_INVITE_TO_SUB_CHAT);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postInviteToSubChat = createAsyncThunk(
  "postInviteToSubChat",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_INVITE_TO_SUB_CHAT,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getInviteToSubChat());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteInviteToSubChat = createAsyncThunk(
  "deleteInviteToSubChat",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INVITE_TO_SUB_CHAT}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getInviteToSubChat());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);
