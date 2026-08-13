import express from 'express';
import { registerStudentRoutes } from './Controller/studentController';

const app = express();

app.use(express.json());

registerStudentRoutes(app);

app.listen(3000, () => {
  console.log("Running on http://localhost:3000/students");
});