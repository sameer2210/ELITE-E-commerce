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
  } = useForm({ mode: "onChange", defaultValues: { role: "client" } });

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
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex w-full bg-slate-900/70 rounded-3xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] overflow-hidden border border-white/10">
          {/* Left Side - Brand & Social */}
          <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative text-slate-100 border-r border-white/10">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-teal-400/20 rounded-lg mr-3"></div>
                <h1 className="text-3xl font-semibold tracking-wide">ÉLITE</h1>
              </div>

              <div className="mb-8">
                <h2 className="text-5xl font-bold mb-4 leading-tight">
                  LAUNCH <br />
                  YOUR SPACE
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Create your account to post projects, connect with talent, and ship faster.
                </p>
              </div>
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
                    className={`w-11 h-11 bg-slate-800/70 border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110`}
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
              <h2 className="text-white text-4xl font-semibold">Create account</h2>
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
                    className="w-full text-white placeholder-white/60 bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
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
                    className="w-full text-white placeholder-white/60 bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
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
                    className="w-full text-white placeholder-white/60 bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
                    placeholder="john@doe.example"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-300">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-role" className="text-white/80 text-sm font-medium">
                    Account type
                  </label>
                  <select
                    id="signup-role"
                    {...register("role", { required: "Select an account type" })}
                    className="w-full text-white bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
                  >
                    <option value="client" className="text-gray-900">
                      Client
                    </option>
                    <option value="developer" className="text-gray-900">
                      Developer
                    </option>
                  </select>
                  {errors.role && (
                    <p className="text-xs text-red-300">{errors.role.message}</p>
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
                      className="w-full text-white placeholder-white/60 bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
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
                      className="w-full text-white placeholder-white/60 bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
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
                    className="w-full text-white placeholder-white/60 bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
                    placeholder="Mumbai"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="signup-terms"
                    type="checkbox"
                    {...register("terms", { required: "You must accept the terms" })}
                    className="mt-1 w-4 h-4 bg-slate-800/60 border-white/20 rounded focus:ring-teal-400/60 focus:ring-2"
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
                  className="w-full rounded-xl bg-teal-400 text-slate-900 font-semibold py-3 px-6 hover:bg-teal-300 transition-all duration-300 text-base uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
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
