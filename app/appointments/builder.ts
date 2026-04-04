import { CreateAppointmentSchemaValues } from "./schema";
import { CreateAppointmentPayload } from "./type";

export const buildAppointmentCreateFromFormValues = (
  formValues: CreateAppointmentSchemaValues,
): CreateAppointmentPayload => {
  const { customerName, fee, status, title, note } = formValues;

  return {
    title,
    customer_Name: customerName,
    fee,
    note: note || undefined,
    status,
  };
};
