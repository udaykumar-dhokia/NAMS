import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    semester: {
      type: Number,
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
    timetable: {
      Mon: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: {
            type: String,
            required: true,
          },
          end: {
            type: String,
            required: true,
          },
        },
      ],
      Tue: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
      Wed: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
      Thu: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
      Fri: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
      Sat: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Timetable", timetableSchema);
