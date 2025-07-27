import Nav from "./components/layout/Nav";
import Mainroutes from "./routes/Mainroutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asynccurrentuser } from "./store/actions/userActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccurrentuser());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
