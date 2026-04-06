import { createContext, useContext } from "react";
import type { UseAppointmentsPageStateReturn } from "../hooks/useAppointmentsPageState";

/**
 * AppointmentsSectionContext provides access to page state for all sub-components
 * Avoids prop drilling by using React Context
 */
const AppointmentsSectionContext = createContext<UseAppointmentsPageStateReturn | undefined>(
  undefined
);

export const useAppointmentsSectionContext = () => {
  const context = useContext(AppointmentsSectionContext);
  if (!context) {
    throw new Error(
      "useAppointmentsSectionContext must be used within AppointmentsSection"
    );
  }
  return context;
};

export const AppointmentsSectionProvider = AppointmentsSectionContext.Provider;
