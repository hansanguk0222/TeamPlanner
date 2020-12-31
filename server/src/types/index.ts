export interface Model {
  [key: string]: (param?: any) => any;
}

export interface Error {
  status?: number;
  message?: string;
}
