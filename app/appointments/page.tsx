"use client";

import React, { useEffect, useState } from "react";
import { rawAppointmentList, customerList } from "./data";
import {
  getTotalAppointments,
  getCustomerNote,
  getCustomerLabel,
} from "./helpers";
import type { Appointment, AppointmentDTO, Customer } from "./type";
import ActionButton from "./components/ui/ActionButton";
import Title from "./components/ui/Title";
import Input from "./components/ui/Input";
import AppointmentDetailModal from "./components/appointments/AppointmentDetailModal";
import { firstItem } from "./generic";
import AppointmentTable from "./components/appointments/AppointmentTable";
import { getAppointments } from "./api";
import { mapAppointmentDTOToAppointment } from "./mapper";
import CreateAppointmentModal from "./components/appointments/CreateAppointmentModal";
import AppointmentFilterFormValues from "./components/appointments/AppointmentFilterFormValues";
import { useAppointment } from "./hooks/useAppointment";
import { useModal } from "./hooks/useModal";
import { useAppointmentState } from "./hooks/useAppointmentState";

const Appointment = () => {
  // const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  // const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);

  const createModal = useModal(false);
  const detailModal = useModal(false);

  const { fetchState } = useAppointment();
  // const [loading, setLoading] = useState(false);
  // const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);

  // useEffect(() => {
  //   const loadAppointments = async (): Promise<void> => {
  //     console.log("Loading appointments...");
  //     setLoading(true);
  //     try {
  //       const appointments = await getAppointments();
  //       const appointmentData = appointments.data as AppointmentDTO[]; // tư duy biết trước DTO nên ép nó như này thay vì unknow đc không?
  //       const appointmentList = appointmentData.map(
  //         mapAppointmentDTOToAppointment,
  //       );
  //       setAppointmentList(appointmentList);
  //     } catch (error) {
  //       console.error("Error loading appointments:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadAppointments();
  // }, []);
  const {
    selectedAppointment,
    handleGetFirstAppointment,
    handleSelectedAppointment,
    handleClearAppointment,
  } = useAppointmentState({
    appointmentList:
      fetchState.status === "success" ? (fetchState.data as Appointment[]) : [],
  });
  const appointmentList =
    fetchState.status === "success" ? (fetchState.data as Appointment[]) : [];

  const renderAppointmentTable = () => {
    switch (fetchState.status) {
      case "idle":
        return <p>Idle...</p>;
      case "loading":
        return <p>Loading...</p>;
      case "success":
        return (
          <AppointmentTable
            items={appointmentList}
            onSelect={handleSelectedAppointment}
            onDelete={handleClearAppointment}
          />
        );
      case "error":
        return <p>Error: {fetchState.message}</p>;
      default:
        return null;
    }
  };

  return (
    <main>
      <section>
        <div>
          <Title title="Danh sách cuộc hẹn" />
          <p>Tổng số cuộc hẹn: {getTotalAppointments(appointmentList)}</p>
        </div>
        <div>
          <AppointmentFilterFormValues
            onSubmit={(data) => {
              // Handle filter submission logic here
            }}
          />
          <ActionButton
            label="Tạo mới Appointment"
            // onClick={handleCreateModal}
            onClick={createModal.open}
          />
          <ActionButton label="Tắt Appointment" onClick={createModal.close} />
          <ActionButton
            label="Lấy phần tử đầu tiên"
            // onClick={() => setSelectedAppointment(firstItem(appointmentList))}
            onClick={handleGetFirstAppointment}
          />
          {renderAppointmentTable()}
        </div>
        <hr />
      </section>
      <section>
        <div>
          <h2>khách hàng</h2>
          <ul>
            {customerList.map((customer: Customer) => {
              const { id, phone } = customer;
              return (
                <li key={id}>
                  <h3>{getCustomerLabel(customer)}</h3>
                  <p>{phone}</p>
                  <p>{getCustomerNote(customer)}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <hr />
      </section>
      <AppointmentDetailModal
        // isOpen={isOpenModalDetail}
        // onClose={() => setIsOpenModalDetail(false)}
        isOpen={detailModal.isOpen}
        onClose={detailModal.close}
        appointment={selectedAppointment}
      />
      {/* {isOpenModalCreate && ( */}
      {createModal.isOpen && (
        <CreateAppointmentModal
          onSubmit={(data) => {
            // Handle form submission logic here
          }}
        />
      )}
    </main>
  );
};

export default Appointment;
