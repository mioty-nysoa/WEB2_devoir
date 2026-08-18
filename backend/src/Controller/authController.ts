import { Express, Request, Response } from 'express';
import { pool } from '../Repository/studentRepository'; 
import { authService } from '../Service/authService';
import { AuthenticatedUser, Role } from '../Model/userModel';

const service = new authService();

export const registerAuthRoutes = (app: Express) => {

  app.post('/register', async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    const hashedPassword = await service.hashPassword(password);
    const userRole: Role = role || 'STUDENT';

    const result = await pool.query(
      'INSERT INTO app_user (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, hashedPassword, userRole]
    );

    res.status(201).json(result.rows[0]);
  });

  app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userResult = await pool.query('SELECT * FROM app_user WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const dbUser = userResult.rows[0];

    const validPassword = await service.comparePassword(password, dbUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const authenticatedUser: AuthenticatedUser = {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role
    };


    const token = service.generateToken(authenticatedUser);

    res.status(200).json({ token, user: authenticatedUser });
  });
};