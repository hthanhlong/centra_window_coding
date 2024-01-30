import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { DraggableInput, FormSection } from "../components";
import { FormSettings } from "../constant";
import { IFormInput } from "../type";
import { schema } from "../schema";
import { formatPhoneNumber } from "../utils";
import { toast } from "react-toastify";
import { API_HOST } from "../configs";

const Layout = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false); // State to handle the loading state of the submit button
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver<IFormInput>(schema),
  });

  const phoneNumber = watch("phone_number", ""); // Watch for changes in the phone_number field

  const handleTransformData = (data: IFormInput) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "file") {
        const file = data[key]?.[0];
        if (file) formData.append(key, file);
      } else {
        formData.append(key, data[key as keyof IFormInput] as string);
      }
    }

    return formData;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const formData = handleTransformData(data);
    const { pdfFile } = await renderPDFFromForm();
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
    try {
      setIsLoading(true);
      const res = await fetch(`${API_HOST}/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const { message } = (await res.json()) as { message: string };
        toast(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const renderPDFFromForm = async () => {
    const form = formRef.current;
    let pdfFile = null;

    if (form) {
      await html2canvas(form)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          const pdf = new jsPDF();
          pdf.addImage(imgData, "JPEG", 5, 5, 200, 0);
          const pdfArrayBuffer = pdf.output("arraybuffer");
          const pdfBlob = new Blob([pdfArrayBuffer], {
            type: "application/pdf",
          });
          pdfFile = new File([pdfBlob], `form-html-to-pdf-${Date.now()}.pdf`, {
            type: "application/pdf",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return { pdfFile };
  };

  useEffect(() => {
    setValue("phone_number", formatPhoneNumber(phoneNumber));
  }, [phoneNumber, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <h1 className="bg-blue-600 h-10 grid place-items-center text-white">
        <p>New Order Intake – Supply & Install</p>
      </h1>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 my-1">
        {FormSettings.map((item, index) => {
          if (item.section === "Attachments") {
            return (
              <DraggableInput
                key={index}
                section={item.section}
                register={register}
              />
            );
          } else {
            return (
              <FormSection
                key={index}
                section={item.section}
                columns={item.columns}
                register={register}
                errors={errors}
              />
            );
          }
        })}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-block border py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white mr-3 w-60 rounded-sm"
        >
          {isLoading ? <span> ... Loading</span> : <span>Submit</span>}
        </button>
        <button className="inline-block border py-2 px-4 bg-neutral-300 hover:bg-blue-700 text-white w-60 rounded-sm">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Layout;
