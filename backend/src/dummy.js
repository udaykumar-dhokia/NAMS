import mongoose from "mongoose";
import Attendance from "./models/Attendance.js"; // adjust path
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

export default async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // clear collection
    await Attendance.deleteMany();

    // insert dummy attendance with empty studentsPresent
    await Attendance.insertMany([
      { date: new Date("2025-09-01"), studentsPresent: [] },
      { date: new Date("2025-09-02"), studentsPresent: [] },
      { date: new Date("2025-09-03"), studentsPresent: [] },
    ]);

    console.log("🎉 Dummy attendance data seeded with empty students!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}
