import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api";
import { Appointment, AppointmentDTO } from "../type";
import { mapAppointmentDTOToAppointment } from "../mapper";

export const useAppointmentsQuery = () => {
  const appointmentQuery = useQuery<Appointment[]>({
    queryKey: ["appointmentList"],
    queryFn: async () => {
      const appointments = await getAppointments();

      const appointmentData = appointments.data as AppointmentDTO[]; // tư duy biết trước DTO nên ép nó như này thay vì unknow đc không?
      const appointmentList = appointmentData.map(
        mapAppointmentDTOToAppointment,
      );
      return appointmentList;
    },
  });
  return appointmentQuery;
};
