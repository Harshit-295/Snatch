import React, { useContext, useEffect } from "react";
import CartCard from "../components/CartCard";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // wait until user is ready

    if (user) {
      fetchCart(user._id);
    } else {
      setCartItems([]); // no user? empty cart
    }
  }, [loading, user]);

  const fetchCart = async (userId) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/cart/${userId}`, {
        withCredentials: true,
      });
      setCartItems(data.cartItems);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartItems([]);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div data-theme="cupcake" className="min-h-screen p-4 bg-base-100">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {cartItems.map((product) => (
            <CartCard key={product.productId} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <p className="text-lg text-gray-500">Your cart is empty 😕</p>
          <button
            onClick={() => navigate("/home")}
            className="btn btn-primary"
          >
            🔙 Back to Home
          </button>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/home")}
            className="btn btn-outline btn-accent"
          >
            🔙 Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
