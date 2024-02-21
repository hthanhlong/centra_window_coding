import { Attachments, IFormData } from "./types";
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
  attachments: Attachments[]
) => {
  let textContent = "";
  const title = data.work_order_number;
  for (const key in data) {
    if (key === "file") continue;
    textContent += `<div>${UPPERCASE_MAP_CONTENT[key as keyof IFormData]}: ${
      data[key as keyof IFormData]
    }<div>\n`;
  }
  if (!uploadedFiles.length) return { textContent, attachments };
  // render if there is attachment file is a image
  for (const file of uploadedFiles) {
    if (file.mimetype.includes("image")) {
      const id = generateId();
      textContent += `<div><img src="cid:${id}" style="width:400px;height:400px;"/></div>`;
      attachments.push({
        filename: file.filename,
        path: file.path,
        contentType: file.mimetype,
        cid: id,
      });
    } else {
      attachments.push({
        filename: file.filename,
        path: file.path,
        contentType: file.mimetype,
      });
    }
  }

  return { title, textContent, attachments };
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

export const getBucketParams = (fileName: string) => {
  return {
    Bucket: "your-bucket-name",
    Key: fileName,
    ContentType: "multipart/form-data",
    ACL: "public-read", // or 'private' if you want the uploaded file to be private
  };
};
