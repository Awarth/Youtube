import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const uploadOnCLoudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File uploaded successfully, remove the local file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Attempt to remove the local file even if the upload failed
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }

    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

const deleteFromCloudinary = async (cloudinaryUrl) => {
  try {
    if (!cloudinaryUrl) {
      throw new ApiError(400, "Public URL should be provided");
    }

    const public_id = cloudinaryUrl.split("/").pop().split(".")[0];

    const response = await cloudinary.uploader.destroy(public_id);

    return response;
  } catch (error) {
    console.error("Error while deleting the file from Cloudinary:", error);
    throw new ApiError(500, "Failed to delete file from Cloudinary");
  }
};

export { uploadOnCLoudinary, deleteFromCloudinary };
