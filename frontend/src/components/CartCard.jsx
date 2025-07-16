import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartCard({ product }) {
  const { removefromcart } = useContext(CartContext);

  return (
    <div className="card bg-base-100 w-full max-w-xs  shadow-sm hover:shadow-lg transition">
      <figure>
        <img
          src={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-sm">Quantity: {product.quantity}</p>
        <p className="font-bold text-lg text-green-600">
          ₹ {product.price}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => removefromcart(product.productId)}
            className="btn btn-primary"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;

