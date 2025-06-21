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
    <form onSubmit={handleSubmit(SigninHandler)} className="p-5 w-full">
      <input
        {...register("email")}
        className="w-full text-3xl border-b outline-0 p-2 mb-5"
        type="email"
        required
        placeholder="john@doe.example"
      />
      <input
        {...register("password")}
        className="w-full text-3xl border-b outline-0 p-2 mb-5"
        type="password"
        required
        placeholder="********"
      />
      <button className="text-white text-3xl px-5 py-3 rounded bg-red-400">
        Signin User
      </button>
      <p className="mt-5">
        Don't have an account?{" "}
        <Link className="text-blue-400" to="/signup">
          Signup
        </Link>
      </p>
    </form>
  );
};

export default Signin;
