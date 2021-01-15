export const verifyRequestData = (arr: any[]): boolean =>
  arr.every((ele) => {
    return ele !== undefined && ele !== null;
  });

export const randomCode = (): string => {
  const charecters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i += 1) {
    code += charecters[Math.floor(Math.random() * charecters.length)];
  }
  return code;
};
