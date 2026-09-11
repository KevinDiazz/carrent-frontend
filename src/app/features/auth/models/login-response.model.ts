import { Role } from './role.model';

export interface LoginResponse {
  email: string;
  role: Role;
  name: string;
}
