import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addcart } = useContext(CartContext);

  return (
    <div className="card bg-base-100 w-full max-w-xs shadow-sm hover:shadow-lg transition">
      <figure>
        <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.productimage || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={product.name}
             className="h-full w-full object-contain"
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-sm">{product.description}</p>
        <p className="font-bold text-lg text-green-600">₹ {product.price}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => addcart(product._id)}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
