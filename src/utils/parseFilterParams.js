const parseType = (mayBeType) => {
  if (typeof mayBeType !== 'string') return;

  const types = ['work', 'home', 'personal'];
  if (types.includes(mayBeType)) return mayBeType;

  return;
};

const parseIsFavourite = (mayBeIsFavourite) => {
  if (typeof mayBeIsFavourite !== 'string') return;

  const values = ['true', 'false'];
  if (!values.includes(mayBeIsFavourite)) return;

  return mayBeIsFavourite === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
