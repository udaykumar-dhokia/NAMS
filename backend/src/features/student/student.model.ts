import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    enrollmentNo: {
      type: String,
      required: true,
      unique: true,
    },
    yearOfAdmission: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
    },
    degree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Degree",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    attendance: [
      {
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" },
        percentage: { type: Number, default: 0 },
      },
    ],
    careerGoals: [
      {
        type: String,
      },
    ],
    interests: [{ type: String }],
    strengths: [{ type: String }],
    status: {
      type: String,
      enum: ["active", "inactive", "graduated", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
