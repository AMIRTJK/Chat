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
