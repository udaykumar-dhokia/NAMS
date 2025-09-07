import Student from "./student.model";
import { Types } from "mongoose";

class StudentDAO {
  // Create new student
  async create(studentData: any) {
    return await Student.create(studentData);
  }

  // Bulk create students
  async insertMany(studentsData: any[]) {
    return await Student.insertMany(studentsData, { ordered: false });
    // ordered:false => continues inserting even if some fail (e.g. duplicates)
  }

  // Find all students
  async findAll() {
    return await Student.find()
      .populate("degree")
      .populate("department")
      .populate("college");
  }

  // Find student by ID
  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Student.findById(id)
      .populate("degree")
      .populate("department")
      .populate("college");
  }

  // Find student by email
  async findByEmail(email: string) {
    return await Student.findOne({ email });
  }

  // Update student by ID
  async update(id: string, updateData: any) {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // Delete student by ID
  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Student.findByIdAndDelete(id);
  }

  async findByCollege(collegeId: string) {
    return await Student.find({ college: collegeId });
  }
}

export default new StudentDAO();
