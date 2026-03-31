type BadgeProps = {
  label: string;
  isActive: boolean;
};

export default function Badge(props:BadgeProps): React.ReactNode {
  const { label, isActive } = props;
  const activeClass = isActive ? "active" : "inactive";
  return (
    <div className={activeClass}>
      <span>{label}</span>
    </div>
  );
}
