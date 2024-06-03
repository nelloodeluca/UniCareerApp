export const usedColors = new Set();

const colorPalette = [
  '#FF7F50',
  '#66FF66',
  '#6699FF',
  '#FF66FF',
  '#66FFFF',
  '#FF66CC',
  '#FFA07A',
  '#66FFCC',
  '#B266FF',
  '#FF6666',
  '#66FF99',
  '#6666FF',
  '#FF99FF',
  '#66FFFF',
  '#FFFF66',
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
