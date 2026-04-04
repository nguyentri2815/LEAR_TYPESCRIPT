import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api";
import { CreateAppointmentSchemaValues } from "../schema";
import { buildAppointmentCreateFromFormValues } from "../builder";

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
