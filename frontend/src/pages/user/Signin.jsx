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
  } = useForm({ mode: "onChange", defaultValues: { role: "client" } });

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const SigninHandler = async (formData) => {
    await dispatch(asyncsigninuser(formData));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="flex w-full bg-slate-900/70 rounded-3xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] overflow-hidden border border-white/10">
          {/* Left Side - Brand */}
          <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative text-slate-100 border-r border-white/10">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-teal-400/20 rounded-lg mr-3"></div>
                <h1 className="text-3xl font-semibold tracking-wide">ÉLITE</h1>
              </div>

              <div>
                <h2 className="text-5xl font-bold mb-4 leading-tight">
                  DIGITAL <br /> WORKSPACE
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Sign in to manage projects, track milestones, and collaborate in real time.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Signin Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white/5">
            <div className="max-w-md mx-auto">
              <h2 className="text-white text-4xl font-semibold">Welcome back</h2>
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
                    className="w-full text-white placeholder-white/60 bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
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
                  <label htmlFor="signin-role" className="text-white/80 text-sm font-medium">
                    Account type
                  </label>
                  <select
                    id="signin-role"
                    {...register("role")}
                    className="w-full text-white bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
                  >
                    <option value="client" className="text-gray-900">
                      Client
                    </option>
                    <option value="developer" className="text-gray-900">
                      Developer
                    </option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                    className="w-4 h-4 bg-slate-800/60 border-white/20 rounded focus:ring-teal-400/60 focus:ring-2"
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
                  className="w-full rounded-xl bg-teal-400 text-slate-900 font-semibold py-3 px-6 hover:bg-teal-300 transition-all duration-300 text-base uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
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
