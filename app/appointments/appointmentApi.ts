import {
  ApiType,
  AppointmentDTO,
  CreateAppointmentPayload,
} from "./type";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createAppointmentId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `appointment-${Date.now()}-${Math.random().toString(16).slice(2)}`;

let appointmentStore: AppointmentDTO[] = [
  {
    id: "1",
    title: "Appointment 1",
    customer_Name: "2",
    status: "NEW",
    fee: "500000",
    note: "Customer wants a shorter haircut.",
  },
  {
    id: "2",
    title: "Appointment 2",
    customer_Name: "2",
    status: "NEW",
    fee: 500000,
  },
];

export const getAppointments = async (): Promise<ApiType<AppointmentDTO[]>> => {
  await wait(1000);

  return {
    data: [...appointmentStore],
    message: "Appointments fetched successfully",
  };
};

export const createAppointment = async (
  payload: CreateAppointmentPayload,
): Promise<ApiType<AppointmentDTO>> => {
  await wait(3000);

  const createdAppointment: AppointmentDTO = {
    ...payload,
    id: createAppointmentId(),
  };

  appointmentStore = [...appointmentStore, createdAppointment];

  return {
    data: createdAppointment,
    message: "Appointment created successfully",
  };
};

export const deleteAppointment = async (
  appointmentId: string,
): Promise<ApiType<string>> => {
  await wait(3000);

  appointmentStore = appointmentStore.filter(
    (appointment) => appointment.id !== appointmentId,
  );

  return {
    data: appointmentId,
    message: "Appointment deleted successfully",
  };
};
