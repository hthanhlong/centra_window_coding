import fs from "fs";
import PDFDocument from "pdfkit";

export const createPDF = (data: any, file: any) => {
  const doc = new PDFDocument();

  const random = Math.floor(Math.random() * 1000);
  const stream = fs.createWriteStream(`./output/output-${random}.pdf`);
  doc.pipe(stream);

  doc
    .fontSize(24)
    .text(`WORK NUMBER: ${data["work_order_number"]}`, { align: "center" });

  for (const key in data) {
    doc.fontSize(10).text(`${key}: ${data[key]}`, { align: "left" });
  }

  if (file) {
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
