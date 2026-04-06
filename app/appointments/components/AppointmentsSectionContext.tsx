import { createContext, useContext } from "react";
import type { UseAppointmentsPageStateReturn } from "../hooks/useAppointmentsPageState";

/**
 * AppointmentsSectionContext cung cấp quyền truy cập vào trạng thái trang cho tất cả các thành phần con
 * Tránh khoan trải props bằng cách sử dụng React Context
 */
const AppointmentsSectionContext = createContext<UseAppointmentsPageStateReturn | undefined>(
  undefined
);

export const useAppointmentsSectionContext = () => {
  const context = useContext(AppointmentsSectionContext);
  if (!context) {
    throw new Error(
      "useAppointmentsSectionContext phải được sử dụng trong AppointmentsSection"
    );
  }
  return context;
};

export const AppointmentsSectionProvider = AppointmentsSectionContext.Provider;
