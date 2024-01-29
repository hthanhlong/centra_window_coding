import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DraggableInput, FormSection } from "../components";
import { FormSettings } from "../constant";
import { IFormInput } from "../type";
import { schema } from "../schema";

const Layout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver<IFormInput>(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "file") {
        const file = data[key]?.[0];
        if (file) formData.append(key, file);
      } else {
        formData.append(key, data[key]);
      }
    }

    const res = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Success");
    }

    await res.json();

    console.log("res", res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="bg-blue-600 h-10 grid place-items-center">
        <p>New Order Intake – Supply & Install</p>
      </h1>
      <div className="grid grid-cols-2 gap-4 my-1">
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
          className="inline-block border py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white mr-3 w-60 rounded-sm"
        >
          Submit
        </button>
        <button className="inline-block border py-2 px-4 bg-neutral-300 hover:bg-blue-700 text-white w-60 rounded-sm">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Layout;
