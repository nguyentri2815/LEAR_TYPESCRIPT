import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAppointment,
  deleteAppointment,
} from "../appointmentApi";
import { buildAppointmentCreateFromFormValues } from "../builder";
import { mapAppointmentDTOToAppointment } from "../mapper";
import { CreateAppointmentSchemaValues } from "../schema";
import { ApiType, Appointment, AppointmentDTO } from "../type";

const APPOINTMENT_LIST_QUERY_KEY = ["appointmentList"] as const;

export const useCreateAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiType<AppointmentDTO>,
    Error,
    CreateAppointmentSchemaValues
  >({
    mutationFn: async (formValues) => {
      const payload = buildAppointmentCreateFromFormValues(formValues);

      return createAppointment(payload);
    },
    onSuccess: async (response) => {
      const createdAppointment = mapAppointmentDTOToAppointment(response.data);

      queryClient.setQueryData<Appointment[]>(
        APPOINTMENT_LIST_QUERY_KEY,
        (currentAppointments = []) => [
          ...currentAppointments,
          createdAppointment,
        ],
      );

      await queryClient.invalidateQueries({
        queryKey: APPOINTMENT_LIST_QUERY_KEY,
      });
    },
  });
};

export const useDeleteAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiType<string>, Error, string>({
    mutationFn: async (appointmentId) => deleteAppointment(appointmentId),
    onSuccess: async (_, appointmentId) => {
      queryClient.setQueryData<Appointment[]>(
        APPOINTMENT_LIST_QUERY_KEY,
        (currentAppointments = []) =>
          currentAppointments.filter(
            (appointment) => appointment.id !== appointmentId,
          ),
      );

      await queryClient.invalidateQueries({
        queryKey: APPOINTMENT_LIST_QUERY_KEY,
      });
    },
  });
};
