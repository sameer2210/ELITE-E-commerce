// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { asyncupdateuser } from "../../store/actions/userActions";
// import { Link } from "react-router-dom";

// const Carts = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.userReducer);

//   const AddHandler = (index) => {
//     const copyUser = { ...user, cart: [...user.cart] };
//     copyUser.cart[index] = {
//       ...copyUser.cart[index],
//       quantity: copyUser.cart[index].quantity + 1
//     };
//     dispatch(asyncupdateuser(copyUser.id, copyUser));
//   };

//   const SubstractHandler = (index) => {
//     const copyUser = { ...user, cart: [...user.cart] };
//     if (copyUser.cart[index].quantity <= 1) {
//       copyUser.cart.splice(index, 1);
//     } else {
//       copyUser.cart[index] = {
//         ...copyUser.cart[index],
//         quantity: copyUser.cart[index].quantity - 1
//       };
//     }
//     dispatch(asyncupdateuser(copyUser.id, copyUser));
//   };

//   console.log("User cart:", user?.cart);

//   const cartlist = user?.cart?.map((o, i) => {
//     return (
//       <div
//         key={i}
//         className="items-center rounded mb-5 bg-zinc-200 flex justify-between p-2"
//       >
//         <img src={o.product.image} className="w-[10vmax] h-[10vmax]" alt="" />
//         <h1>{o.product.title}</h1>
//         <h1>${o.product.price}</h1>
//         <div className="space-x-3">
//           <button onClick={() => AddHandler(i)}>+</button>
//           <span>{o.quantity}</span>
//           <button onClick={() => SubstractHandler(i)}>-</button>
//         </div>
//         <Link to={`/product-info/${o.product.id}`} className="text-cyan-800">
//           back
//         </Link>
//       </div>
//     );
//   });
//   return <div className="">{cartlist}</div>;
// };

// export default Carts;

//----------------------------------------------------------------------------------------------


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../../store/actions/userActions";
import { Link } from "react-router-dom";

const Carts = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer?.user);

  // Log for debugging
  useEffect(() => {
    console.log("Redux User:", user);
  }, [user]);

  const AddHandler = (index) => {
    if (!user || !user.cart || !user.cart[index]) return;

    const copyUser = { ...user, cart: [...user.cart] };
    copyUser.cart[index] = {
      ...copyUser.cart[index],
      quantity: copyUser.cart[index].quantity + 1,
    };
    dispatch(asyncupdateuser(copyUser.id, copyUser));
  };

  const SubstractHandler = (index) => {
    if (!user || !user.cart || !user.cart[index]) return;

    const copyUser = { ...user, cart: [...user.cart] };

    if (copyUser.cart[index].quantity <= 1) {
      copyUser.cart.splice(index, 1);
    } else {
      copyUser.cart[index] = {
        ...copyUser.cart[index],
        quantity: copyUser.cart[index].quantity - 1,
      };
    }
    dispatch(asyncupdateuser(copyUser.id, copyUser));
  };

  // Guard for empty cart or missing product data
  const cartlist =
    user?.cart?.length > 0 ? (
      user.cart.map((item, index) => {
        if (!item?.product) return null;

        const { image, title, price, id } = item.product;

        return (
          <div
            key={index}
            className="items-center rounded mb-5 bg-zinc-200 flex justify-between p-2"
          >
            <img
              src={image}
              className="w-[10vmax] h-[10vmax] object-cover"
              alt={title}
            />
            <h1 className="w-1/4 truncate">{title}</h1>
            <h1>${price}</h1>
            <div className="space-x-3 flex items-center">
              <button
                onClick={() => AddHandler(index)}
                className="px-2 py-1 bg-green-300 rounded"
              >
                +
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => SubstractHandler(index)}
                className="px-2 py-1 bg-red-300 rounded"
              >
                -
              </button>
            </div>
            <Link
              to={`/product-info/${id}`}
              className="text-cyan-800 underline ml-4"
            >
              Back
            </Link>
          </div>
        );
      })
    ) : (
      <p className="text-gray-500">Your cart is empty.</p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-5">Your Shopping Cart</h2>
      {cartlist}
    </div>
  );
};

export default Carts;
