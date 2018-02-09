import BigNumber from 'bignumber.js';

export function parseNumberWithDecimal(number, decimal) {
  const baseNumber = new BigNumber(number);
  if (decimal > 0) {
    return baseNumber.div(new BigNumber(10).pow(decimal));
  }
  return baseNumber;
}

export function parseNumberWithoutDecimal(number, decimal) {
  const baseNumber = new BigNumber(number);
  if (decimal > 0) {
    return baseNumber.mul(new BigNumber(10).pow(decimal));
  }
  return baseNumber;
}
