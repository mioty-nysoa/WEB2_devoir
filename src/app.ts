import express from 'express';
import cors from 'cors';
import { registerStudentRoutes } from './express/Controller/studentController';

const app = express();

app.use(cors());
app.use(express.json());

registerStudentRoutes(app);

app.listen(3000, () => {
  console.log("Running on http://localhost:3000/students");
});