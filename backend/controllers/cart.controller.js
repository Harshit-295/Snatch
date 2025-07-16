import Cart from "../models/cartModel.js"
import mongoose from "mongoose";
import Product from "../models/productModel.js"
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// Add to cart 
const addToCart = asyncHandler(async (req, res) => {
  const user_id = req.user?._id;
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // check if user has cart
  let cart = await Cart.findOne({ user: user_id }); // <- you missed `await` here and you were checking `Cart` instead of `cart`

  if (!cart) {
    // if no cart, create a new one
    cart = await Cart.create({
      user: user_id,
      products: [{ product: productId, quantity: quantity || 1 }]
    });
  } else {
    // cart exists
    const index = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (index !== -1) {
      // product already in cart -> update quantity
      cart.products[index].quantity += quantity || 1;
    } else {
      // product not in cart -> add new
      cart.products.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Product added to cart successfully"));
});


// get the cart

const getCart = asyncHandler(async (req, res) => {
  const user_id = req.user?._id;

  const cart = await Cart.findOne({ user: user_id }).populate('products.product');

  if (!cart || cart.products.length === 0) {
    return res.json(
        new ApiResponse(200, [], "Your cart is empty")
    );
  }

  const formattedCart = cart.products.map((item) => {
    return {
      productId: item.product._id,
      image:item.product.productimage,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      total: item.quantity * item.product.price
    };
  });

  return res.json(
    new ApiResponse(200, formattedCart, "Your cart retrieved successfully")
  );
});



const removeFromCart = asyncHandler(async (req, res) => {
  const user_id = req.user?._id;
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const cart = await Cart.findOne({ user: user_id });

  if (!cart || cart.products.length === 0) {
    throw new ApiError(404, "Your cart is empty");
  }

  const index = cart.products.findIndex(
    (p) => p.product.toString() === productId
  );

  if (index === -1) {
    throw new ApiError(404, "Product not found in your cart");
  }

  const reduceBy = quantity || 1;

  // Reduce the quantity
  cart.products[index].quantity -= reduceBy;

  if (cart.products[index].quantity <= 0) {
    // Remove the item if quantity <= 0
    cart.products.splice(index, 1);
  }

  await cart.save();

  return res.json(
    new ApiResponse(200, cart, "Product updated in cart successfully")
  );
});



export {
    addToCart,
    getCart,
    removeFromCart,
}