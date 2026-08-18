import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthenticatedUser } from '../Model/userModel';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET 

export class authService {
    
  generateToken(user: AuthenticatedUser): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET!,
      { expiresIn: '2h' }
    );
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}