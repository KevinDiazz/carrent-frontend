import { Role } from "./role.model";

export interface LoginResponse {
  token: string;
  email: string;
  role: Role;
}