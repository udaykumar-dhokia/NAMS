import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      phone: String,
      website: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("College", collegeSchema);
