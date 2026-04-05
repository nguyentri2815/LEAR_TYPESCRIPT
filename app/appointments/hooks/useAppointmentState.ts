import { useState } from "react";
import { Appointment } from "../type";
import { findItemById, firstItem } from "../generic";

export const useAppointmentState = ({
  appointmentList,
}: {
  appointmentList: Appointment[];
}) => {
  //handleEvent
  //return
  const [keyword, setKeyword] = useState("");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null | undefined>(null);
  const [selectedId, setSelectedId] = useState<string>('');
  const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Keyword changed:", e.target.value);
    setKeyword(e.target.value);
  };

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
    keyword,
    onChangeKeyword,
    selectedAppointment,
    handleSelectedAppointment,
    handleClearAppointment,
    handleGetFirstAppointment,
    selectedId,
    setSelectedId,
    deletingAppointment, 
    setDeletingAppointment
  };
};
