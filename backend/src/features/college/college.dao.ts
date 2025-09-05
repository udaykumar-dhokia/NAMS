import mongoose from "mongoose";
import collegeModel from "./college.model";

class CollegeDAO {
  // ----------------- FIND -----------------

  async findById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await collegeModel.findById(id);
  }

  async findByName(name: string) {
    if (!name) return null;
    return await collegeModel.findOne({ name });
  }

  async findAll() {
    return await collegeModel.find();
  }

  // ----------------- CREATE -----------------

  async create(payload: {
    name: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      pincode?: string;
    };
    contact: {
      email: string;
      phone?: string;
      website?: string;
    };
  }) {
    const college = new collegeModel(payload);
    return await college.save();
  }

  // ----------------- UPDATE -----------------

  async updateById(
    id: string,
    payload: Partial<{
      name: string;
      address: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: string;
      };
      contact: {
        email?: string;
        phone?: string;
        website?: string;
      };
    }>
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await collegeModel.findByIdAndUpdate(id, payload, { new: true });
  }

  // ----------------- DELETE -----------------

  async deleteById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await collegeModel.findByIdAndDelete(id);
  }
}

export default new CollegeDAO();
