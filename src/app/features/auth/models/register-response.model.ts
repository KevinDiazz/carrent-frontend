import { Role } from './role.model';

export interface RegisterResponse {
  name: string;
  email: string;
  role: Role;
}