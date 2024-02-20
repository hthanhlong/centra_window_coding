import { Request, Response } from "express";
import { AppValidationError, renderHTML, sendEmail } from "../utils";
import { IFormData } from "../types";
import { plainToClass } from "class-transformer";
import { FormInputDto } from "../dto/FormInput";
import { UploadFilesService } from "../services/uploadFilesService";

export const uploadFileController = async (req: Request, res: Response) => {
  const body = req.body as IFormData;
  const input = plainToClass(FormInputDto, body) as IFormData;
  const error = await AppValidationError(input);
  if (error) return res.status(404).send({ message: error });
  const uploadFilesService = new UploadFilesService(req.files as Express.Multer.File[]);
  const { attachments, uploadedFiles } = uploadFilesService.handleUpload();
  const bodyMail = renderHTML(body, uploadedFiles, attachments); // create content for pdf file
  const result = await sendEmail(bodyMail);
  if (!result) res.status(400).send({ message: "Email not sent" });
  res.status(200).send({ message: "Email sent successfully" });
};
