import express from 'express';
import cors from 'cors';
import { registerStudentRoutes } from '../src/Controller/studentController';
import { registerAuthRoutes } from '../src/Controller/authController';

const app = express();

app.use(cors());
app.use(express.json());

registerStudentRoutes(app);
registerAuthRoutes(app);

app.listen(3000, () => {
  console.log("Running on http://localhost:3000/students");
});