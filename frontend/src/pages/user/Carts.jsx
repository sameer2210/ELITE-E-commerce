import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../../store/actions/userActions";
import { Link } from "react-router-dom";

const Carts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const AddHandler = (index) => {
    const copyUser = { ...user, cart: [...user.cart] };
    copyUser.cart[index] = {
      ...copyUser.cart[index],
      quantity: copyUser.cart[index].quantity + 1
    };
    dispatch(asyncupdateuser(copyUser.id, copyUser));
  };

  const SubstractHandler = (index) => {
    const copyUser = { ...user, cart: [...user.cart] };
    if (copyUser.cart[index].quantity <= 1) {
      copyUser.cart.splice(index, 1);
    } else {
      copyUser.cart[index] = {
        ...copyUser.cart[index],
        quantity: copyUser.cart[index].quantity - 1
      };
    }
    dispatch(asyncupdateuser(copyUser.id, copyUser));
  };

  // console.log("User cart:", user?.cart);

  const cartlist = user?.cart?.map((o, i) => {
    return (
      <div
        key={i}
        className="items-center rounded mb-5 bg-zinc-200 flex justify-between p-2"
      >
        <img src={o.product.image} className="w-[10vmax] h-[10vmax]" alt="" />
        <h1>{o.product.title}</h1>
        <h1>${o.product.price}</h1>
        <div className="space-x-3">
          <button onClick={() => AddHandler(i)}>+</button>
          <span>{o.quantity}</span>
          <button onClick={() => SubstractHandler(i)}>-</button>
        </div>
        <Link to={`/product-info/${o.product.id}`} className="text-cyan-800">
          back
        </Link>
      </div>
    );
  });
  return <div className="">{cartlist}</div>;
};

export default Carts;
