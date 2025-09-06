import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    degreesOffered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Degree",
      },
    ],
    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    faculty: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
