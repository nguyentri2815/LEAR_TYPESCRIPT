import { useState } from "react";
import { Appointment, AppointmentFilterFormValues } from "../type";
import { findItemById, firstItem } from "../generic";

export const useAppointmentState = ({
  appointmentList,
}: {
  appointmentList: Appointment[];
}) => {
  //handleEvent
  //return
  // const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<AppointmentFilterFormValues>({
    keyword: "",
    status: "ALL",
    customerId: "ALL",
  });
  const handleFilterSubmit = (values: AppointmentFilterFormValues): void => {
    setFilters(values);
  };

  const handleFilterClear = (): void => {
    setFilters({
      keyword: "",
      status: "ALL",
      customerId: "ALL",
    });
  };

  const [selectedAppointment, setSelectedAppointment] = useState<
    Appointment | null | undefined
  >(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [deletingAppointment, setDeletingAppointment] =
    useState<Appointment | null>(null);

  // const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log("Keyword changed:", e.target.value);
  //   setKeyword(e.target.value);
  // };

  const handleSelectedAppointment = (item: Appointment) => {
    // setIsOpenModalDetail(true);
    const foundAppointment = findItemById(appointmentList, item.id);
    setSelectedAppointment(foundAppointment);
  };
  const handleClearAppointment = () => {
    setSelectedAppointment(null);
  };

  const handleGetFirstAppointment = () => {
    const firstAppointment = firstItem(appointmentList);
    setSelectedAppointment(firstAppointment);
  };

  return {
    // keyword,
    // onChangeKeyword,
    filters,
    handleFilterSubmit,
    handleFilterClear,

    selectedAppointment,
    handleSelectedAppointment,
    handleClearAppointment,
    handleGetFirstAppointment,
    selectedId,
    setSelectedId,
    deletingAppointment,
    setDeletingAppointment,
  };
};
