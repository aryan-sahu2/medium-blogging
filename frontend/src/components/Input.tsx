import { ChangeEvent } from "react";

interface labelledInput {
  label: string;
  placeholder: string;
  type?: string;
  purpose?:string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Input = ({
  label,
  placeholder,
  type,
  onChange,
}: labelledInput) => {
  return (
    <div className={`mb-3 `}>       
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        id={label}
        onChange={onChange}
        type={type}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 `}
        placeholder={placeholder}
        required
      />
    </div>
  );
};
