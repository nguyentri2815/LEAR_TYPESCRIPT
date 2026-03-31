// useState với kiểu dữ liệu tự suy luận , và genegic

import ActionButton from "@/app/appointments/components/ui/ActionButton";
import { useState } from "react";

interface Appointment {
  id: string;
  title: string;
  isActive: boolean;
  fee: number;
  node?: string;
}
const rawAppointmentList: unknown[] = [
  {
    id: "1",
    title: "lịch 1",
    isActive: true,
    fee: 5000,
  },
  {
    id: "2",
    title: "lịch 2",
    isActive: true,
    fee: "5000",
    node: "kiểm tra lại phí",
  },
];
const AppointmentCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const handleCreateModal = (): void => {
    setIsOpen(true);
  };
  const handleCloseAppointment = () => {
    setIsOpen(false);
  };
  const filteredRawAppointmentList = rawAppointmentList.map((item) => {
    return item as Appointment;
  });

  return (
    <main>
      <h1>Appointment Create</h1>
      <ActionButton label="create" onClick={handleCreateModal} />
      <div>
        <ul>
          {filteredRawAppointmentList.map((item: Appointment) => {
            const { id, title } = item;
            return (
              <li key={id}>
                <h2>{title}</h2>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};
export default AppointmentCreate;
