export const extractAlphabets = (input: string): string => {
  const words = input.split(" ");

  if (words.length === 1) {
    return words[0][0];
  } else if (words.length >= 2) {
    const firstWordFirstLetter = words[0][0];
    const lastWordFirstLetter = words[words.length - 1][0];
    return firstWordFirstLetter + lastWordFirstLetter;
  }

  return "";
};
