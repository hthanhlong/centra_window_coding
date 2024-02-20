import { Request, Response, NextFunction } from "express";
import { transporter } from "../middlewares";
import { AppValidationError, renderHTML, sendEmail } from "../utils";
import { ENV_VARIABLES } from "../config";
import { Attachments, IFormData } from "../types";
import { plainToClass } from "class-transformer";
import { FormInputDto } from "../dto/FormInput";

export const uploadFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let uploadedFiles = req.files as Express.Multer.File[]; // always at least one file
  const body = req.body as IFormData;
  const input = plainToClass(FormInputDto, body) as IFormData;
  const error = await AppValidationError(input);
  if (error) return res.status(404).send({ message: error });
  const attachments: Attachments[] = [];
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
  //send email
  const bodyMail = renderHTML(body, uploadedFiles, attachments); // create content for pdf file
  const result = await sendEmail(bodyMail);
  if (!result) res.status(400).send({ message: "Email not sent" });
  res.status(200).send({ message: "Email sent successfully" });
};
