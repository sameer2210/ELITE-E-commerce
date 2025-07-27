const CartSummary = ({ cartItems, onCheckout }) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-summary p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold">Cart Summary</h3>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
      <button
        onClick={onCheckout}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
