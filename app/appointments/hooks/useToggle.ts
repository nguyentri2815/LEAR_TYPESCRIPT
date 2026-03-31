import { useState } from "react";

interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}
export const useToggle = (initialValue: boolean = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue((prev: boolean) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
};
