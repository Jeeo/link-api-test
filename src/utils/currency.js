export const dummyCurrencyConv = (value, currency) => {
  switch (currency) {
    case 'USD':
      return (value * 5.20).toFixed(2);

    case 'EUR':
      return (value * 6.00).toFixed(2);

    default:
      return value;
  }
};
