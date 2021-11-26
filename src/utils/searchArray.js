export default (array, field, query) => {
  const result = array.filter((item) => {
    return item[field] === query;
  });
  return result;
};
