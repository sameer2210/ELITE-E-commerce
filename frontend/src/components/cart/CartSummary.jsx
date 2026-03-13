const CartSummary = ({ cartItems = [], onCheckout }) => {
  const totalItems = cartItems.length;

  return (
    <div className="cart-summary p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold">Saved Projects</h3>
      <p>Total Saved: {totalItems}</p>
      {onCheckout && (
        <button
          onClick={onCheckout}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Explore Projects
        </button>
      )}
    </div>
  );
};

export default CartSummary;
