import fs from "fs";
import PDFDocument from "pdfkit";
import { IFormData } from "./types";
import { UPPERCASE_MAP_CONTENT } from "./constants";

export const createPDF = (
  data: IFormData,
  file: Express.Multer.File | undefined
) => {
  const doc = new PDFDocument();

  const fileName = `output-${Date.now()}.pdf`;
  const pathName = `./output/${fileName}`;
  const stream = fs.createWriteStream(pathName);
  doc.pipe(stream);

  doc
    .fontSize(24)
    .text(`WORK NUMBER: ${data["work_order_number"]}`, { align: "center" });

  for (const key in data) {
    if (key !== "file") {
      doc
        .fontSize(10)
        .text(
          `${UPPERCASE_MAP_CONTENT[key as keyof IFormData]}: ${
            data[key as keyof IFormData]
          }`,
          { align: "left" }
        );
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

  return { fileName, pathName };
};

export const convertTextContent = (data: IFormData) => {
  let textContent = "";
  for (const key in data) {
    if (key !== "file") {
      textContent += `${UPPERCASE_MAP_CONTENT[key as keyof IFormData]}: ${
        data[key as keyof IFormData]
      }\n`;
    }
  }
  return textContent;
};
