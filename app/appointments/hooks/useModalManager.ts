import { useState } from "react";
import type { Appointment } from "../type";

export interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface UseModalManagerReturn {
  createModal: ModalState;
  detailModal: ModalState & { selectedId: string; setSelectedId: (id: string) => void };
  editModal: ModalState & { editingAppointment: Appointment | null; setEditingAppointment: (appointment: Appointment | null) => void };
  deleteConfirmModal: ModalState & { deletingAppointment: Appointment | null; setDeletingAppointment: (appointment: Appointment | null) => void };
}

export const useModalManager = (): UseModalManagerReturn => {
  // Create Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const createModal = {
    isOpen: isCreateModalOpen,
    open: () => setIsCreateModalOpen(true),
    close: () => setIsCreateModalOpen(false),
  };

  // Detail Modal
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const detailModal = {
    isOpen: isDetailModalOpen,
    open: () => setIsDetailModalOpen(true),
    close: () => setIsDetailModalOpen(false),
    selectedId,
    setSelectedId,
  };

  // Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const editModal = {
    isOpen: isEditModalOpen,
    open: () => setIsEditModalOpen(true),
    close: () => setIsEditModalOpen(false),
    editingAppointment,
    setEditingAppointment,
  };

  // Delete Confirm Modal
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);
  const deleteConfirmModal = {
    isOpen: isDeleteConfirmModalOpen,
    open: () => setIsDeleteConfirmModalOpen(true),
    close: () => setIsDeleteConfirmModalOpen(false),
    deletingAppointment,
    setDeletingAppointment,
  };

  return {
    createModal,
    detailModal,
    editModal,
    deleteConfirmModal,
  };
};
