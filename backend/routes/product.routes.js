import express from "express"
import { Router } from "express"
import { getProducts,getProductByid } from "../controllers/product.controller.js"


const router = Router()

router.route("/home").get(getProducts);
router.route("/home/:id").get(getProductByid);


export default router;