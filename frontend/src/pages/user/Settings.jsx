import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncdeleteuser,
  asynclogoutuser,
  asyncupdateuser
} from "../../store/actions/userActions";

const Settings = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password
    }
  });

  const UpdateHandler = (updateduser) => {
    dispatch(asyncupdateuser(user.id, updateduser));
  };

  const LogoutHandler = () => {
    dispatch(asynclogoutuser(user.id));
  };

  const DeleteHandler = () => {
    dispatch(asyncdeleteuser(user.id));
  };

  return (
    <>
      <form onSubmit={handleSubmit(UpdateHandler)} className="p-5 w-full">
        <input
          {...register("username")}
          className="w-full text-3xl border-b outline-0 p-2 mb-5"
          type="text"
          placeholder="john-doe"
        />
        <input
          {...register("email")}
          className="w-full text-3xl border-b outline-0 p-2 mb-5"
          type="email"
          placeholder="john@doe.example"
        />
        <input
          {...register("password")}
          className="w-full text-3xl border-b outline-0 p-2 mb-5"
          type="password"
          placeholder="********"
        />
        <button className="text-white text-3xl px-5 py-3 rounded bg-cyan-900">
          Update User
        </button>
        <br /> <br />
        <button
          onClick={LogoutHandler}
          type="button"
          className="text-white text-3xl px-5 py-3 rounded bg-red-500"
        >
          Logout User
        </button>
        <br /> <br />
        <button
          onClick={DeleteHandler}
          type="button"
          className="text-white text-3xl px-5 py-3 rounded bg-red-600"
        >
          Delete User
        </button>
      </form>
    </>
  );
};

export default Settings;
