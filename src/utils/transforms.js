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

export function convertWeiToDtx(dtxValue) {
  // TODO: parse the number so that we don't get weird scientific notationb (f.e. 5e-7)
  return BigNumber(dtxValue)
    .div(BigNumber(10).pow(18))
    .toString();
}
