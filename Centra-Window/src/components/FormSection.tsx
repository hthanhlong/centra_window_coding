import { CustomInput, CustomSelect } from ".";
import { IChildForm, IFormSection } from "../type";

const FormSection = ({
  section,
  columns,
  register,
  errors = {},
}: IFormSection) => {
  const renderInput = (input: IChildForm) => {
    switch (input.type) {
      case "select":
        return (
          <CustomSelect
            label={input.label}
            rules={input.rules}
            options={input.options ?? []}
            name={input.name}
            register={register}
            error={errors[input.name]}
          />
        );
      default:
        return (
          <CustomInput
            label={input.label}
            rules={input.rules}
            placeholder={input.placeholder}
            type={input.type}
            name={input.name}
            register={register}
            error={errors[input.name]}
          />
        );
    }
  };

  return (
    <div className="border-slate-100 border-[1px] h-full">
      <h1 className="bg-slate-200 p-1">{section}</h1>
      <div className="grid grid-cols-2">
        {columns.map((column, index) => (
          <div key={index} className="m-1">
            {column.rows.map((row: IChildForm) => (
              <div key={row.label} className="m-1">
                {renderInput(row)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSection;
