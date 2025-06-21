/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asynccurrentuser } from "./store/actions/userActions";
import { asyncloadproducts } from "./store/actions/productAction";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { Products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    !user && dispatch(asynccurrentuser());
  }, [user]);

  useEffect(() => {
    Products.length == 0 && dispatch(asyncloadproducts());
  }, []);

  return (
    <div className="py-10 px-[10%] font-thin ">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
