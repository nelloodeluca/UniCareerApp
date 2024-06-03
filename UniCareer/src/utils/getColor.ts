export const usedColors = new Set();

const colorPalette = [
  '#FF5733', '#33FF57', '#3357FF', '#F33FF5', '#33FFF5',
  '#FF33A1', '#FF8C33', '#33FF8C', '#8C33FF', '#FF3333',
  '#33FF33', '#3333FF', '#FF33FF', '#33FFFF', '#FFFF33'
];

export const getRandomColor = () => {
  let color;
  do {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    color = colorPalette[randomIndex];
  } while (usedColors.has(color));

  usedColors.add(color);
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
