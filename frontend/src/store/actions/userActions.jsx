/* eslint-disable no-unused-vars */
import axios from "../../api/config";
import { LoginUser, LogoutUser } from "../reducers/userSlice";

export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(LoginUser(user));
      console.log("Session Restored!");
    } else {
      console.log("Signin to access the resource!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncsigninuser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "/users?email=" + user.email + "&password=" + user.password
    );
    console.log(data);
    if (data[0]) {
      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(asynccurrentuser());
      console.log("User logged in!");
    } else {
      console.log("Wrong Credentials!");
    }
    console.log("User Logged in successfully!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncsignupuser = (user) => async (dispatch, getState) => {
  try {
    await axios.post("/users", user);
    console.log("User Registered successfully!");
  } catch (error) {
    console.log(error);
  }
};

export const asynclogoutuser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(LogoutUser());
    console.log("User logged out!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncupdateuser = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(asynccurrentuser());
    console.log("User updated!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncdeleteuser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/users/" + id);
    localStorage.removeItem("user");
    dispatch(LogoutUser());
    console.log("User deleted!");
  } catch (error) {
    console.log(error);
  }
};
