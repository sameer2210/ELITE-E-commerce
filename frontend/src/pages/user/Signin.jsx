import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { asyncsigninuser } from "../../store/actions/userActions";
import { useForm } from "react-hook-form";

const Signin = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const SigninHandler = (user) => {
    dispatch(asyncsigninuser(user));
  };

  return (
    <div className=" w-full flex items-center justify-center bg-[url(https://images.unsplash.com/photo-1644394969490-a0722932071a?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover relative overflow-hidden">
      <div className="flex w-full bg-black/20 backdrop-blur rounded shadow-2xl overflow-hidden relative z-10">
       
        {/* Left Side - Brand & Image */}
        <div className="hidden lg:flex lg:w-1/2 py-16 px-8 flex-col justify-between relative">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-white/30 rounded transform rotate-45 mr-3"></div>
              <h1 className="text-white text-3xl font-bold tracking-wide">
                ÉLITE
              </h1>
            </div>

            <div className="">
              <h2 className="text-white text-5xl font-bold mb-4 leading-tight">
                LUXURY <br />COLLECTION
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Login to access all the features of our service.
                <br />
                Manage your lifeStyle in one place!
              </p>
            </div>
          </div>

          {/* Silhouette Figure */}
          <div className="absolute bottom-36 right-0 w-64 h-64 opacity-30">
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

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-3/2 p-8 lg:p-12 bg-white/5 backdrop-blur-sm">
          <div className="max-w-md mx-auto">
            <h2 className="text-white text-4xl font-bold mb-8">Sign in</h2>

            <form onSubmit={handleSubmit(SigninHandler)} className="space-y-5">

              <div className="space-y-1">
                <label className="text-white/80 text-sm font-medium">
                  Email
                </label>
                <input
                  {...register("email")}
                  name="email"
                  className="w-full text-white placeholder-white/60 border-b-2  rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all"
                  type="email"
                  required
                  placeholder="john@doe.example"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/80 text-sm font-medium">
                  Password
                </label>
                <input
                  {...register("password")}
                  name="password"
                  className="w-full text-white placeholder-white/60 border-b-2  rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-shadow-emerald-700 bg-white/10 border-white/20 rounded focus:ring-white-500 focus:ring-2"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-white/80">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Terms of service
                  </a>
                </label>
              </div>

              <button
                className="group relative flex items-center gap-2 rounded-tr-2xl bg-white text-gray-900 font-medium py-3 px-12 border-2 border-gray-300 
                hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-700 text-base tracking-wide uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >Sign up
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-700"></span>
                <span className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-600"></span>
              </button>

            </form>

            <div className="mt-4 text-center">
              <p className="text-white/60">
                Already have an account?{" "}
                <Link
                  className="text-teal-400 hover:text-teal-500 font-semibold underline transition-colors"
                  to="/signup"
                >SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Signin;


