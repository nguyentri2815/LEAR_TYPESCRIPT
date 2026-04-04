import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import FieldShell from "./FieldShell";

interface FormTextareaFieldProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  description?: string;
}

const FormTextareaField = <TFieldValues extends FieldValues>(
  props: FormTextareaFieldProps<TFieldValues>,
) => {
  const { label, name, placeholder, register, error, description } = props;

  return (
    <FieldShell label={label} error={error} description={description}>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className="min-h-28 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      />
    </FieldShell>
  );
};

export default FormTextareaField;
