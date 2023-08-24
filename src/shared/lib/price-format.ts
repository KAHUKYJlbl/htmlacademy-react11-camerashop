export const priceFormat = (price: number): string => {
  if (price === 0) {
    return '0 ₽';
  }

  let priceStr = String(price);
  let decim = '';
  const dotIndex = priceStr.indexOf('.');

  if (dotIndex > 0) {
    decim = priceStr.slice(dotIndex).slice(0, 3);
    priceStr = priceStr.slice(0, dotIndex);
  }

  if (priceStr.length < 4) {
    return `${priceStr + decim} ₽`;
  }

  let result = priceStr.length > 3 ? '' : priceStr;

  while (priceStr.length > 3) {
    result = `${priceStr.slice(-3)} ${result}`;
    priceStr = priceStr.slice(0, -3);
  }

  return `${priceStr} ${result.trim() + decim} ₽`;
};
