import React from 'react'
import { Appointment } from '../../type';

interface AppointmentDetailModalProps {
    // Define any props you need here
    isOpen: boolean;
    onClose: () => void;
    appointment: Appointment | null | undefined;
}

const AppointmentDetailModal = (props: AppointmentDetailModalProps) => {
  const { isOpen, onClose, appointment } = props;

  if (!isOpen || !appointment) return null;

  const { id, title, customerName, fee, status, note } = appointment;

  return (
    <div>
        <h3>AppointmentDetailModal</h3>
        <p>ID: {id}</p>
        <p>Title: {title}</p>
        <p>Customer Name: {customerName}</p>
        <p>Fee: {fee}</p>
        <p>Status: {status}</p>
        <p>Note: {note}</p>
        <button onClick={onClose}>Close</button>
    </div>
  )
}

export default AppointmentDetailModal