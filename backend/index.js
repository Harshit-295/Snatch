import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
})

console.log("🌎 Environment variables loaded:");
console.log({
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
});
import { configureCloudinary } from "./utils/cloudinary.js";
configureCloudinary();

import {app} from './app.js'
import connectDB from "./db/index.js";


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is runnig at port : ${process.env.PORT}`)
    })
})

.catch((err)=>{
    console.log("MOngo db connection failed!!!",err)
})
