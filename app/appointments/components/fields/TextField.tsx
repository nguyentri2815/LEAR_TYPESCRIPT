import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import FieldShell from "./FieldShell";

interface TextFieldProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>; // trường hợp này sau này sẽ áp dụng generic type để xác định rõ hơn kiểu dữ liệu của form
  error?: string;
  type?: "text" | "number";
  description?: string;
}

const TextField = <TFieldValues extends FieldValues>(
  props: TextFieldProps<TFieldValues>,
) => {
  const { label, name,  register, type, error, description, ...rest } = props;
  return (
    <FieldShell label={label} error={error} description={description}>
      <input
        title={name}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        {...register(name, { valueAsNumber: type === "number" })}
        {...rest}
      />
    </FieldShell>
  );
};

export default TextField;
