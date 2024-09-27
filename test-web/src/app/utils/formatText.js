// la primera letra de cada palabra en mayuscula
const formatText = (text) => {
  if (!text) return '';
  const words = text.split(' ');
  const formattedWords = words.map((word) => {
    const firstLetter = word[0]?.toUpperCase();
    const restOfWord = word?.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return formattedWords.join(' ');
};
export default formatText;
