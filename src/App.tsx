import { useSyncExternalStore } from 'react';
import './App.css';
import { CardContainer } from './components/CardContainer';

const DEFAULT_COLORS: Color[] = [
  { name: 'Velvet Purple', hex: '#643a71' },
  { name: 'Lavender Purple', hex: '#8b5fbf' },
  { name: 'Orchid Mist', hex: '#d183c9' },
  { name: 'Petal Rogue', hex: '#e3879e' },
  { name: 'Pastel Pink', hex: '#fec0ce' },
];

const CUSTOM_HISTORY_EVENT = 'historypushreplace';

let cached = DEFAULT_COLORS;
let cachedStringified = JSON.stringify(DEFAULT_COLORS);

const colorsFromUrlSearchParams = () => {
  const params = new URL(window.location.href).searchParams;
  const colorsString = params.get('colors') || '';
  try {
    if (colorsString === cachedStringified) {
      return cached;
    }

    const parsed = JSON.parse(colorsString);
    if (!Array.isArray(parsed)) {
      return DEFAULT_COLORS;
    }

    cached = parsed.map((v) => ({ name: v.name ?? '', hex: v.hex ?? '' }));
    cachedStringified = JSON.stringify(cached);

    return cached;
  } catch {
    console.error('Failed to parse URL params, using default colors');
    return DEFAULT_COLORS;
  }
};

// Patch native history methods to emit events to save on react router dependency
const patchHistoryMethod = (method: 'pushState' | 'replaceState') => {
  const original = window.history[method];
  window.history[method] = function (...args) {
    const result = original.apply(this, args);
    window.dispatchEvent(new Event(CUSTOM_HISTORY_EVENT));
    return result;
  };
};
patchHistoryMethod('pushState');
patchHistoryMethod('replaceState');

const subscribeToHistoryEvents = (cb: () => void) => {
  window.addEventListener('popstate', cb);
  window.addEventListener(CUSTOM_HISTORY_EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(CUSTOM_HISTORY_EVENT, cb);
  };
};

let popstateCounter = 0;
const subscribeToPopstateCounter = (cb: () => void) => {
  const onNav = () => {
    popstateCounter++;
    cb();
  };
  window.addEventListener('popstate', onNav);
  return () => {
    window.removeEventListener('popstate', onNav);
  };
};

const App = () => {
  const colors = useSyncExternalStore(
    subscribeToHistoryEvents,
    colorsFromUrlSearchParams,
  );

  const navId = useSyncExternalStore(
    subscribeToPopstateCounter,
    () => popstateCounter,
  );

  const changeColors = (cb: (prev: Color[]) => Color[]) => {
    const newColors = cb(colors);
    const newColorsString = JSON.stringify(newColors);
    const url = new URL(window.location.href);
    url.searchParams.set('colors', newColorsString);
    window.history.pushState({}, '', url);
  };

  return (
    <CardContainer
      navid={`${navId}`}
      colors={colors}
      changeColors={changeColors}
    />
  );
};

export default App;
