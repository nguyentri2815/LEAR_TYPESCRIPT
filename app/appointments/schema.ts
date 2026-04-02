import z from "zod";

export const createAppointmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  customerName: z.string().min(1, "Customer name is required"),
  fee: z.number().min(0, "Fee is required"),
  note: z.string().optional(),
});

export type CreateAppointmentSchemaValues = z.infer<typeof createAppointmentSchema>;