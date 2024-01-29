import { Request, Response, NextFunction } from "express";
import { transporter } from "../middlewares";
import { convertTextContent, createPDF } from "../utils";
import { ENV_VARIABLES } from "../config";
import { IFormData } from "../types";

export const uploadFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadedFile: Express.Multer.File | undefined = req.file;
  const body: IFormData = req.body;
  if (!Object.keys(body).length) {
    return res.status(400).send({ message: "Bad request" });
  }
  const { fileName, pathName } = createPDF(body, uploadedFile);
  const { work_order_number } = body;
  const textContent = convertTextContent(body);
  const attachments = [
    {
      filename: fileName,
      path: pathName,
      contentType: "application/pdf",
    },
  ];
  if (uploadedFile) {
    attachments.push({
      filename: uploadedFile.originalname,
      path: uploadedFile.path,
      contentType: uploadedFile.mimetype,
    });
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: `${ENV_VARIABLES.SENDEREMAIL}`,
        to: ["VKhatri@centra.ca", "mxu@centra.ca"], // hard code for fitting requirements
        subject: `W/O# ${work_order_number} - New Order Intake – Supply & Install`,
        text: `${textContent}`,
        attachments: attachments,
      },
      (error: Error | null, info: any) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(true);
        }
      }
    );
  })
    .then((result) => {
      if (result) res.status(200).send({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({ message: "Email not sent" });
    });
};
