/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   asyncdeleteuser,
//   asynclogoutuser,
//   asyncupdateuser
// } from "../../store/actions/userActions";

// const Settings = () => {
//   const { user } = useSelector((state) => state.userReducer);
//   const dispatch = useDispatch();

//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       username: user?.username,
//       email: user?.email,
//       password: user?.password
//     }
//   });

//   const UpdateHandler = (updateduser) => {
//     dispatch(asyncupdateuser(user.id, updateduser));
//   };

//   const LogoutHandler = () => {
//     dispatch(asynclogoutuser(user.id));
//   };

//   const DeleteHandler = () => {
//     dispatch(asyncdeleteuser(user.id));
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(UpdateHandler)} className="p-5 w-full">
//         <input
//           {...register("username")}
//           className="w-full text-3xl border-b outline-0 p-2 mb-5"
//           type="text"
//           placeholder="john-doe"
//         />
//         <input
//           {...register("email")}
//           className="w-full text-3xl border-b outline-0 p-2 mb-5"
//           type="email"
//           placeholder="john@doe.example"
//         />
//         <input
//           {...register("password")}
//           className="w-full text-3xl border-b outline-0 p-2 mb-5"
//           type="password"
//           placeholder="********"
//         />
//         <button className="text-white text-3xl px-5 py-3 rounded bg-cyan-900">
//           Update User
//         </button>
//         <br /> <br />
//         <button
//           onClick={LogoutHandler}
//           type="button"
//           className="text-white text-3xl px-5 py-3 rounded bg-red-500"
//         >
//           Logout User
//         </button>
//         <br /> <br />
//         <button
//           onClick={DeleteHandler}
//           type="button"
//           className="text-white text-3xl px-5 py-3 rounded bg-red-600"
//         >
//           Delete User
//         </button>
//       </form>
//     </>
//   );
// };

// export default Settings;

