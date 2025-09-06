import DepartmentModel from "./department.model";

class DepartmentDAO {
  // ----------------- CREATE -----------------
  async create(payload) {
    try {
      const department = new DepartmentModel(payload);
      return await department.save();
    } catch (error: any) {
      throw new Error(`Error creating department: ${error.message}`);
    }
  }

  // ----------------- FIND -----------------
  async findAll(filter = {}) {
    try {
      return await DepartmentModel.find(filter)
        .populate("college")
        .populate("degreesOffered")
        .populate("hod")
        .populate("faculty");
    } catch (error: any) {
      throw new Error(`Error fetching departments: ${error.message}`);
    }
  }

  async findById(id: string) {
    try {
      return await DepartmentModel.find({ college: id });
    } catch (error: any) {
      throw new Error(`Error fetching department by ID: ${error.message}`);
    }
  }

  // ----------------- UPDATE -----------------
  async update(id: string, payload) {
    try {
      return await DepartmentModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
    } catch (error: any) {
      throw new Error(`Error updating department: ${error.message}`);
    }
  }

  // ----------------- DELETE -----------------
  async delete(id: string) {
    try {
      return await DepartmentModel.findByIdAndDelete(id);
    } catch (error: any) {
      throw new Error(`Error deleting department: ${error.message}`);
    }
  }
}

export default new DepartmentDAO();
