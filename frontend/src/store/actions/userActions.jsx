import axios from "../../api/config";
import { toast } from "react-toastify";
import { LoginUser, LogoutUser } from "../reducers/userSlice";


export const asynccurrentuser = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));        //Converts the string back into a JavaScript object
    if (user && user.email) {
      dispatch(LoginUser(user));
      console.log("Session restored for:", user.email);
    } else {
      console.warn("No user session found.");
      toast.error("Please sign in to continue");
    }
  } catch (error) {
    console.error("Failed to restore session:", error);
    toast.error("Session error. Please sign in again.");
  }
};


export const asyncsigninuser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/users?email=${user.email}`);     // Only get user by email (json-server)
    const foundUser = data[0];

    if (foundUser && foundUser.password === user.password) {
      localStorage.setItem("user", JSON.stringify(foundUser));        // Save user to localStorage
      dispatch(asynccurrentuser());                                   // Set user in redux
      toast.success("Logged in successfully!");
      console.log("Login success:", foundUser);
    } else {
      toast.error("Wrong email or password");
      console.warn("Login failed: Invalid credentials");
    }
  } catch (error) {
    console.error("Login error userAction.jsx:", error);
    toast.error("Something went wrong. Please try again.");
  }
};


export const asyncsignupuser = (user) => async (dispatch) => {
  try {
    const { data: existingUsers } = await axios.get(`/users?email=${user.email}`);      // Check if user already exists
    if (existingUsers.length > 0) {
      toast.error("User already exists with this email");
      return;
    }
    await axios.post("/users", user);                             // Register new user
    toast.success("Registered successfully! Please sign in.");
    console.log("User registered:", user);
    localStorage.setItem("user", JSON.stringify(user));           // auto-login after signup
    dispatch(asynccurrentuser());

  } catch (error) {
    console.error("Signup error:", error);
    toast.error("Something went wrong during signup");
  }
};


export const asynclogoutuser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");                         // optional, if using token auth
    dispatch(LogoutUser());                                   // Clear user from redux state
    toast.success("Logged out successfully!");
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Something went wrong during logout");
  }
};


export const asyncupdateuser = (id, user) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/users/${id}`, user);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));     // Update localStorage with new user data
      dispatch(asynccurrentuser());
      toast.success("Profile updated successfully!");
      console.log("User updated:", data);
    } else {
      toast.error("Failed to update user profile.");
      console.warn("Empty response received while updating user.");
    }
  } catch (error) {
    console.error("Update error:", error);
    toast.error("Error updating profile. Please try again.");
  }
};


export const asyncdeleteuser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/users/${id}`);
    localStorage.removeItem("user");
    dispatch(LogoutUser());
    toast.success("Your account has been deleted.");
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Failed to delete user:", error);
    toast.error("Failed to delete account. Please try again.");
  }
};

