import express from 'express';
import cors from 'cors';
import { registerStudentRoutes } from './express/Controller/studentController';
import { registerAuthRoutes } from './express/Controller/authController';

const app = express();

app.use(cors());
app.use(express.json());

registerStudentRoutes(app);
registerAuthRoutes(app);

app.listen(3000, () => {
  console.log("Running on http://localhost:3000/students");
});