import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextFieldProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;// trường hợp này sau này sẽ áp dụng generic type để xác định rõ hơn kiểu dữ liệu của form
  error?: string;
  type?: "text" | "number";
}

const TextField = <TFieldValues extends FieldValues>(
  props: TextFieldProps<TFieldValues>,
) => {
  const { label, name, register, type } = props;
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        title={name}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        {...register(name, { valueAsNumber: type === "number" })}
      />
      {props.error && <span>{props.error}</span>}
    </div>
  );
};

export default TextField;
