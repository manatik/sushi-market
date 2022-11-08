export const isTrue = (value: string | boolean) => {
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return value;
};

export const idsArrayToArrayOfObjects = (ids: string[]): { id: string }[] =>
  ids?.length ? ids.map((id) => ({ id })) : [];

export const arrayOfObjectsToArrayIds = (arr: any[]): string[] => (arr?.length ? arr.map((item) => item.id) : []);
