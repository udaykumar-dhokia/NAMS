import DegreeModel from "./degree.model";

class DegreeDAO {
  // ----------------- CREATE -----------------

  async create(payload) {
    try {
      const degree = new DegreeModel(payload);
      return await degree.save();
    } catch (error) {
      throw new Error(`Error creating degree: ${error.message}`);
    }
  }

  // ----------------- FIND -----------------

  async findAll(filter = {}) {
    try {
      return await DegreeModel.find(filter)
        .populate("departments")
        .populate("college")
        .populate("createdBy");
    } catch (error) {
      throw new Error(`Error fetching degrees: ${error.message}`);
    }
  }

  async findByCollegeId(collegeId: string) {
    try {
      return await DegreeModel.find({ college: collegeId });
    } catch (error) {
      throw new Error(`Error fetching degrees by college ID: ${error.message}`);
    }
  }

  async findById(id: string) {
    try {
      return await DegreeModel.findById(id)
        .populate("departments")
        .populate("college")
        .populate("createdBy");
    } catch (error) {
      throw new Error(`Error fetching degree by ID: ${error.message}`);
    }
  }

  // ----------------- UPDATE -----------------

  async update(id: string, payload) {
    try {
      return await DegreeModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new Error(`Error updating degree: ${error.message}`);
    }
  }

  // ----------------- DELETE -----------------

  async delete(id: string) {
    try {
      return await DegreeModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting degree: ${error.message}`);
    }
  }
}

export default new DegreeDAO();
