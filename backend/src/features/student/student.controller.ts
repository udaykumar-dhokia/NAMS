import { Request, Response } from "express";
import StudentDAO from "./student.dao";

class StudentController {
  // Create student
  async createStudent(req: Request, res: Response) {
    try {
      const student = await StudentDAO.create(req.body);
      return res
        .status(201)
        .json({ message: "Student created successfully", student });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Error creating student", error: error.message });
    }
  }

  // Get all students
  async getAllStudents(req: Request, res: Response) {
    try {
      const students = await StudentDAO.findAll();
      return res.json(students);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error fetching students", error: error.message });
    }
  }

  // Get student by ID
  async getStudentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await StudentDAO.findById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.json(student);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error fetching student", error: error.message });
    }
  }

  // Update student by ID
  async updateStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedStudent = await StudentDAO.update(id, req.body);

      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.json({
        message: "Student updated successfully",
        updatedStudent,
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Error updating student", error: error.message });
    }
  }

  // Delete student
  async deleteStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await StudentDAO.delete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.json({ message: "Student deleted successfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error deleting student", error: error.message });
    }
  }

  async getStudentsByCollege(req: Request, res: Response) {
    try {
      const { collegeId } = req.params;
      const students = await StudentDAO.findByCollege(collegeId);
      return res.json(students);
    } catch (error: any) {
      return res.status(500).json({
        message: "Error fetching students by college",
        error: error.message,
      });
    }
  }
}

export default new StudentController();
