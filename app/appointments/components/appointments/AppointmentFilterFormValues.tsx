import React from "react";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import type { AppointmentFilterFormValues } from "../../type";

const AppointmentFilterFormValues = (props: { onSubmit: (data: AppointmentFilterFormValues) => void }) => {
  const methods = useForm<AppointmentFilterFormValues>({
    defaultValues: {
      keyword: "",
    },
  });
  const { register, handleSubmit, watch } = methods;
  const onSubmit = (data: AppointmentFilterFormValues) => {
    console.log("Form data:", data);
    props.onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        value={watch("keyword")}
        {...register("keyword")}
        placeholder="Search..."
      />
      <button type="submit">Filter</button>
    </form>
  );
};
export default AppointmentFilterFormValues;
