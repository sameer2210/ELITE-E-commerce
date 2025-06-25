/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asynccurrentuser } from "./store/actions/userActions";
// import { asyncloadproducts } from "./store/actions/productAction";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  // const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    !user && dispatch(asynccurrentuser());
  }, [user]);

  // useEffect(() => {
  //   products.length == 0 && dispatch(asyncloadproducts());
  // }, [products]);

  return (
    <div className="py-2 px-3 font-thin ">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
