import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncsignupuser } from "../../store/actions/userActions";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const SignupHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    dispatch(asyncsignupuser(user));
    console.log(user);
    navigate("/signin");
  };

  return (
    <form onSubmit={handleSubmit(SignupHandler)} className="p-5 w-full">
      <input
        {...register("username")}
        className="w-full text-3xl border-b outline-0 p-2 mb-5"
        type="text"
        required
        placeholder="john-doe"
      />
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
        Signup User
      </button>
      <p className="mt-5">
        Already have an account?{" "}
        <Link className="text-blue-400" to="/signin">
          Signin
        </Link>
      </p>
    </form>
  );
};

export default Signup;
