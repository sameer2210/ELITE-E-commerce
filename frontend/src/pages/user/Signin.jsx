import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncsigninuser } from "../../store/actions/userActions";
import { useForm } from "react-hook-form";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const SigninHandler = async (formData) => {
    await dispatch(asyncsigninuser(formData));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url(https://images.unsplash.com/photo-1644394969490-a0722932071a?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover relative overflow-hidden">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <div className="flex w-full bg-black/35 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Left Side - Brand */}
          <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative text-white">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-white/30 rounded transform rotate-45 mr-3"></div>
                <h1 className="text-3xl font-bold tracking-wide">ÉLITE</h1>
              </div>

              <div>
                <h2 className="text-5xl font-bold mb-4 leading-tight">
                  LUXURY <br />COLLECTION
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  Sign in to access all the features of our service.
                  <br />
                  Manage your lifestyle in one place.
                </p>
              </div>
            </div>

            <div className="absolute bottom-12 right-10 w-64 h-64 opacity-30">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M100 20 C120 30, 140 50, 140 80 L140 120 C140 140, 130 160, 100 180 C70 160, 60 140, 60 120 L60 80 C60 50, 80 30, 100 20 Z"
                  fill="white"
                  opacity="0.6"
                />
                <circle cx="100" cy="40" r="15" fill="white" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Right Side - Signin Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white/5">
            <div className="max-w-md mx-auto">
              <h2 className="text-white text-4xl font-bold">Welcome back</h2>
              <p className="text-white/70 mt-2 mb-8">
                Please enter your details to continue.
              </p>

              <form onSubmit={handleSubmit(SigninHandler)} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <label htmlFor="signin-email" className="text-white/80 text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="signin-email"
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
                  <label htmlFor="signin-password" className="text-white/80 text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                      className="w-4 h-4 bg-white/10 border-white/20 rounded focus:ring-white/60 focus:ring-2"
                    />
                    Remember me
                  </label>
                  <Link
                    to="/contact"
                    className="text-sm text-teal-300 hover:text-teal-200 transition-colors"
                  >
                    Need help?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full rounded-tr-2xl bg-white text-gray-900 font-semibold py-3 px-6 border-2 border-white/70 hover:border-white hover:bg-white/90 transition-all duration-300 text-base uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/60">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="text-teal-300 hover:text-teal-200 font-semibold underline transition-colors"
                    to="/signup"
                  >
                    Sign up
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

export default Signin;
