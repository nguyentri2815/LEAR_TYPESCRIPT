import { ApiType, AppointmentDTO } from "./type";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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
