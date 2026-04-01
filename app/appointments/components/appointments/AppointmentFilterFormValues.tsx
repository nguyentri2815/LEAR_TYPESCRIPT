import React from "react";
import { useForm } from "react-hook-form";
import type { AppointmentFilterFormValues } from "../../type";

const AppointmentFilterFormValues = (props: { onSubmit: (data: AppointmentFilterFormValues) => void }) => {
  const methods = useForm<AppointmentFilterFormValues>({
    defaultValues: {
      keyword: "",
    },
  });
  const { register, handleSubmit } = methods;
  const onSubmit = (data: AppointmentFilterFormValues) => {
    console.log("Form data:", data);
    props.onSubmit(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <input
        type="text"
        {...register("keyword")}
        placeholder="Search..."
        className="h-11 flex-1 rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      />
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
      >
        Filter
      </button>
    </form>
  );
};
export default AppointmentFilterFormValues;
