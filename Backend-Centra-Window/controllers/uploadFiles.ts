import { Request, Response, NextFunction } from "express";
import { transporter } from "../middlewares";
import { renderHTML } from "../utils";
import { ENV_VARIABLES } from "../config";
import { Attachments, IFormData } from "../types";

export const uploadFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let uploadedFiles = req.files as Express.Multer.File[]; // always at least one file
  const body: IFormData = req.body;
  const attachments: Attachments[] = [];
  if (!Object.keys(body).length) {
    return res.status(400).send({ message: "Bad request" });
  }
  const screenFormPDF = uploadedFiles?.find((file: Express.Multer.File) => {
    if (file && file.originalname.includes("form-html-to-pdf")) return file;
  });
  if (screenFormPDF) {
    attachments.push({
      filename: screenFormPDF.filename,
      path: screenFormPDF.path,
      contentType: screenFormPDF.mimetype,
    });
    uploadedFiles = uploadedFiles.filter((file) => {
      return !file.originalname.includes("form-html-to-pdf");
    });
  }
  const { work_order_number } = body; // create title for pdf file
  const bodyMail = renderHTML(body, uploadedFiles, attachments); // create content for pdf file
  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: `${ENV_VARIABLES.SENDEREMAIL}`,
        to: ["VKhatri@centra.ca", "mxu@centra.ca"], // hard code for fitting requirements
        subject: `W/O# ${work_order_number} - New Order Intake – Supply & Install`,
        html: bodyMail.textContent,
        attachments: bodyMail.attachments,
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
