import { Express, Request, Response } from 'express';
import { studentService } from '../Service/studentService';

const service = new studentService();

export const registerStudentRoutes = (app: Express) => {

  app.get('/Students', async (req: Request, res: Response) => {
    const list = await service.getAll();
    res.status(200).json(list);
  });

   app.get('/Students/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const student = await service.getById(id);
    res.status(200).json(student);
  });

  app.post('/Students', async (req: Request, res: Response) => {
    const name = req.body.name;
    const age = req.body.age;

    const newStudent = await service.create(name, age);
    res.status(201).json(newStudent);
  });

  app.put('/Students/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const name = req.body.name;
    const age = req.body.age;

    const updateStudent = await service.update(id, name, age);
    res.status(200).json(updateStudent);
  });

  app.patch('/Students/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const name = req.body.name;
    const age = req.body.age;

    const updatedStudent = await service.update(id, name, age);
    res.status(200).json(updatedStudent);
  });

  app.delete('/Students/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await service.delete(id);

    res.status(200).json({ message: "student deleted" });
  });
}