import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// Set up multer storage with unique filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Change this path as per your directory structure
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
    const extension = file.originalname.split(".").pop();
    cb(null, `${uniqueSuffix}.${extension}`);
  },
});

// Multer upload configuration without any file filters or size limits
export const upload = multer({
  storage,
});
