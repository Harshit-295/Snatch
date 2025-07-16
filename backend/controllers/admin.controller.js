import Product from "../models/productModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"

import {uploadonCloudinary} from "../utils/cloudinary.js"

const addProduct = asyncHandler(async (req,res) =>{
    try {
        //data req body se data
        // verify them 
        //create new product 
        const {name,description,price,stock,category} = req.body;
        if (!name?.trim() || !description?.trim() || !category?.trim() || price == null || stock == null) {
            throw new ApiError(400, "All fields are required");
        }
        const productimagepath = req.files?.productimage?.[0].path;
        if(!productimagepath){
            throw new ApiError(404,"image reqiured")
        }
        const productimage = await uploadonCloudinary(productimagepath);
        if(!productimage){
            throw new ApiError(404,"Path is found");
        }
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            productimage : productimage.url,
            category,
            createdBy:req.user?._id,
        })

        return res.status(201).json(
            new ApiResponse(200,
                product,
                "product created succesfully"
            )
            
        )
    } catch (error) {
        console.error(error);
        throw new ApiError(500, error?.message || "Error in forming product");
    }
})

export {
    addProduct
}