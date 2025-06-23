import { Link } from "react-router-dom";
import { asyncAddtoCartProduct } from "../store/actions/productAction";
import { asyncupdateuser } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const ProductTemplate = ({ p }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const AddtoCartHandler = () => {
    if (!user) {
      alert("Please sign in to add items to your cart.");
      return;
    }
    const updatedUser = asyncAddtoCartProduct(user, p, p.id);
    dispatch(asyncupdateuser(updatedUser.id, updatedUser));
  };

  return (
    <div key={p.id} className="w-[31%] h-[65vh] shadow-lg p-2 mr-5 mb-5">
      <img
        className="h-[60%] block mx-auto"
        src={p.image}
        alt="network error"
      />
      <h1 className="text-2xl">{p.title.slice(0, 18)}...</h1>
      <p className="mt-5">{p.description.slice(0, 90)}...</p>
      <div className="flex justify-between items-center p-3">
        <Link to={`/product-info/${p.id}`} className="text-blue-400">
          More Info
        </Link>
        <button
          onClick={AddtoCartHandler}
          className="text-yellow-400  hover:text-yellow-600"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductTemplate;
