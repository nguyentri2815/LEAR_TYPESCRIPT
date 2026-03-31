import { useEffect, useState } from "react";
import { getAppointments } from "../api";
import { mapAppointmentDTOToAppointment } from "../mapper";
import { AppointmentDTO } from "../type";

type FetchStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: unknown }
  | { status: "error"; message: string };

export const useAppointment = () => {
  //fetchState
  //fetchData
  //handleEvent
  //return
  const [fetchState, setFetchState] = useState<FetchStatus>({ status: "idle" });

  useEffect(() => {
    let isMounted = true; // Giả sử component vẫn còn mounted

    const fetchAppointments = async (): Promise<void> => {
      try {
        setFetchState({ status: "loading" });
        // Giả sử fetchAppointmentsFromAPI là hàm fetch dữ liệu từ API
        const appointments = await getAppointments();
        if (isMounted) {
          const appointmentData = appointments.data as AppointmentDTO[]; // tư duy biết trước DTO nên ép nó như này thay vì unknow đc không?
          const appointmentList = appointmentData.map(
            mapAppointmentDTOToAppointment,
          );

          setFetchState({ status: "success", data: appointmentList });
        }
      } catch (error) {
        if (isMounted) {
          setFetchState({ status: "error", message: (error as Error).message });
        }
      }
    };

    fetchAppointments();

    return () => {
      // Cleanup function để đánh dấu component đã unmounted
      isMounted = false;
    };
  }, []);

  return { fetchState };
};
