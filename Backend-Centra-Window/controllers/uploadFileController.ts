import { Request, Response } from "express";
import { AppValidationError, renderHTML, sendEmail } from "../utils";
import { plainToClass } from "class-transformer";
import { FormInputDto } from "../dto/FormInput";
import { UploadFilesService } from "../services/uploadFilesService";

export const uploadFileController = async (req: Request, res: Response) => {
  const body = req.body as IFormData;
  const input = plainToClass(FormInputDto, body) as IFormData;
  const error = await AppValidationError(input);
  if (error) return res.status(404).send({ message: error });
  const uploadService = new UploadFilesService(req.files as EMuFile[]);
  const { fileScreenShot, uploadedFiles } =
    uploadService.handleBeforeSendMail();
  const bodyMail = renderHTML(body, uploadedFiles, fileScreenShot); // create content for pdf file
  const result = await sendEmail(bodyMail);
  if (false) res.status(400).send({ message: "Email not sent" });
  res.status(200).send({ message: "Email sent successfully" });
};
