export const compareStrings = (str1?: string | null, str2?: string | null): boolean => {
  if (!str1 || !str2) return false;
  const cleanStr1 = str1.replace(/\s+/g, '').trim();
  const cleanStr2 = str2.replace(/\s+/g, '').trim();
  return cleanStr1 === cleanStr2;
};
