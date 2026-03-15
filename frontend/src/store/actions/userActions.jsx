import axios from "../../api/config";
import { toast } from "react-toastify";
import { LoginUser, LogoutUser, SetLoading } from "../reducers/userSlice";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const normalizeUser = (user = {}, fallback = {}) => {
  const base = { ...(fallback || {}), ...(user || {}) };
  if (!Object.keys(base).length) return null;

  const normalized = { ...base };
  normalized.id = base._id || base.id || null;

  if (typeof normalized.isAdmin !== "boolean") {
    normalized.isAdmin = base.role === "admin";
  }

  if (!normalized.name) {
    normalized.name = base.fullName || base.username || "";
  }
  if (!normalized.fullName && normalized.name) {
    normalized.fullName = normalized.name;
  }

  if (!Array.isArray(normalized.cart)) {
    normalized.cart = [];
  }

  delete normalized._id;
  delete normalized.password;
  delete normalized.token;

  return normalized;
};

const persistUser = (user, fallback, dispatch) => {
  const normalized = normalizeUser(user, fallback);
  if (!normalized) {
    dispatch(LogoutUser());
    return null;
  }
  localStorage.setItem("user", JSON.stringify(normalized));
  dispatch(LoginUser(normalized));
  return normalized;
};

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || fallback;
};

const buildProfilePayload = (user = {}) => {
  const payload = {
    name: user.name || user.fullName,
    email: user.email,
    password: user.password,
  };

  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined || payload[key] === "") {
      delete payload[key];
    }
  });

  return payload;
};

export const asynccurrentuser = () => async (dispatch) => {
  dispatch(SetLoading(true));
  try {
    const token = localStorage.getItem("token");
    const storedUser = getStoredUser();

    if (!token) {
      localStorage.removeItem("user");
      dispatch(LogoutUser());
      return;
    }

    const { data } = await axios.get("/api/user/profile");
    persistUser(data, storedUser, dispatch);
  } catch (error) {
    console.error("Failed to restore session:", error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(LogoutUser());
  }
};

export const asyncsigninuser = (user) => async (dispatch) => {
  try {
    const payload = {
      email: user.email,
      password: user.password,
      role: user.role,
    };
    const { data } = await axios.post("/api/auth/signin", payload);

    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    const storedUser = getStoredUser();
    persistUser(data, storedUser, dispatch);
    toast.success("Logged in successfully!");
    console.log("Login success:", data);
  } catch (error) {
    console.error("Login error userAction.jsx:", error);
    toast.error(getErrorMessage(error, "Wrong email or password"));
  }
};

export const asyncsignupuser = (user) => async (dispatch) => {
  try {
    const payload = {
      name: user.name || user.fullName || user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    const { data } = await axios.post("/api/auth/signup", payload);

    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    const storedUser = getStoredUser();
    persistUser({ ...user, ...data }, storedUser, dispatch);
    toast.success("Registered successfully!");
    console.log("User registered:", data);
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(getErrorMessage(error, "Something went wrong during signup"));
  }
};

export const asynclogoutuser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(LogoutUser());
    toast.success("Logged out successfully!");
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Something went wrong during logout");
  }
};

export const asyncupdateuser = (id, user) => async (dispatch) => {
  try {
    const payload = buildProfilePayload(user);
    const { data } = await axios.put("/api/user/profile", payload);

    if (data) {
      const storedUser = getStoredUser();
      persistUser({ ...storedUser, ...user, ...data }, storedUser, dispatch);
      toast.success("Profile updated successfully!");
      console.log("User updated:", data);
    } else {
      toast.error("Failed to update user profile.");
      console.warn("Empty response received while updating user.");
    }
  } catch (error) {
    console.error("Update error:", error);
    toast.error(
      getErrorMessage(error, "Error updating profile. Please try again.")
    );
  }
};

export const asyncdeleteuser = (id) => async (dispatch) => {
  try {
    await axios.delete("/api/user/profile");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(LogoutUser());
    toast.success("Your account has been deleted.");
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Failed to delete user:", error);
    toast.error(
      getErrorMessage(error, "Failed to delete account. Please try again.")
    );
  }
};
