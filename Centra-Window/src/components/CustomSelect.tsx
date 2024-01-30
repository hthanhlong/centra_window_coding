import { ICustomSelectProps, IFormInput } from "../type";

const CustomSelect = ({
  label,
  rules,
  options,
  name,
  error,
  register,
}: ICustomSelectProps) => {
  return (
    <div className="flex">
      <label className="w-1/2 text-[12px]">
        {label}
        {rules.required ? <span className="text-rose-500"> * </span> : null}
      </label>
      <div className="w-1/2">
        <select
          {...register(name as keyof IFormInput, { ...rules })}
          className="w-full border border-slate-100 rounded-sm px-2 text-[12px] h-[30px]"
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        {error && (
          <span className="text-rose-500 text-[12px]">{error.message}</span>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
