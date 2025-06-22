export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role:string
}

export interface LoginResponse {
  accessToken: string;
}