export function groupBy(array: any[], callback: any) {
  return array.reduce((result, item) => {
    const key = callback(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {});
}
