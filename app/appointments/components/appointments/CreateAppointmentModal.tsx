import React from "react";
import { CreateAppointmentFormValues } from "../../type";
import { useForm } from "react-hook-form";
import TextField from "../fields/TextField";
import Card from "../ui/Card";

interface CreateAppointmentModalProps {
  customerOptions: { value: string; label: string }[];
  onSubmit: (data: CreateAppointmentFormValues) => void;
  onClose: () => void;
}

const CreateAppointmentModal = (props: CreateAppointmentModalProps) => {
  const methods = useForm<CreateAppointmentFormValues>({
    defaultValues: {
      title: "",
      customerName: "",
      fee: 0,
      note: "",
    },
  });
  const { register, handleSubmit } = methods;
  const onSubmit = (data: CreateAppointmentFormValues) => {
    console.log("Form data:", data);
    props.onSubmit(data);
  };
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-xl" padding="lg">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600">
                Create
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                New appointment
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Fill in the main information to create a new appointment.
              </p>
            </div>
            <button
              type="button"
              onClick={props.onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              x
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField label="Title" name="title" register={register} />
            <div>
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Customer
              </span>
              <select
                title="customerName"
                {...register("customerName")}
                className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              >
                <option value="">Select customer</option>
                {props.customerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <TextField label="Fee" name="fee" register={register} type="number" />
            <div>
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Note
              </span>
              <textarea
                placeholder="Add note"
                {...register("note")}
                className="min-h-28 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>
            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={props.onClose}
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Create appointment
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreateAppointmentModal;
