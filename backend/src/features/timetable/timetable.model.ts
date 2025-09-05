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
    timetable: {
      Mon: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: {
            type: Date,
            required: true,
          },
          end: {
            type: Date,
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
          start: { type: Date, required: true },
          end: { type: Date, required: true },
        },
      ],
      Wed: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: Date, required: true },
          end: { type: Date, required: true },
        },
      ],
      Thu: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: Date, required: true },
          end: { type: Date, required: true },
        },
      ],
      Fri: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: Date, required: true },
          end: { type: Date, required: true },
        },
      ],
      Sat: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          start: { type: Date, required: true },
          end: { type: Date, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Timetable", timetableSchema);
