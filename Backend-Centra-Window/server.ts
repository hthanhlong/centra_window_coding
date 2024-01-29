import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import { upload } from "./config";
import { createPDF } from "./utils";
import { errorHandler } from "./middlewares/ErrorHandler";

//config
const app = express();
const PORT = process.env.PORT || 8080;

app.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    const uploadedFile = req.file;
    const body = req.body;
    if (!Object.keys(body).length) {
      return res.status(400).send({ message: "Bad request" });
    }
    createPDF(body, uploadedFile);
    res
      .status(200)
      .send({ message: "File uploaded and sent mail successfully" });
  }
);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Running ${PORT}`));
