import html2canvas from "html2canvas";
import { IFormInput } from "../type";
import jsPDF from "jspdf";

export const renderPDFFromForm = async (formRef: HTMLFormElement | null) => {
  const form = formRef ? formRef.current : null;
  if (form) {
    try {
      const canvas = await html2canvas(form);
      if (canvas) {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 5, 5, 200, 0);
        const pdfArrayBuffer = pdf.output("arraybuffer");
        const pdfBlob = new Blob([pdfArrayBuffer], {
          type: "application/pdf",
        });
        const pdfFile = new File(
          [pdfBlob],
          `form-html-to-pdf-${Date.now()}.pdf`,
          {
            type: "application/pdf",
          }
        );
        return pdfFile;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

export const handleFormData = (data: IFormInput, pdfFile: File | null) => {

  const formData = new FormData();
  for (const key in data) {
    if (key === "file") {
      const file = data[key]?.[0];
      if (file) formData.append(key, file);
    } else {
      formData.append(key, data[key as keyof IFormInput] as string);
    }
  }

  if (pdfFile) {
    const files: File[] = [];
    const uploadFile = formData.get("file");
    if (uploadFile) {
      formData.delete("file");
      files.push(uploadFile as File);
      files.push(pdfFile as File);
    } else {
      files.push(pdfFile as File);
    }
    files.forEach((file) => {
      formData.append("file", file);
    });
  }
  return formData;
};
