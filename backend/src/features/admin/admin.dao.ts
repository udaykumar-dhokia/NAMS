import mongoose from "mongoose";
import adminModel from "./admin.model";

class AdminDAO {
  // ----------------- FIND -----------------

  async findByEmail(email: string) {
    if (!email) return null;
    return await adminModel.findOne({ email });
  }

  async findById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await adminModel.findById(id);
  }

  async findAll() {
    return await adminModel.find().select("-password");
  }

  // ----------------- CREATE -----------------

  async create(payload: {
    name: string;
    email: string;
    password: string;
    college: string;
  }) {
    const admin = new adminModel(payload);
    return await admin.save();
  }

  // ----------------- UPDATE -----------------

  async updateById(
    id: string,
    payload: Partial<{ name: string; email: string; password: string }>
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await adminModel.findByIdAndUpdate(id, payload, { new: true });
  }

  // ----------------- DELETE -----------------

  async deleteById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await adminModel.findByIdAndDelete(id);
  }
}

export default new AdminDAO();
