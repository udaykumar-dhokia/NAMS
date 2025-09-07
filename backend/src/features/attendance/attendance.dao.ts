import { Types } from "mongoose";
import attendanceModel from "./attendance.model";

export const AttendanceDAO = {
  async createAttendance(data: {
    date: Date;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    studentsPresent: Types.ObjectId[];
  }) {
    return await attendanceModel.create(data);
  },

  async getAttendanceById(id: string) {
    return await attendanceModel
      .findById(id)
      .populate("course")
      .populate("faculty")
      .populate("studentsPresent");
  },

  async getAttendanceByCourse(courseId: string) {
    return await attendanceModel
      .find({ course: courseId })
      .populate("faculty")
      .populate("studentsPresent");
  },

  async getAttendanceByFaculty(facultyId: string) {
    return await attendanceModel
      .find({ faculty: facultyId })
      .populate("course")
      .populate("studentsPresent");
  },

  async markStudentAttendance(attendanceId: string, studentId: string) {
    return await attendanceModel.findByIdAndUpdate(
      attendanceId,
      { $addToSet: { studentsPresent: studentId } },
      { new: true }
    );
  },

  async removeStudentAttendance(attendanceId: string, studentId: string) {
    return await attendanceModel.findByIdAndUpdate(
      attendanceId,
      { $pull: { studentsPresent: studentId } },
      { new: true }
    );
  },

  async deleteAttendance(id: string) {
    return await attendanceModel.findByIdAndDelete(id);
  },
};
