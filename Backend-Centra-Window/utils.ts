import fs from "fs";
import PDFDocument from "pdfkit";
import { IFormData } from "./types";

export const createPDF = (
  data: IFormData,
  file: Express.Multer.File | undefined
) => {
  const doc = new PDFDocument();

  const random = Math.floor(Math.random() * 1000);
  const stream = fs.createWriteStream(`./output/output-${random}.pdf`);
  doc.pipe(stream);

  doc
    .fontSize(24)
    .text(`WORK NUMBER: ${data["work_order_number"]}`, { align: "center" });

  for (const key in data) {
    if (key !== "file") {
      doc
        .fontSize(10)
        .text(`${key}: ${data[key as keyof IFormData]}`, { align: "left" });
    }
  }

  if (file && file.mimetype.includes("image")) {
    // handle file
    const imagePath = file.path;
    doc.image(imagePath, {
      fit: [250, 250],
      align: "center",
    });
  }

  doc.end();
  stream.on("finish", () => {
    console.log("PDF created successfully");
  });
};
