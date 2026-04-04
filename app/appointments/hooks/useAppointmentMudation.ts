import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment, deleteAppointment } from "../api";
import { CreateAppointmentSchemaValues } from "../schema";
import { buildAppointmentCreateFromFormValues } from "../builder";
import { ApiType } from "../type";

export const useCreateAppointmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formValues: CreateAppointmentSchemaValues) => {
      const payload = buildAppointmentCreateFromFormValues(formValues);
      const response = await createAppointment(payload);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["appointmentList"],
      });
    },
  });
};

export const useDeleteAppointmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await deleteAppointment(appointmentId);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["appointmentList"],
      });
    },
  });
};
