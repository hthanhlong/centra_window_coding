import express from "express";
import multer from "multer";

//config
const app = express();
const upload = multer({ dest: "uploads/" });
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/profile", upload.single("file"), function (req, res, next) {});

app.listen(PORT, () => console.log("Server Running"));
