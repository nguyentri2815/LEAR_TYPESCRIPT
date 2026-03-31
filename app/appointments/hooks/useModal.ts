import { useToggle } from "./useToggle";

export const useModal = (initialValue: boolean = false) => {
  const {
    value: isOpen,
    toggle: toggleModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useToggle(initialValue);


  return {
    isOpen,
    toggle: toggleModal,
    open: openModal,
    close: closeModal,
  };
};
