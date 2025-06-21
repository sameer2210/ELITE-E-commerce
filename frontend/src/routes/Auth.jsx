import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = (props) => {
  const { user } = useSelector((state) => state.userReducer);
  return user ? props.children : <Navigate to="/signin" />;
};

export default Auth;
