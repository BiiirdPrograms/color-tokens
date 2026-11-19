import { useState } from 'react';
import { isLightHex, isValidHex } from '../utils/colors';
import { TextField } from './TextField';

const LIGHT = '#444';
const DARK = '#eee';

interface CardProps {
  color: Color;
  changeColor: (newVal: Color) => void;
}
const Card = ({ color, changeColor }: CardProps) => {
  const { name, hex } = color;
  const [hexInputValue, setHexInputValue] = useState(hex);

  const textColor = isLightHex(hex) ? LIGHT : DARK;
  const containerStyle: React.CSSProperties = {
    backgroundColor: hex,
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    changeColor({ ...color, name: value });
  };
  const handleChangeHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInputValue(value);
    if (isValidHex(value)) {
      changeColor({ ...color, hex: value });
    }
  };

  return (
    <div className="card" style={containerStyle}>
      <TextField value={name} onChange={handleChangeName} color={textColor} />
      <TextField
        value={hexInputValue}
        onChange={handleChangeHex}
        color={textColor}
        smol
      />
    </div>
  );
};

export { Card };
