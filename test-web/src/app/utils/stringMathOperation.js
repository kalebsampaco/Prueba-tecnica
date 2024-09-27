import stringMath from 'string-math';

// Documentacion stringMath: https://www.npmjs.com/package/string-math

// eslint-disable-next-line consistent-return
const stringMathOperation = (operation) => {
  if (typeof operation === 'string') {
    return stringMath(operation);
  }
};

export default stringMathOperation;
