import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {

  const { user } = useSelector((state) => state.userReducer)

  return (
    <div className="flex gap-x-10 mb-10">
      <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "")} to="/">
        Home
      </NavLink>
      {user ? (
        <>
          <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "")} to="/settings">
            User Settings
          </NavLink>
          {user?.isAdmin && (
            <NavLink className={({ isActive }) => isActive ? "text-red-400" : ""} to="/create-product">
              Create Product
            </NavLink>
          )}
          <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "")} to="/cart">
            Cart
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "")} to="/signin">
            Sign in
          </NavLink>
        </>
      )}
      <NavLink
        className={({ isActive }) => (isActive ? "text-red-400" : "")} to="/about">
        About
      </NavLink>
    </div>
  );
};

export default Nav;
