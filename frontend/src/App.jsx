import Nav from "./components/layout/Nav";
import Mainroutes from "./routes/Mainroutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asynccurrentuser } from "./store/actions/userActions";
import { useApp } from "./context/AppContext";

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useApp();

  useEffect(() => {
    dispatch(asynccurrentuser());
  }, [dispatch]);

  return (
    <div data-theme={theme}>
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
