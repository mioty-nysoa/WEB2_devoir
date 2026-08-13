import { Express, Request, Response } from 'express';
import { studentService } from '../service/studentService';

const service = new studentService();

export function registerStudentRoutes(app: Express) {

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
    const nom = req.body.nom;
    const age = req.body.age;

    const newStudent = await service.create(nom, age);
    res.status(201).json(newStudent);
  });

  app.put('/Students/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const nom = req.body.nom;
    const age = req.body.age;

    const updateStudent = await service.update(id, nom, age);
    res.status(200).json(updateStudent);
  });

  app.patch('/Students/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const nom = req.body.nom;
    const age = req.body.age;

    const updatedStudent = await service.update(id, nom, age);
    res.status(200).json(updatedStudent);
  });

  app.delete('/Students/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await service.delete(id);

    res.status(200).json({ message: "student deleted" });
  });
}