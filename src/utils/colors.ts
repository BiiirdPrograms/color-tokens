const buildStringFromStringAndIndices = (str: string, indices: number[]) => {
  if (indices.some((i) => isNaN(i) || i < 0 || i > str.length)) {
    throw new Error(
      `Indices can only contain numbers between 0 and the string length (${str.length})`,
    );
  }

  return indices.reduce((result, i) => `${result}${str[i]}`, '');
};

const convertToFullHex = (str: string) => {
  if (!/^[0-9a-f]{3}/i.test(str)) {
    throw new Error(
      'Short hex must be exactly 3 characters long and only contain 0-9 and A-F',
    );
  }

  return buildStringFromStringAndIndices(str, [0, 0, 1, 1, 2, 2]);
};

export const isValidHex = (input: string) => {
  const hex = input[0] === '#' ? input.substring(1) : input;
  return [3, 4, 6, 8].includes(hex.length) && /^[0-9a-f]+$/i.test(hex);
};

// YIQ brightness formula to determine whether a color is light or not
export const isLightHex = (hex: string) => {
  if (!isValidHex(hex)) return false;

  const hexNoHash = hex[0] === '#' ? hex.substring(1) : hex;
  const lenNoHash = hexNoHash.length;
  const hexNoAlpha =
    lenNoHash === 4
      ? hexNoHash.substring(0, 3)
      : lenNoHash === 8
        ? hexNoHash.substring(0, 6)
        : hexNoHash;
  const lenNoAlpha = hexNoAlpha.length;
  const normalizedHex =
    lenNoAlpha === 3 ? convertToFullHex(hexNoAlpha) : hexNoAlpha;
  const decimal = parseInt(normalizedHex.replace('#', ''), 16);
  return (
    ((decimal >> 16) * 299 +
      ((decimal >> 8) & 255) * 587 +
      (decimal & 255) * 114) /
      1000 >=
    128
  );
};
