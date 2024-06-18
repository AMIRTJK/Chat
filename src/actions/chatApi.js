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

export const putSubMessages = createAsyncThunk(
  "putSubMessages",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_MESSAGES}/${newObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application-json",
          },
          body: JSON.stringify(newObj),
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

export const getSubUserChatTabs = createAsyncThunk(
  "getSubUserChatTabs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_SUB_USER_CHAT_TABS);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postSubUserChatTabs = createAsyncThunk(
  "postSubUserChatTabs",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_SUB_USER_CHAT_TABS,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getSubUserChatTabs());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteSubUserChatTabs = createAsyncThunk(
  "deleteSubUserChatTabs",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_USER_CHAT_TABS}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getSubUserChatTabs());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getSubTabMessages = createAsyncThunk(
  "getSubTabMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_SUB_TAB_MESSAGES);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

// Данный запрос еще не используется
export const postSubTabMessages = createAsyncThunk(
  "postSubTabMessages",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_SUB_TAB_MESSAGES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      dispatch(getSubTabMessages());
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteSubTabMessages = createAsyncThunk(
  "deleteSubTabMessages",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_TAB_MESSAGES}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(getSubTabMessages());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const putSubUserChatTabsById = createAsyncThunk(
  "putSubUserChatTabsById",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_USER_CHAT_TABS}/${newObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      dispatch(getSubUserChatTabs());
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getSubUserChatTabsById = createAsyncThunk(
  "getSubUserChatTabsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_USER_CHAT_TABS}?id=${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getInvitedToSubChatTabs = createAsyncThunk(
  "getInvitedToSubChatTabs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_INVITED_TO_SUB_CHAT_TABS
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postInvitedToSubChatTabs = createAsyncThunk(
  "postInvitedToSubChatTabs",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_INVITED_TO_SUB_CHAT_TABS,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(getInvitedToSubChatTabs());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getTabVisaUsers = createAsyncThunk(
  "getTabVisaUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_SUB_TAB_VISA_USERS);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postTabVisaUsers = createAsyncThunk(
  "postTabVisaUsers",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_SUB_TAB_VISA_USERS,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getTabVisaUsers());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getSubTabVisaMessages = createAsyncThunk(
  "getSubTabVisaMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_SUB_TAB_VISA_MESSAGES
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postSubTabVisaMessages = createAsyncThunk(
  "postSubTabVisaMessages",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_SUB_TAB_VISA_MESSAGES,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getSubTabVisaMessages());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const putTabVisaUsersTerm = createAsyncThunk(
  "putTabVisaUsersTerm",
  async (newObj, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_TAB_VISA_USERS}/${newObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getTabVisaUsers());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getSubTabConclusionList = createAsyncThunk(
  "getSubTabConclusionList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postSubTabConclusionList = createAsyncThunk(
  "postSubTabConclusionList",
  async (newObj, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getSubTabConclusionList());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);
export const putSubTabConclusionList = createAsyncThunk(
  "putSubTabConclusionList",
  async (newObj, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST}/${newObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getSubTabConclusionList());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const putSubTabConclusionListText = createAsyncThunk(
  "putSubTabConclusionListText",
  async (newObj, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SUB_TAB_CONCLUSION_LIST}/${newObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      );
      const data = await response.json();
      dispatch(getSubTabConclusionList());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);
