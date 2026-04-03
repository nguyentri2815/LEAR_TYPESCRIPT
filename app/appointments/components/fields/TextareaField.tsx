import React from "react";
import FieldShell from "./FieldShell";

interface TextareaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  register: any; // Thay 'any' bằng kiểu dữ liệu phù hợp nếu có thể
  error?: string;
  description?: string;
}
const TextareaField = (props: TextareaFieldProps) => {
  const { label, name, placeholder, register, error, description, ...rest } = props;
  return (
    <FieldShell label={label} error={error} description={description}>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className="min-h-28 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        {...rest}
      />
    </FieldShell>
  );
};

export default TextareaField;
