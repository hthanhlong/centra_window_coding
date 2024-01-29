import { Request, Response, NextFunction } from "express";
import { transporter } from "../middlewares";
import { createPDF } from "../utils";
import { ENV_VARIABLES } from "../config";

export const uploadFilerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadedFile: Express.Multer.File | undefined = req.file;
  const body = req.body;
  if (!Object.keys(body).length) {
    return res.status(400).send({ message: "Bad request" });
  }

  createPDF(body, uploadedFile);

  const { work_order_number } = body;

  transporter.sendMail(
    {
      from: `${ENV_VARIABLES.SENDEREMAIL}`,
      to: `${ENV_VARIABLES.RECEIVEREMAIL}`,
      subject: `W/O# ${work_order_number} - New Order Intake – Supply & Install`,
      text: "Hello world?",
      ...(uploadedFile && {
        attachments: [
          {
            filename: uploadedFile.originalname,
            path: uploadedFile.path,
            contentType: uploadedFile.mimetype,
          },
        ],
      }),
    },
    (error: Error | null, info: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );

  res.status(200).send({ message: "File uploaded and sent mail successfully" });
};
