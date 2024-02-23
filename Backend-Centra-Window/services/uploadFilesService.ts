export class UploadFilesService {
  fileScreenShot: fileScreenShot[];
  uploadedFiles: Express.Multer.File[] = [];

  constructor(uploadFile: Express.Multer.File[]) {
    this.uploadedFiles = uploadFile;
  }

  handleBeforeSendMail() {
    const screenShotPDF = this.uploadedFiles?.find((file) => {
      return file?.originalname.includes("form-html-to-pdf");
    });
    if (screenShotPDF) {
      const data = {
        filename: screenShotPDF.filename,
        path: screenShotPDF.path,
        contentType: screenShotPDF.mimetype,
      };
      this.fileScreenShot.push(data);
      this.uploadedFiles = this.uploadedFiles.filter((file) => {
        return !file.originalname.includes("form-html-to-pdf");
      });
    }
    return {
      fileScreenShot: this.fileScreenShot,
      uploadedFiles: this.uploadedFiles,
    };
  }
}
