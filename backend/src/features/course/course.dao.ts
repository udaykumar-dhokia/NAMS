import CourseModel from "./course.model";

class CourseDAO {
  // ----------------- CREATE -----------------
  async create(payload: any) {
    try {
      const course = new CourseModel(payload);
      return await course.save();
    } catch (error: any) {
      throw new Error(`Error creating course: ${error.message}`);
    }
  }

  // ----------------- FIND -----------------
  async findAll(filter = {}) {
    try {
      return await CourseModel.find(filter)
        .populate("department")
        .populate("degree")
        .populate("faculty");
    } catch (error: any) {
      throw new Error(`Error fetching courses: ${error.message}`);
    }
  }

  async findById(id: string) {
    try {
      return await CourseModel.find({ college: id });
    } catch (error: any) {
      throw new Error(`Error fetching course by ID: ${error.message}`);
    }
  }

  // ----------------- UPDATE -----------------
  async update(id: string, payload: any) {
    try {
      return await CourseModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
    } catch (error: any) {
      throw new Error(`Error updating course: ${error.message}`);
    }
  }

  // ----------------- DELETE -----------------
  async delete(id: string) {
    try {
      return await CourseModel.findByIdAndDelete(id);
    } catch (error: any) {
      throw new Error(`Error deleting course: ${error.message}`);
    }
  }
}

export default new CourseDAO();
