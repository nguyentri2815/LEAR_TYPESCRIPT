import z from "zod";

export const createAppointmentSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  customerName: z.string().trim().min(1, "Customer name is required"),
  fee: z.number().refine((val) => !isNaN(val), "Fee is must be a number").min(1, "Fee is required"),
  note: z.string().trim().optional(),
  status: z.enum(["NEW", "CONFIRM", "CANCELLED"]),
});

export type CreateAppointmentSchemaValues = z.infer<typeof createAppointmentSchema>;

export const editAppointmentSchema = createAppointmentSchema;

export type EditAppointmentSchemaFormValues = z.infer<typeof editAppointmentSchema>;