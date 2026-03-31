// type props:
type TitleProps = {
    text: string;
}
const Title = (props:TitleProps) => {
    return <h1>{props.text}</h1>
}
type BadgeProps = {
    label: string;
    isActive: boolean;
}
const Badge = (props:BadgeProps) => {
    const { label, isActive } = props;
    const activeClass = isActive ? "active" : "inactive";
    return <span className={activeClass}>{label}</span>
}

type ActionProps = {
    onClick: () => void;
    label: string;
    disabled?: boolean;
}

const ActionButton = (props: ActionProps) => {
    const { onClick, label, disabled = false } = props;
    return <button onClick={onClick} disabled={disabled}>
        {label}
    </button>
}