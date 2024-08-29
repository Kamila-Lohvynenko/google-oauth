const parseNumber = (mayBeNumber, defaultValue) => {
  if (typeof mayBeNumber !== 'string') return defaultValue;

  const parsedNumber = parseInt(mayBeNumber);
  if (Number.isNaN(parsedNumber)) return defaultValue;

  if (parsedNumber <= 0) return defaultValue;

  return mayBeNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
