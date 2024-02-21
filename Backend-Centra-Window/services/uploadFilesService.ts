import { Attachments } from "../types";

export class UploadFilesService {
  attachments: Attachments[] = [];
  uploadedFiles: Express.Multer.File[] = [];

  constructor(uploadFile: Express.Multer.File[]) {
    this.uploadedFiles = uploadFile;
  }

  handleUpload() {
    const screenFormPDF = this.uploadedFiles?.find((file) => {
      return file?.originalname.includes("form-html-to-pdf");
    });
    if (screenFormPDF) {
      const data = {
        filename: screenFormPDF.filename,
        path: screenFormPDF.path,
        contentType: screenFormPDF.mimetype,
      };
      this.attachments.push(data);
      this.uploadedFiles = this.uploadedFiles.filter((file) => {
        return !file.originalname.includes("form-html-to-pdf");
      });
    }
    return { attachments: this.attachments, uploadedFiles: this.uploadedFiles };
  }
}
