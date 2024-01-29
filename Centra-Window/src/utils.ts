export const formatPhoneNumber = (input: string) => {
  const formattedNumber = input.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  return formattedNumber;
};
