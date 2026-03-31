//any, unknown, void:

// const rowAppointmentList: unknown[] = [
//   {
//     id: "1",
//     title: "Haircut",
//     customerName: "John Doe",
//     status: "NEW",
//     fee: 500000,
//     note:'Khách hàng muốn cắt tóc ngắn hơn',
//   },
//   {
//     id: "2",
//     title: "Manicure",
//     customerName: "Jane Smith",
//     status: "CONFIRM",
//     fee: '500000',
//   }
// ];

// type AppointmentStatus = "NEW" | "CONFIRM" | "CANCELLED";

// interface Appointment {
//   id: string;
//   title: string;
//   customerName: string;
//   status: AppointmentStatus;
//   fee: number;
//   note?: string;
// }

// const parseAppointment = (item: unknown): Appointment => {
//   if (
//     typeof item === "object" && item !== null &&
//     "id" in item && typeof item.id === "string" &&
//     "title" in item && typeof item.title === "string" &&
//     "customerName" in item && typeof item.customerName === "string" &&
//     "status" in item && (item.status === "NEW" || item.status === "CONFIRM" || item.status === "CANCELLED") &&
//     "fee" in item && typeof item.fee === "number"
//   ) {   
//     return item as Appointment;
//   }
//   throw new Error("Invalid appointment data");
// };


// const appointmentList: Appointment[] = rowAppointmentList.map((item) => {
//   return parseAppointment(item);
// });

// const getAppointmentInfo = (item: Appointment): string => {
//   return `${item.title} ${item.customerName} - Trạng thái: ${item.status}`;
// };
// const logMapResult = (): void => {
//     appointmentList.map((item) => {
//         console.log(getAppointmentInfo(item));
//     });
// };