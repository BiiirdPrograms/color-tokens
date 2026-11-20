import { Card } from './Card';

interface CardContainerProps {
  navid: string;
  colors: Color[];
  changeColors: (cb: (prev: Color[]) => Color[]) => void;
}

const NEW_COLOR: Color = { name: '', hex: '#b00b69' };

const CardContainer = ({ navid, colors, changeColors }: CardContainerProps) => {
  const changeColor = (i: number) => (newVal: Color) => {
    changeColors((prev) =>
      prev.map((color, idx) => (idx === i ? newVal : color)),
    );
  };
  const removeColor = (i: number) => () =>
    changeColors((prev) => prev.filter((_, idx) => i !== idx));
  const addNewColor = () => changeColors((prev) => [...prev, NEW_COLOR]);

  return (
    <div className="card-container">
      {colors.map((color, i) => (
        <Card
          key={`${i} ${navid}`}
          color={color}
          changeColor={changeColor(i)}
          removeColor={removeColor(i)}
        />
      ))}
      <div className="card empty" onClick={addNewColor}>
        +
      </div>
    </div>
  );
};

export { CardContainer };
