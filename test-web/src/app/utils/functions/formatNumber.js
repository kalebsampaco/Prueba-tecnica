const formatNumber = (numberString = "", decimal = 2) => {
  const number = parseFloat(numberString);

  const numberFormatter = number.toFixed(decimal);

  return numberFormatter.toString();
};

export default formatNumber;
