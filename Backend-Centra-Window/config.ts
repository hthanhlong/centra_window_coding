import multer from "multer";
import dotenv from "dotenv";
import AWS from "aws-sdk";
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

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "YOUR_S3_REGION",
});

export const S3custom = new AWS.S3();
