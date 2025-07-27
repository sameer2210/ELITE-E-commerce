
export const asyncAddtoCartProduct = (user, product, id) => {
  try {
    const copyUser = { ...user, cart: [...(user.cart || [])] };
    const index = copyUser?.cart.findIndex((x) => x?.product.id == id);
    if (index == -1) {
      copyUser.cart.push({ product, quantity: 1 });
    } else {
      copyUser.cart[index] = {
        product,
        quantity: copyUser.cart[index].quantity + 1
      };
    }
    return copyUser;
  } catch (error) {
    console.error("Error in asyncAddtoCartProduct in productAction.jsx", error);
    return user;
  }
};
