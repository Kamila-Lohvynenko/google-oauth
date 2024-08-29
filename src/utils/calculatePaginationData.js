export const calculatePaginationData = (totalItems, page, perPage) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  if (page > totalPages) {
    return {
      message: `You are trying to get page number ${page}, there is ${totalPages} pages available`,
    };
  }

  return {
    page,
    perPage,
    totalPages,
    totalItems,
    hasPreviousPage,
    hasNextPage,
  };
};
