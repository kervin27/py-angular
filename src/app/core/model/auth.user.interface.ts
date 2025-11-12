export interface AuthUserLogin {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface AuthMessage {
  message: string;
  id?: string;
}
