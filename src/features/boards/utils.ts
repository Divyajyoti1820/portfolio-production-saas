export const getRandomColor = (boardId: string): string => {
  // Generate a deterministic hash from boardId
  const hash = Array.from(boardId).reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Convert hash to hex color
  const color = (hash & 0x00ffffff).toString(16).padStart(6, "0");

  return `#${color}`;
};
