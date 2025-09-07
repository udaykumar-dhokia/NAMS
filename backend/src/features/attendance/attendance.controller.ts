import { Request, Response } from "express";
import { AttendanceDAO } from "./attendance.dao";

export const AttendanceController = {
  async create(req: Request, res: Response) {
    try {
      const { date, course, faculty, studentsPresent } = req.body;
      const attendance = await AttendanceDAO.createAttendance({
        date,
        course,
        faculty,
        studentsPresent,
      });
      
      res.status(201).json({ success: true, data: attendance });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const attendance = await AttendanceDAO.getAttendanceById(id);
      if (!attendance) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      res.json({ success: true, data: attendance });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getByCourse(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const records = await AttendanceDAO.getAttendanceByCourse(courseId);
      res.json({ success: true, data: records });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getByFaculty(req: Request, res: Response) {
    try {
      const { facultyId } = req.params;
      const records = await AttendanceDAO.getAttendanceByFaculty(facultyId);
      res.json({ success: true, data: records });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async markStudent(req: Request, res: Response) {
    try {
      const { attendanceId } = req.params;
      const { studentId } = req.body;
      const updated = await AttendanceDAO.markStudentAttendance(
        attendanceId,
        studentId
      );
      res.json({ success: true, data: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async removeStudent(req: Request, res: Response) {
    try {
      const { attendanceId } = req.params;
      const { studentId } = req.body;
      const updated = await AttendanceDAO.removeStudentAttendance(
        attendanceId,
        studentId
      );
      res.json({ success: true, data: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await AttendanceDAO.deleteAttendance(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      res.json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
