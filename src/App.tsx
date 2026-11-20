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

const colorsFromUrlSearchParams = (params: URLSearchParams) => {
  const colorsString = params.get('colors') || '';
  try {
    const parsed = JSON.parse(colorsString);
    if (!Array.isArray(parsed)) {
      return DEFAULT_COLORS;
    }

    return parsed.map((v) => ({ name: v.name ?? '', hex: v.hex ?? '' }));
  } catch {
    console.error('Failed to parse URL params, using default colors');
    return DEFAULT_COLORS;
  }
};

const App = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const [colors, setColors] = useState(colorsFromUrlSearchParams(params));

  console.log({ colors });

  const changeColors = (cb: (prev: Color[]) => Color[]) => {
    const newColors = cb(colors);
    const newColorsString = JSON.stringify(newColors);
    setColors(newColors);
    params.set('colors', newColorsString);
    window.history.pushState({}, '', url);
  };

  return <CardContainer colors={colors} changeColors={changeColors} />;
};

export default App;
