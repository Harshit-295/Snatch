import express from "express"
import { Router } from "express"
import { addToCart,getCart,removeFromCart} from "../controllers/cart.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";


const router = Router()

router.route("/cart").get(verifyjwt,getCart)
router.route("/addtocart").post(verifyjwt,addToCart)
router.route("/removefromcart").delete(verifyjwt,removeFromCart);


export default router
