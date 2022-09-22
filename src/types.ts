export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}
