import React from "react";
import { CreateAppointmentFormValues } from "../../type";
import { useForm } from "react-hook-form";
import TextField from "../fields/TextField";

const CreateAppointmentModal = (props: {
  onSubmit: (data: CreateAppointmentFormValues) => void;
}) => {
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
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Title" name="title" register={register} />
        <TextField label="Customer Name" name="customerName" register={register} />
        <TextField label="Fee" name="fee" register={register} type="number" />
        
        <textarea placeholder="Note" {...register("note")} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAppointmentModal;
