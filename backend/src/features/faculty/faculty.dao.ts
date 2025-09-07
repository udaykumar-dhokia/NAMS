import facultyModel from "./faculty.model";

class FacultyDAO {
  // Create new faculty
  async createFaculty(data) {
    try {
      const faculty = new facultyModel(data);
      return await faculty.save();
    } catch (error) {
      throw new Error(`Error creating faculty: ${error.message}`);
    }
  }

  // Find faculty by ID
  async getFacultyById(id) {
    try {
      return await facultyModel
        .findById(id)
        .populate("department")
        .populate("college");
    } catch (error) {
      throw new Error(`Error fetching faculty by ID: ${error.message}`);
    }
  }

  // Find faculty by email
  async getFacultyByEmail(email) {
    try {
      return await facultyModel
        .findOne({ email })
        .populate("department")
        .populate("college");
    } catch (error) {
      throw new Error(`Error fetching faculty by email: ${error.message}`);
    }
  }

  // Get all faculties
  async getAllFaculties(filter = {}) {
    try {
      return await facultyModel
        .find(filter)
        .populate("department")
        .populate("college");
    } catch (error) {
      throw new Error(`Error fetching faculties: ${error.message}`);
    }
  }

  // Update faculty by ID
  async updateFaculty(id, updateData) {
    try {
      return await facultyModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new Error(`Error updating faculty: ${error.message}`);
    }
  }

  // Delete faculty by ID
  async deleteFaculty(id) {
    try {
      return await facultyModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting faculty: ${error.message}`);
    }
  }

  // Update last login
  async updateLastLogin(id) {
    try {
      return await facultyModel.findByIdAndUpdate(
        id,
        { lastLogin: new Date() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating last login: ${error.message}`);
    }
  }
}

export default new FacultyDAO();
