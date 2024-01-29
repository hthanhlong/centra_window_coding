import { useId, useRef, useState } from "react";
import { ImageConfig } from "../configs";
import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../type";

const DraggableInput = ({
  section,
  register,
}: {
  section: string;
  register: UseFormRegister<IFormInput>;
}) => {
  const fileInputRef = useRef<HTMLLabelElement>(null);
  const id = useId();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result?.toString();
        if (result?.includes("data:application/pdf;base64,")) {
          setPreviewUrl(ImageConfig.pdf);
        } else {
          setPreviewUrl(reader.result?.toString() || undefined);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border-slate-100 border-[1px] h-full">
      <h1 className="bg-slate-200 p-1">{section}</h1>
      <div className="h-[190px] p-2">
        <div className="relative h-[174px] mb-2 flex justify-center items-center border-dashed border-indigo-600 border-2 ">
          <>
            {previewUrl && (
              <img
                onClick={triggerUpload}
                src={previewUrl}
                alt="Preview"
                className="h-full w-full absolute cursor-pointer z-10"
              />
            )}
            <label ref={fileInputRef} htmlFor={id}>
              Drag here or click to add file
            </label>
            <input
              {...register("file" as keyof IFormInput)}
              id={id}
              name="file"
              type="file"
              onChange={onFileDrop}
              className="opacity-0 h-full w-full absolute cursor-pointer"
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default DraggableInput;
