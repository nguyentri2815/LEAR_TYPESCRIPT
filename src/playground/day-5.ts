//type alias và interface:

// type AppointmentStatus = "NEW" | "CONFIRM" | "CANCELLED";

// interface BaseEntity {
//     id: string;
// }

// type Appointment = {
//     title: string;
//     customerName: string;
//     status: AppointmentStatus;
// } & BaseEntity;

// type GetAppointmentLabel = (item: Appointment) => string;
// const getAppointmentLabel: GetAppointmentLabel = (item) => {
//     return `${item.title} ${item.customerName}`;
// }

// interface Customer extends BaseEntity {
//     name: string;
//     age: number;
//     phone: string;
//     isVip: boolean;
//     note?: string; // optional property
// };

// interface GetCustomerLabel {
//     (customer: Customer): string;
// }
// const getCustomerLabel: GetCustomerLabel = (customer) => {
//     return `${customer.name} (${customer.age})`;
// }
