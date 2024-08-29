const parseSortBy = (mayBeSortBy) => {
  if (typeof mayBeSortBy !== 'string') return '_id';

  const keys = ['_id', 'name', 'email', 'phone', 'isFavourite', 'createdAt'];

  if (keys.includes(mayBeSortBy)) return mayBeSortBy;

  return '_id';
};

const parseSortOrder = (mayBeSortOrder) => {
  if (typeof mayBeSortOrder !== 'string') return 'asc';

  const keys = ['asc', 'desc', 'ascending', 'descending', '1', '-1'];

  if (keys.includes(mayBeSortOrder)) return mayBeSortOrder;

  return 'asc';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
