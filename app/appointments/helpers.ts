//appointment helper:

import { Appointment, AppointmentStatus, Customer } from "./type";

export const getTotalAppointments = (list: Appointment[]): number => {
  return list.length;
};

export const getAppointmentLabel = (item: Readonly<Appointment>): string => {
  return `${item.title} ${item.customerName}`;
};
export const getAppointmentStatusLabel = (
  status: Readonly<AppointmentStatus>,
): string => {
  switch (status) {
    case "NEW":
      return "Mới";
    case "CONFIRM":
      return "Đã xác nhận";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
};
export const isEditable = (status: Readonly<AppointmentStatus>): boolean => {
  return status === "NEW" || status === "CONFIRM";
};
export const getAppointmentInfo = (item: Readonly<Appointment>): string => {
  const statusLabel = getAppointmentStatusLabel(item.status);
  return `${item.title} ${item.customerName} - Trạng thái: ${statusLabel}`;
};


//customer helper:

export const getCustomerLabel = (customer: Readonly<Customer>): string => {
  return `${customer.name} (${customer.age})`;
};
export const getCustomerNote = (customer: Readonly<Customer>): string => {
  if (customer.note) {
    return customer.note;
  }
  return "No note";
};

