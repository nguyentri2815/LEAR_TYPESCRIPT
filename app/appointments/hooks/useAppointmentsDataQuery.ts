import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../appointmentApi";
import { mapAppointmentDTOToAppointment } from "../mapper";
import { Appointment, AppointmentDTO } from "../type";

const APPOINTMENT_LIST_QUERY_KEY = ["appointmentList"] as const;

export const useAppointmentsQuery = () => {
  const appointmentQuery = useQuery<Appointment[]>({
    queryKey: APPOINTMENT_LIST_QUERY_KEY,
    queryFn: async () => {
      const appointments = await getAppointments();
      const appointmentData: AppointmentDTO[] = appointments.data;

      return appointmentData.map(mapAppointmentDTOToAppointment);
    },
    staleTime: 30 * 1000,
    retry: 1,
  });

  return appointmentQuery;
};
