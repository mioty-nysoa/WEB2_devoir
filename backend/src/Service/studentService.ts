import {studentRepository} from "../Repository/studentRepository";
import {Student} from "../Model/studentModel";

export class studentService {
    private studentRepository= new studentRepository();
    
    async getAll(): Promise<Student[]> {
        return this.studentRepository.getAll();
    }

    async getById(id: number): Promise<Student | null> {
        return this.studentRepository.getById(id);
    }

    async create(name: string, age: number): Promise<Student> {
        return this.studentRepository.create(name, age);
    }

    async update(id: number, name: string, age: number): Promise<Student | null> {
        return this.studentRepository.update(id, name, age);
    }

    async delete(id: number): Promise<void> {
        return this.studentRepository.delete(id);
    }
}