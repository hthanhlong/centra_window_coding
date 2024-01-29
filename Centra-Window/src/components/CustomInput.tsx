import { ICustomInputProps, IFormInput } from "../type";

const CustomInput = ({
  label,
  rules,
  placeholder,
  type,
  name,
  error,
  register,
}: ICustomInputProps) => {
  return (
    <div className="flex">
      <label className="w-1/2 text-[12px]">
        {label}
        {rules.required ? (
          <span className="-mt-8 text-rose-500"> * </span>
        ) : null}
      </label>
      <div className="w-1/2">
        <input
          {...register(name as keyof IFormInput, { ...rules })}
          className="border border-slate-100 rounded-sm px-2 text-[12px]"
          min={0}
          type={type}
          placeholder={placeholder}
        />
        {error && (
          <span className="text-rose-500 text-[12px]">{error.message}</span>
        )}
      </div>
    </div>
  );
};
export default CustomInput;
