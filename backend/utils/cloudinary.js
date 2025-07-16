import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const configureCloudinary = () => {
  console.log("🔗 Configuring Cloudinary with:");
  console.log({
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};


const uploadonCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    console.error("No local file path provided to upload.");
    return null;
  }

  try {
    console.log(`Uploading file: ${localFilePath}`);
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary:", response.secure_url);
    fs.unlinkSync(localFilePath); // clean up local file
    return response;

  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // clean up local file even if failed
    }

    return null;
  }
};

export { configureCloudinary, uploadonCloudinary };
