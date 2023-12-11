import * as userService from "./users-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserNonAdmin, findCurrentUser } from "../user-service";
// import {cleanSearchReducer} from "../../reducers/search-reducer";
import {useDispatch} from "react-redux";
export const findAllUsersThunk = createAsyncThunk("users/findAll", async () => {
  const users = await userService.findAllUsers();
  return users;
});

export const findUserByIdThunk = createAsyncThunk(
  "users/findById",
  async (id) => {
    const response = await userService.findUserById(id);
    return response;
  }
);

export const findCurrentUserThunk = createAsyncThunk(
  "users/findCurrentUser",
  async () => {
    const response = await findCurrentUser();
    return response;
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async (user) => {
    await userService.updateUser(user);
    return user;
  }
);

export const updateUserNonAdminThunk = createAsyncThunk(
  "users/update",
  async (user) => {
    const newUser = await updateUserNonAdmin(user);
    return newUser;
  }
);

export const loginThunk = createAsyncThunk("users/login", async (user) => {
  const response = await userService.login(user);
  if (response.data === null) {
    return null;
  }
  window.localStorage.setItem("currentUser", JSON.stringify(response.data));
  return response.data;
});

export const logoutThunk = createAsyncThunk("users/logout", async () => {
    localStorage.clear();
    const response = await userService.logout();
  return response.data;
});

export const registerThunk = createAsyncThunk(
  "users/register",
  async (user) => {
    const response = await userService.register(user);

    window.localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
  }
);