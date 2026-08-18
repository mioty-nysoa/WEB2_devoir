export type Role = 'ADMIN' | 'STUDENT';

export interface User {
  id: number;
  email: string;
  password: string;
  role: Role;
}

export type AuthenticatedUser = Omit<User, 'password'>;
