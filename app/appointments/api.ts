import { mapAppointmentDTOToAppointment } from "./mapper";
import {
  ApiType,
  Appointment,
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
/* legacy mock kept for reference */
export const getAppointments = async (): Promise<ApiType<AppointmentDTO[]>> => {
  await wait(1000); // Simulate API delay
  // Implementation for fetching appointments
  return {
    data: [
      {
        id: "1",
        title: "lịch hẹn 1",
        customer_Name: "2",
        status: "NEW",
        fee: "500000",
        note: "Khách hàng muốn cắt tóc ngắn hơn",
      },
      {
        id: "2",
        title: "lịch hẹn 2",
        customer_Name: "2",
        status: "NEW",
        fee: 500000,
      },
    ],
    message: "Appointments fetched successfully",
  };
};

export const createAppointment = async (
  payload: AppointmentDTO,
): Promise<ApiType<AppointmentDTO>> => {
  await wait(3000);
  return {
    data: payload,
    message: "success",
  };
};

export const deleteAppointment = async (
  appointmentId: string,
): Promise<ApiType<string>> => {
  await wait(3000);
  return {
    data: appointmentId,
    message: "xóa appointment thành công",
  };
};

export const getDetailAppointment = async (
  id: string,
): Promise<ApiType<Appointment>> => {
  await wait(3000);
  const dto = appointmentStore.find((item) => item.id === id);
  if(!dto){
    throw new Error('Appointment not found')
  }
  return  {
    data: mapAppointmentDTOToAppointment(dto),
    message: "Fetched appointment detail successfully",
  };
};
