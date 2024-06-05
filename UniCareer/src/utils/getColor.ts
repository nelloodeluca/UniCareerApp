export const usedColors = new Set();

const colorPalette = [
  '#ff9999',
  '#99ff99',
  '#9999ff',
  '#ffcc99',
  '#cc99ff',
  '#FFB3B3',
  '#B3FFB3',
  '#B3B3FF',
  '#FFE0B3',
  '#E0B3FF',
  '#FFD1B3',
  '#B3FFD1',
  '#D1B3FF',
  '#FFB3E0',
  '#B3E0FF',
];

export const getRandomColor = () => {
  let color;
  do {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    color = colorPalette[randomIndex];
  } while (usedColors.has(color));

  return color;
};

export const addColor = (color: string) => {
  usedColors.add(color);
  console.log('Nuovo colore utilizzato e salvato:', color);
};

export const removeColor = (color: string) => {
  usedColors.delete(color);
  console.log('Colore eliminato:', color);
};
