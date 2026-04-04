import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  editAppointmentSchema,
  EditAppointmentSchemaFormValues,
} from "../../schema";
import { Appointment } from "../../type";
import Card from "../ui/Card";
import FormTextField from "../fields/FormTextField";
import FormSelectField from "../fields/FormSelectField";
import FormStatusSelectField from "../fields/FormStatusSelectField";
import FormTextareaField from "../fields/FormTextareaField";
import { mapAppointmentToUpdateFormValues } from "../../mapper";

interface EditAppointmentModalProps {
  appointment: Appointment | null;
  isSubmitting: boolean;
  submitErrMessage: string;
  onClose: () => void;
  customerOptions: { value: string; label: string }[];
  onSubmit: (formValues: EditAppointmentSchemaFormValues) => void;
}
const statusOptions: { value: string; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONFIRM", label: "Confirm" },
  { value: "CANCELLED", label: "Cancelled" },
];

const EditAppointmentModal = (props: EditAppointmentModalProps) => {
  const { appointment, isSubmitting, onClose } = props;
  const methods = useForm<EditAppointmentSchemaFormValues>({
    mode: "onChange",
    resolver: zodResolver(editAppointmentSchema),
    defaultValues: {
      title: "",
      customerName: "",
      fee: 0,
      status: "NEW",
      note: "",
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    reset,
  } = methods;

  useEffect(() => {
    if (!appointment) {
      return;
    }

    reset(mapAppointmentToUpdateFormValues(appointment));
  }, [appointment, reset]);

  const onSubmit = (formValues: EditAppointmentSchemaFormValues) => {
    props.onSubmit(formValues);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-xl" padding="lg">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600">
                Update
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                appointment
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Fill in the main information to update a new appointment.
              </p>
              <div>
                <p className="text-red-500" role="alert">
                  {props.submitErrMessage}
                </p>
                <p className="text-sm text-slate-500">
                  {isSubmitting ? "Updating appointment..." : ""}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              x
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormTextField
              label="Title"
              name="title"
              register={register}
              error={errors.title?.message}
            />
            <FormSelectField
              label="Customer"
              name="customerName"
              options={props.customerOptions}
              register={register}
              error={errors.customerName?.message}
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
                  disabled={isSubmitting}
                  error={fieldState.error?.message}
                />
              )}
            />
            <FormTextField
              label="Fee"
              name="fee"
              register={register}
              type="number"
              error={errors.fee?.message}
            />
            <FormTextareaField
              label="Note"
              name="note"
              register={register}
              placeholder="Add note"
              error={errors.note?.message}
            />
            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={props.onClose}
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-medium text-white transition ${
                  !isDirty || !isValid || isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-slate-800"
                }`}
                disabled={!isDirty || !isValid || isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default EditAppointmentModal;
