import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;// trường hợp này sau này sẽ áp dụng generic type để xác định rõ hơn kiểu dữ liệu của form
  error?: string;
  type?: "text" | "number";
}

const TextField = (props: TextFieldProps) => {
  const { label, name, register, type } = props;
  return (
    <div>
      <span>{label}</span>
      <input title={name} {...register(name, { valueAsNumber: type === "number" })} />
      {props.error && <span>{props.error}</span>}
    </div>
  );
};

export default TextField;
