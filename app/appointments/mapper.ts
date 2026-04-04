import { Appointment, AppointmentDTO, UpdateAppointmentFormValues } from "./type";

export const mapAppointmentDTOToAppointment = (dto: AppointmentDTO): Appointment => {
  return {
    id: dto.id,
    title: dto.title,
    customerName: dto.customer_Name,
    fee: typeof dto.fee === "number" ? dto.fee : parseFloat(dto.fee),
    note: dto.note,
    status: dto.status,
  };
}

export const mapAppointmentToUpdateFormValues = (appointment: Appointment): UpdateAppointmentFormValues => {
  return {
    title: appointment.title,
    customerName: appointment.customerName,
    fee: appointment.fee,
    status: appointment.status,
    note: appointment.note ?? "",
  };

}