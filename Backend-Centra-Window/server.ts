import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import cors from "cors";
import { upload } from "./config";
import { errorHandler } from "./middlewares";
import { uploadFileController } from "./controllers";
import { AWSHandler } from "./controllers/awsHandler";
import { logger } from "./utils";

const app = express();
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction): void => {
  const uuid = Math.random().toString(6).substring(2, 15);
  req.traceID = uuid;
  let content = ["POST", "PUT"].includes(req.method) ? req.body : "";
  console.log("content ====>", content);
  logger.info(`${uuid}:::${req.method}:::${req.url}:::${content}`);
  next();
});

app.post("/get-upload-url", AWSHandler.generateUploadURL);
app.post("/upload", upload.array("file"), uploadFileController);

app.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Running ${PORT}`));
