import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { AppointmentFilterFormValues } from "../../type";
import { customerList } from "../../data";
import { mapToOptions } from "../../generic";
import { getCustomerLabel } from "../../helpers";
import FormSelectField from "../fields/FormSelectField";
import FormStatusSelectField from "../fields/FormStatusSelectField";

interface AppointmentFilterFormProps {
  initialValues: AppointmentFilterFormValues;
  onSubmit: (values: AppointmentFilterFormValues) => void;
  onClear : () => void
}
const statusOptions: { value: string; label: string }[] = [
  { value: "ALL", label: "ALL status" },
  { value: "NEW", label: "New" },
  { value: "CONFIRM", label: "Confirm" },
  { value: "CANCELLED", label: "Cancelled" },
];
const rawCustomerOptions = mapToOptions(
  customerList,
  getCustomerLabel,
  (customer) => customer.id,
);

const AppointmentFilterForm = (props: AppointmentFilterFormProps) => {
  const { initialValues } = props;

  const methods = useForm<AppointmentFilterFormValues>({
    defaultValues: initialValues,
  });
  const { register, handleSubmit, reset } = methods;
  const onSubmit = (values: AppointmentFilterFormValues) => {
    console.log("Form data:", values);
    props.onSubmit(values);
  };

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const customerOptions = [
    { value: "ALL", label: "All customers" },
    ...rawCustomerOptions.map((item) => ({
      value: item.value,
      label: item.label,
    })),
  ];
  
  const handleReset = ()=>{
    reset()
    props.onClear?.()
  }
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

      <FormSelectField
        label="Customer"
        name="customerId"
        options={customerOptions}
        register={register}
      />

      <Controller
        name="status"
        control={methods.control}
        render={({ field, fieldState }) => (
          <FormStatusSelectField
            label="Status"
            value={field.value}
            options={statusOptions}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
      >
        Filter
      </button>
        <button
         className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        onClick={handleReset}
        >
          Reset
        </button>
    </form>
  );
};
export default AppointmentFilterForm;
