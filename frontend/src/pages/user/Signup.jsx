import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncsignupuser } from "../../store/actions/userActions";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const passwordValue = watch("password");

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const SignupHandler = async (formData) => {
    const { confirmPassword, terms, ...sanitizedData } = formData;
    const payload = {
      ...sanitizedData,
      id: nanoid(),
      isAdmin: false,
      cart: [],
    };
    await dispatch(asyncsignupuser(payload));
  };

  const socialLinks = [
    { icon: Facebook, name: "Facebook", href: "https://www.facebook.com/", color: "hover:bg-blue-600" },
    { icon: Twitter, name: "Twitter", href: "https://twitter.com/", color: "hover:bg-sky-500" },
    { icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/", color: "hover:bg-blue-700" },
    { icon: Instagram, name: "Instagram", href: "https://www.instagram.com/", color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(https://images.unsplash.com/photo-1644394969490-a0722932071a?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover relative overflow-hidden">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="flex w-full bg-black/35 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Left Side - Brand & Social */}
          <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative text-white">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-white/30 rounded transform rotate-45 mr-3"></div>
                <h1 className="text-3xl font-bold tracking-wide">ÉLITE</h1>
              </div>

              <div className="mb-8">
                <h2 className="text-5xl font-bold mb-4 leading-tight">
                  
                  <br />
                  COLLECTION
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  Create your account and unlock exclusive access.
                  <br />
                  Curated pieces, tailored for you.
                </p>
              </div>
            </div>

            <div className="absolute bottom-10 right-8 w-64 h-64 opacity-30">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M100 20 C120 30, 140 50, 140 80 L140 120 C140 140, 130 160, 100 180 C70 160, 60 140, 60 120 L60 80 C60 50, 80 30, 100 20 Z"
                  fill="white"
                  opacity="0.6"
                />
                <circle cx="100" cy="40" r="15" fill="white" opacity="0.8" />
              </svg>
            </div>

            <div>
              <p className="text-white/70 text-sm uppercase tracking-wider mb-3">Follow us</p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit us on ${social.name}`}
                    className={`w-11 h-11 bg-black/60 border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110`}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white/5">
            <div className="max-w-md mx-auto">
              <h2 className="text-white text-4xl font-bold">Create account</h2>
              <p className="text-white/70 mt-2 mb-8">Join us in a few quick steps.</p>

              <form onSubmit={handleSubmit(SignupHandler)} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <label htmlFor="signup-fullname" className="text-white/80 text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="signup-fullname"
                    type="text"
                    autoComplete="name"
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: { value: 2, message: "Enter at least 2 characters" },
                    })}
                    aria-invalid={errors.fullName ? "true" : "false"}
                    className="w-full text-white placeholder-white/60 bg-white/10 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-300">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-username" className="text-white/80 text-sm font-medium">
                    Username
                  </label>
                  <input
                    id="signup-username"
                    type="text"
                    autoComplete="username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Only letters, numbers, and underscores",
                      },
                    })}
                    aria-invalid={errors.username ? "true" : "false"}
                    className="w-full text-white placeholder-white/60 bg-white/10 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent transition-all"
                    placeholder="john_22"
                  />
                  {errors.username && (
                    <p className="text-xs text-red-300">{errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-white/80 text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                    className="w-full text-white placeholder-white/60 bg-white/10 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent transition-all"
                    placeholder="john@doe.example"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-300">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-white/80 text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Minimum 8 characters" },
                      })}
                      aria-invalid={errors.password ? "true" : "false"}
                      className="w-full text-white placeholder-white/60 bg-white/10 border border-white/10 rounded-lg px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/70 hover:text-white transition-colors"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-300">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-confirm" className="text-white/80 text-sm font-medium">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-confirm"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) => value === passwordValue || "Passwords do not match",
                      })}
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                      className="w-full text-white placeholder-white/60 bg-white/10 border border-white/10 rounded-lg px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/70 hover:text-white transition-colors"
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-300">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-location" className="text-white/80 text-sm font-medium">
                    Location (optional)
                  </label>
                  <input
                    id="signup-location"
                    type="text"
                    autoComplete="address-level2"
                    {...register("location")}
                    className="w-full text-white placeholder-white/60 bg-white/10 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent transition-all"
                    placeholder="Mumbai"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="signup-terms"
                    type="checkbox"
                    {...register("terms", { required: "You must accept the terms" })}
                    className="mt-1 w-4 h-4 bg-white/10 border-white/20 rounded focus:ring-white/60 focus:ring-2"
                  />
                  <label htmlFor="signup-terms" className="text-sm text-white/80">
                    I agree to the{" "}
                    <a href="#" className="text-teal-300 hover:text-teal-200 underline">
                      Terms of service
                    </a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-300">{errors.terms.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full rounded-tr-2xl bg-white text-gray-900 font-semibold py-3 px-6 border-2 border-white/70 hover:border-white hover:bg-white/90 transition-all duration-300 text-base uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating account..." : "Sign up"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/60">
                  Already have an account?{" "}
                  <Link
                    className="text-teal-300 hover:text-teal-200 font-semibold underline transition-colors"
                    to="/signin"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
