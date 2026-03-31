type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const Input = (props: InputProps) => {
    const { value, onChange, disabled = false } = props;
  return <input type="text" value={value} onChange={onChange} disabled={disabled} placeholder="Nhập thông tin" />;
};
export default Input;
