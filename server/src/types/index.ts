export interface Model {
  [key: string]: (param?: any) => any;
}

export interface Error {
  status?: number;
  message?: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}
