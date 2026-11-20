import { Card } from './Card';

interface CardContainerProps {
  navid: string;
  colors: Color[];
  changeColors: (cb: (prev: Color[]) => Color[]) => void;
}

const CardContainer = ({ navid, colors, changeColors }: CardContainerProps) => {
  const changeColor = (i: number) => (newVal: Color) => {
    changeColors((prev) =>
      prev.map((color, idx) => (idx === i ? newVal : color)),
    );
  };

  return (
    <div className="card-container">
      {colors.map((color, i) => (
        <Card
          key={`${i} ${navid}`}
          color={color}
          changeColor={changeColor(i)}
        />
      ))}
    </div>
  );
};

export { CardContainer };
