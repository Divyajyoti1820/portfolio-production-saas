export const getTaskColor = (position: number): string => {
  // Generate a deterministic hash from position number
  const hash = Math.abs(position * 1234567) % 0xffffff;

  // Convert hash to hex color
  const color = hash.toString(16).padStart(6, "0");

  return `#${color}`;
};

export const CapitalizeFirstLetter = (word: string): string => {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};
