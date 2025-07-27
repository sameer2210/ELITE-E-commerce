
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { user, loading } = useSelector((state) => state.userReducer);

  if (loading) {
    return <div className="text-center py-10">Checking authentication...</div>;
  }

  return user ? children : <Navigate to="/signin" replace />;
};

export default Auth;
