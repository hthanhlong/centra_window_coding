import { fileScreenShot, IFormData } from "./types";
import { UPPERCASE_MAP_CONTENT } from "./constants";
import { ValidationError, validate } from "class-validator";
import { transporter } from "./middlewares";
import { ENV_VARIABLES } from "./config";

export const generateId = () => {
  return `${Math.random().toString(6)}-${Date.now()}`;
};

export const renderHTML = (
  data: IFormData,
  uploadedFiles: Express.Multer.File[],
  fileScreenShot: fileScreenShot[]
) => {
  const files = [];
  const title = data.work_order_number;

  let textContent = "";
  for (const key in data) {
    if (key === "file") continue;
    textContent += `<div>${UPPERCASE_MAP_CONTENT[key as keyof IFormData]}: ${
      data[key as keyof IFormData]
    }<div>\n`;
  }

  if (!uploadedFiles.length) {
    files.push(fileScreenShot);
    return { textContent, files };
  }
  // render if there is attachment file is a image

  for (const file of uploadedFiles) {
    if (file.mimetype.includes("image")) {
      const id = generateId();
      textContent += `<div><img src="cid:${id}" style="width:400px;height:400px;"/></div>`;
      files.push({
        filename: file.filename,
        path: file.path,
        contentType: file.mimetype,
        cid: id,
      });
    } else {
      files.push({
        filename: file.filename,
        path: file.path,
        contentType: file.mimetype,
      });
    }
  }

  return { title, textContent, files };
};

export const AppValidationError = async (
  input: any
): Promise<ValidationError[] | false> => {
  const error = await validate(input, {
    ValidationError: { target: true },
  });
  if (error.length) {
    return error;
  }
  return false;
};

export const sendEmail = (body: Record<string, any>) => {
  const options = {
    from: `${ENV_VARIABLES.SENDEREMAIL}`,
    to: ["jameshoang497@gmail.com"], // hard code for fitting requirements
    subject: `W/O# ${body.title} - New Order Intake – Supply & Install`,
    html: body.textContent,
    attachments: body.attachments,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail({ ...options }, (error: Error | null, _: any) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

export const getBucketParams = (
  BucketName: string,
  file: Express.Multer.File
) => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const defaultKey = `uploads/${file.filename}-${Date.now()}-${randomNumber}`;

  return {
    Bucket: BucketName,
    Key: defaultKey,
    ContentType: file.mimetype,
    ACL: "public-read", // Set ACL to allow public read access to the uploaded file
    Expires: 300,
  };
};
