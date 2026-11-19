import { useState } from 'react';
import './App.css';
import { CardContainer } from './components/CardContainer';

const DEFAULT_COLORS: Color[] = [
  { name: 'Velvet Purple', hex: '#643a71' },
  { name: 'Lavender Purple', hex: '#8b5fbf' },
  { name: 'Orchid Mist', hex: '#d183c9' },
  { name: 'Petal Rogue', hex: '#e3879e' },
  { name: 'Pastel Pink', hex: '#fec0ce' },
];

const App = () => {
  const [colors, setColors] = useState(DEFAULT_COLORS);

  const changeColors = (cb: (newColors: Color[]) => Color[]) => setColors(cb);

  return <CardContainer colors={colors} changeColors={changeColors} />;
};

export default App;
