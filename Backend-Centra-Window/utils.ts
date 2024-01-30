import { Attachments, IFormData } from "./types";
import { UPPERCASE_MAP_CONTENT } from "./constants";

export const generateId = () => {
  return `${Math.random().toString(6)}-${Date.now()}`;
};

export const renderHTML = (
  data: IFormData,
  uploadedFiles: Express.Multer.File[],
  attachments: Attachments[]
) => {
  let textContent = "";

  for (const key in data) {
    if (key === "file") continue;
    textContent += `<div>${UPPERCASE_MAP_CONTENT[key as keyof IFormData]}: ${
      data[key as keyof IFormData]
    }<div>\n`;
  }

  // render if there is attachment file is a image
  if (!uploadedFiles.length) return { textContent, attachments };
  for (const file of uploadedFiles) {
    if ((file as any).mimetype.includes("image")) {
      const id = generateId();
      textContent += `<div><img src="cid:${id}" style="width:400px;height:400px;"/></div>`;
      attachments.push({
        filename: (file as any).filename,
        path: (file as any).path,
        contentType: (file as any).mimetype,
        cid: id,
      });
    } else {
      attachments.push({
        filename: (file as any).filename,
        path: (file as any).path,
        contentType: (file as any).mimetype,
      });
    }
  }

  return { textContent, attachments };
};
