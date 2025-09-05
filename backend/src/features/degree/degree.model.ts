import mongoose from "mongoose";

const degreeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "B.Tech",
        "B.E",
        "B.Sc",
        "B.A",
        "B.Com",
        "BBA",
        "M.Tech",
        "M.E",
        "M.Sc",
        "M.A",
        "M.Com",
        "MBA",
        "PhD",
        "Diploma",
        "Certificate",
      ],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    semesters: {
      type: Number,
    },
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Degree", degreeSchema);