//-----------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  asyncdeleteuser,
  asynclogoutuser,
  asyncupdateuser
} from "../../store/actions/userActions";
import {
  User,
  Mail,
  Lock,
  Upload,
  Save,
  Twitter,
  MessageCircle,
  Bot,
  Clock,
  ExternalLink,
  LogOut,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SettingsComponent = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const profileImage =
    user?.profileImage ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      fullName: user?.fullName || "",
      location: user?.location || ""
    }
  });

  const formData = watch();

  const handleUpdateUser = async (data) => {
    setIsLoading(true);
    try {
      const updatedUser = { ...user, ...data };
      await dispatch(asyncupdateuser(user.id, updatedUser));
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(asynclogoutuser(user.id));
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      await dispatch(asyncdeleteuser(user.id));
      toast.success("Account deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete account.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const resetForm = () => {
    reset();
    toast.info("Changes discarded.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,

      draggable: true
    });
  };

  useEffect(() => {
    reset({
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      fullName: user?.fullName || "",
      location: user?.location || ""
    });
  }, [user]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      toast.success("Profile picture uploaded!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-600 to-teal-500 rounded-2xl p-8 text-center shadow-xl"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Account Settings
            </h1>
            <p className="text-indigo-100 mt-2 text-base sm:text-lg">
              Manage your profile and preferences
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Information Card */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-indigo-600" />
                Account Information
              </h2>
              <div className="space-y-4">
                {/* Username */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("username", {
                        required: "Username is required",
                        minLength: {
                          value: 3,
                          message: "Username must be at least 3 characters"
                        }
                      })}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.username
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-indigo-300"
                        }`}
                      type="text"
                      placeholder="Enter username"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span className="w-4 h-4">⚠</span>
                      {errors.username.message}
                    </p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-indigo-300"
                        }`}
                      type="email"
                      placeholder="Enter email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span className="w-4 h-4">⚠</span>
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300"
                    type="text"
                    placeholder="Enter full name"
                  />
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("password", {
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-indigo-300"
                        }`}
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span className="w-4 h-4">⚠</span>
                      {errors.password.message}
                    </p>
                  )}
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    {...register("location")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300"
                    type="text"
                    placeholder="Enter location"
                  />
                </motion.div>

                {/* Profile Picture */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2  mt-2">
                      <label className="group relative flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded border-2 border-teal-600 hover:border-teal-700 transition-all duration-300 text-base tracking-wide uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed">
                        Upload New Picture
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <span className="absolute inset-0 bg-white text-black  transform translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out"></span>
                        <span className="relative z-10 group-hover:text-teal-800 transition-colors duration-400"></span>
                      </label>

                      <p className="text-sm text-gray-500 hover:text-indigo-600 cursor-pointer mt-3 flex items-center gap-2 transition-colors duration-200">
                        <Twitter className="w-4 h-4" />
                        Import from Twitter
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                  className="flex  pt-3"
                >
                  <button
                    onClick={handleSubmit(handleUpdateUser)}
                    disabled={isLoading || !isDirty}
                    className="group relative flex items-center gap-2 rounded-l-xl bg-gray-50  font-medium py-3 px-6 border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-800 text-base tracking-wide uppercase overflow-hidden disabled:opacity-90 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 text-teal-700 h-5 group-hover:scale-110 transition-transform duration-300" />
                    {isLoading ? "Saving..." : "Save Changes"}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-700"></span>
                    <span className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-600"></span>
                  </button>

                  <button
                    onClick={resetForm}
                    disabled={isLoading}
                    className="group relative flex items-center gap-2 rounded-r-xl bg-gray-50 text-gray-900 font-medium py-3 px-2 border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-800 text-base tracking-wide uppercase overflow-hidden disabled:opacity-90 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 text-red-700 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Discard Changes
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-700"></span>
                    <span className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-600"></span>
                  </button>
                </motion.div>
              </div>

              {/* Danger Zone */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.3 }}
                className="border-t border-gray-200 pt-6 mt-8"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="text-red-500">⚠</span>
                  Danger Zone
                </h3>
                <div className="flex justify-evenly">
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    aria-label={isLoading ? "Logging out" : "Log out"}
                    className="group relative flex items-center gap-2 rounded-l-xl bg-gray-50 text-gray-900 font-medium py-3 px-12 border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-800 text-base tracking-wide uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut className="w-5 text-red-500 h-5 group-hover:scale-110 transition-transform duration-300" />
                    {isLoading ? "Logging out..." : "Logout"}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-700"></span>
                    <span className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-600"></span>
                  </button>

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isLoading}
                    className="group relative flex items-center gap-2 rounded-r-xl bg-gray-50 text-gray-900 font-medium py-3 px-2 border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-800 text-base tracking-wide uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-5 text-red-500 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Delete Account
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-700"></span>
                    <span className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-600"></span>
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Help / Support
                </h2>
              </div>

              {/* Chat to Sales */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Chat to sales
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Interested in switching? Speak to our team.
                </p>
                <a
                  href="mailto:sales@untitledui.com"
                  className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
                >
                  sales@untitledui.com
                </a>
              </motion.div>

              {/* Email Support */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Email support
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  We'll get back to you within 24 hours.
                </p>
                <a
                  href="mailto:support@untitledui.com"
                  className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
                >
                  support@untitledui.com
                </a>
              </motion.div>

              {/* Chat Support */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Chat support
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Chat to our staff 24/7 for instant support.
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-300 text-sm font-medium text-indigo-700">
                  <MessageCircle className="w-4 h-4" />
                  Start live chat
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1"></div>
                  <span className="text-xs text-green-600 font-semibold">
                    Online
                  </span>
                </button>
              </motion.div>

              {/* Chat with AI */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Chat with AI
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get instant answers from our AI assistant.
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 text-sm font-medium text-blue-700 border border-blue-200">
                  <Bot className="w-4 h-4" />
                  Ask AI Assistant
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-1"></div>
                </button>
              </motion.div>

              {/* Call Us */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Call us
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Mon - Fri, 9:00 AM - 5:00 PM (UTC +00:00)</span>
                </div>
                <div className="space-y-2">
                  <a
                    href="tel:+300132642"
                    className="block text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
                  >
                    +91 9691709556
                  </a>
                  <a
                    href="tel:+61402020024"
                    className="block text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
                  >
                    +91 9691709556
                  </a>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.3 }}
                className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200"
              >
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0წ
                      0 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 
                      13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Confirm Account Deletion
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-center text-sm">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteUser}
                    disabled={isLoading}
                    className="group relative bg-transparent text-gray-900 font-light py-3 px-12 border-b-2 border-gray-300 hover:border-gray-900 transition-all duration-500 text-lg tracking-widest uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Deleting..." : "Delete Account"}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-500"></span>
                    <span className="relative z-10 transform group-hover:translate-y-1 transition-transform duration-300"></span>
                  </button>

                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isLoading}
                    className="flex-1 bg-gray-500 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default SettingsComponent;
