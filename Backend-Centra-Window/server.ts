import express, { Request, Response } from "express";
import "reflect-metadata";
import cors from "cors";
import { upload } from "./config";
import { errorHandler } from "./middlewares";
import { uploadFileController } from "./controllers";
import { AWSHandler } from "./controllers/awsHandler";

const app = express();
app.use(cors());

app.post("/get-upload-url", AWSHandler.generateUploadURL);
app.post("/upload", upload.array("file"), uploadFileController);

app.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Running ${PORT}`));
