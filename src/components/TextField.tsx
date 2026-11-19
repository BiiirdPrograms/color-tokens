interface TextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  color?: React.CSSProperties['color'];
  smol?: boolean;
}

const TextField = ({ value, onChange, color, smol }: TextFieldProps) => {
  const style: React.CSSProperties = {
    color: color,
  };
  const smolPostfix = smol != null ? ' smol' : '';

  return (
    <input
      className={`text-field${smolPostfix}`}
      value={value}
      onChange={onChange}
      style={style}
    />
  );
};

export { TextField };
