export const verifyRequestData = (arr: any[]): boolean =>
  arr.every((ele) => {
    return ele !== undefined && ele !== null;
  });
