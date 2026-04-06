import { useMemo } from "react";
import { customerList } from "../data";
import {
  getAppointmentStatusLabel,
  getCustomerLabel,
  getTotalAppointments,
} from "../helpers";
import { groupBy, mapToOptions, toRecord } from "../generic";
import type { Appointment, AppointmentFilterFormValues } from "../type";

export interface UseAppointmentDataReturn {
  appointmentList: Appointment[];
  appointmentListWithCustomerLabel: Appointment[];
  customerRecord: Record<string, typeof customerList[0]>;
  customerOptions: Array<{ label: string; value: string }>;
  appointmentsByStatus: Record<string, Appointment[]>;
  appointmentStatusEntries: Array<[Appointment["status"], Appointment[]]>;
  totalAppointments: number;
  filteredAppointments: Appointment[];
}

export const useAppointmentData = (
  appointmentList: Appointment[],
  filters: AppointmentFilterFormValues,
): UseAppointmentDataReturn => {
  // Transform: Add customer names
  const appointmentListWithCustomerLabel = useMemo(() => {
    const customerRecord = toRecord(customerList);
    return appointmentList.map((appointment) => ({
      ...appointment,
      customerName:
        customerRecord[appointment.customerName]?.name ??
        appointment.customerName,
    }));
  }, [appointmentList]);

  // Transform: Generate customer options and record
  const { customerRecord, customerOptions } = useMemo(() => {
    return {
      customerRecord: toRecord(customerList),
      customerOptions: mapToOptions(
        customerList,
        getCustomerLabel,
        (customer) => customer.id,
      ),
    };
  }, []);

  // Transform: Group by status
  const { appointmentsByStatus, appointmentStatusEntries, totalAppointments } =
    useMemo(() => {
      const grouped = groupBy(
        appointmentListWithCustomerLabel,
        (appointment) => appointment.status,
      );
      return {
        appointmentsByStatus: grouped,
        appointmentStatusEntries: Object.entries(grouped) as Array<
          [Appointment["status"], Appointment[]]
        >,
        totalAppointments: getTotalAppointments(appointmentListWithCustomerLabel),
      };
    }, [appointmentListWithCustomerLabel]);

  // Filter logic
  const filteredAppointments = useMemo(() => {
    const normalizedKeyword = filters.keyword.trim().toLowerCase();

    return appointmentListWithCustomerLabel.filter((appointment) => {
      const matchKeyword =
        !normalizedKeyword ||
        appointment.title.toLowerCase().includes(normalizedKeyword) ||
        appointment.customerName.toLowerCase().includes(normalizedKeyword);

      const matchStatus =
        filters.status === "ALL" || appointment.status === filters.status;

      const matchCustomer =
        filters.customerId === "ALL" ||
        appointment.id === filters.customerId;

      return matchKeyword && matchStatus && matchCustomer;
    });
  }, [appointmentListWithCustomerLabel, filters]);

  return {
    appointmentList,
    appointmentListWithCustomerLabel,
    customerRecord,
    customerOptions,
    appointmentsByStatus,
    appointmentStatusEntries,
    totalAppointments,
    filteredAppointments,
  };
};
