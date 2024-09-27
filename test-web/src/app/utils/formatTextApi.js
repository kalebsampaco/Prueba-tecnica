// change _ to  ' ' and capitalize the first letter of each word
const formatText = (text) => {
  if(!text) return '';
  const textInLowerCase = text.toLowerCase();
  return textInLowerCase
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default formatText;
