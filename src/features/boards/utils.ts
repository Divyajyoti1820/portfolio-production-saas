const tailwindColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

const usedColors: Set<string> = new Set();

export const getRandomColor = (): string => {
  if (usedColors.size >= tailwindColors.length) {
    usedColors.clear(); // Reset if all colors are used
  }

  let color: string;
  do {
    color = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
  } while (usedColors.has(color));

  usedColors.add(color);
  return color;
};
