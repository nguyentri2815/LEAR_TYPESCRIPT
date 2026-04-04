import { CreateAppointmentSchemaValues } from "./schema";
import { AppointmentDTO } from "./type";

export const buildAppointmentCreateFromFormValues = (
  formValues: CreateAppointmentSchemaValues,
): AppointmentDTO => {
  const { customerName, fee, status, title, note } = formValues;
  return {
    id: "",
    title: title,
    customer_Name: customerName,
    fee: fee,
    note: note,
    status: status,
  };
};
