interface BaseEntity {
  id: string;
}

export type AppointmentStatus = "NEW" | "CONFIRM" | "CANCELLED";

export interface Appointment extends BaseEntity {
  title: string;
  customerName: string;
  fee: number,
  note?: string;
  status: AppointmentStatus;
}
export type StrictAppointment =  Appointment & Required<Pick<Appointment, "note">>;
export interface AppointmentDTO extends BaseEntity {
  title: string;
  customer_Name: string;
  fee: number | string;
  note?: string;
  status: AppointmentStatus;
}

export interface Customer extends BaseEntity {
  name: string;
  age: number;
  phone: string;
  isVip: boolean;
  note?: string; // optional property
}

export type ApiType<T> = {
  data: T;
  message: string;
}

//Form values:
export interface CreateAppointmentFormValues {
  title: string;
  customerName: string;
  fee: number;
  note?: string;
}
export interface AppointmentFilterFormValues {
  keyword: string;
}