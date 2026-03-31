
"use client";

type ActionButtonProps = {
    onClick: () => void;
    label: string;
    disabled?: boolean;
}

const ActionButton = (props:ActionButtonProps): React.ReactNode => {
    const {label, onClick, disabled = false} = props;
  return <button onClick={onClick} disabled={disabled}>
    {label}
  </button>;
}
export default ActionButton;