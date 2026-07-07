export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role?: "CUSTOMER" | "PROVIDER" | "ADMIN";
}

export interface ILoginUser {
  email: string;
  password: string;
}
