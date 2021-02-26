export interface JwtPayload {
  email: string;
}

export interface LoginStatus {
  name: string;
  userrole: string;
  accesssToken: string;
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
}
