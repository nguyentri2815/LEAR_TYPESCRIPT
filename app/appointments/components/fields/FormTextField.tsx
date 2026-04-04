import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import FieldShell from "./FieldShell";

interface FormTextFieldProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  type?: "text" | "number";
  description?: string;
}

const FormTextField = <TFieldValues extends FieldValues>(
  props: FormTextFieldProps<TFieldValues>,
) => {
  const { label, name, register, type = "text", error, description } = props;

  return (
    <FieldShell label={label} error={error} description={description}>
      <input
        title={name}
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        {...register(name, { valueAsNumber: type === "number" })}
      />
    </FieldShell>
  );
};

export default FormTextField;
