import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

export const ENV_VARIABLES = {
  SENDEREMAIL: process.env.SENDEREMAIL,
  PASSWORD: process.env.PASSWORD,
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
