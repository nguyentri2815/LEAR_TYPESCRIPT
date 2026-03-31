//literal type, union type:

// type AppointmentStatus = "NEW" | "CONFIRM" | "CANCELLED";

// type Appointment = {
//     id: string;
//     title: string;
//     customerName: string;
//     status: AppointmentStatus;
// }
// const getAppointmentLabel = (item: Appointment): string => {
//     return `${item.title} ${item.customerName}`;
// }
// const getAppointmentStatusLabel = (status: AppointmentStatus): string => {
//     switch (status) {
//         case "NEW":
//             return "Mới";
//         case "CONFIRM":
//             return "Đã xác nhận";
//         case "CANCELLED":
//             return "Đã hủy";
//         default:
//             return "Không xác định";
//     }
// }
// const isEditable = (status: AppointmentStatus): boolean => {
//     return status === "NEW" || status === "CONFIRM";
// }
// const getAppointmentInfo = (item: Appointment): string => {
//     const statusLabel = getAppointmentStatusLabel(item.status);
//     return `${item.title} ${item.customerName} - Trạng thái: ${statusLabel}`;
// }