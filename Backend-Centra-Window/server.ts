import express, { Request, Response } from "express";
import { upload } from "./config";
import { errorHandler } from "./middlewares";
import { uploadFileController } from "./controllers/uploadFiles";

//config
const app = express();
const PORT = process.env.PORT || 8080;

app.post("/upload", upload.single("file"), uploadFileController);

app.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Running ${PORT}`));
