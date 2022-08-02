export const integerInputValidator = (input: string): string => {
  const numberString = input.replace(/[^0-9]/g, '');
  return numberString;
};

export const decimalInputValidator = (input: string): string => {
  const numberString = input.replace(/[^0-9.]/g, '');
  return numberString;
}
