import {Pool} from "pg";
import {Student} from "../Model/studentModel";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'students',
    port: 5432,
    });

export class studentRepository {
    async getAll(): Promise<Student[]> {
        const result = await pool.query('SELECT * FROM students');
        return result.rows;
    }

    async getById(id: number): Promise<Student | null> {
        const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        if (result.rows.length === 0) {
    return null;
  }
  
    return result.rows[0];
    }

    async create(name: string, age: number): Promise<Student> {
        const result = await pool.query('INSERT INTO students (name, age) VALUES ($1, $2) RETURNING *', [name, age]);
        return result.rows[0];
    }

    async update(id: number, name: string, age: number): Promise<Student | null> {
        const result = await pool.query('UPDATE students SET name = $1, age = $2 WHERE id = $3 RETURNING *', [name, age, id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }

    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM students WHERE id = $1', [id]);
    }
}
