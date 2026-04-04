import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import FieldShell from "./FieldShell";

interface FormSelectFieldProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  options: { value: string; label: string }[];
  register: UseFormRegister<TFieldValues>;
  error?: string;
  description?: string;
}

const FormSelectField = <TFieldValues extends FieldValues>(
  props: FormSelectFieldProps<TFieldValues>,
) => {
  const { options, name, label, error, description, register } = props;

  return (
    <FieldShell label={label} error={error} description={description}>
      <select
        title={name}
        {...register(name)}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        <option value="">Select customer</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
};

export default FormSelectField;
