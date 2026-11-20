import { Card } from './Card';

interface CardContainerProps {
  colors: Color[];
  changeColors: (cb: (prev: Color[]) => Color[]) => void;
}

const CardContainer = ({ colors, changeColors }: CardContainerProps) => {
  const changeColor = (i: number) => (newVal: Color) => {
    changeColors((prev) =>
      prev.map((color, idx) => (idx === i ? newVal : color)),
    );
  };

  return (
    <div className="card-container">
      {colors.map((color, i) => (
        <Card key={i} color={color} changeColor={changeColor(i)} />
      ))}
    </div>
  );
};

export { CardContainer };
