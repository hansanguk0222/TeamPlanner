import { AxiosError } from 'axios';

export interface AuthState {
  loading: boolean;
  err: AxiosError | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface LoginPayload {
  email: string;
  pw: string;
}

export interface LoginSuccessPayload {
  accessToken: string;
  refreshToken: string;
}

export interface LoginErrorPayload {
  err: AxiosError;
}
