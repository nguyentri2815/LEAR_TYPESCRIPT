// interface Appointment {
//     id: string;
//     title: string;
//     customerName: string;
//     isActive: boolean;
//     note?: string; // optional property
// }

// Hàm nhận type là gì> return về dữ liệu gì?:

// const getAppointmentLabel = (item: Appointment) :string => {
//     return `${item.title} ${item.customerName}`;
// }
// const getNote = (item: Appointment): unknown => {
//     if (item.note) {
//         return item.note;
//     }
//     return undefined;
// }