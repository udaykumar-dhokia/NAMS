// seedStudents.js
import mongoose from "mongoose";
import studentDao from "./features/student/student.dao";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URL; // change to your DB

// Constants
const collegeId = new mongoose.Types.ObjectId("68bb538aa842507b508e1cd8");
const departmentIds = [
  new mongoose.Types.ObjectId("68bbc99abdc29d915b21ead4"),
  new mongoose.Types.ObjectId("68bbcab3b31e2b1c718ce036"),
  new mongoose.Types.ObjectId("68bbfc9d97f9b79609e0ecbe"),
];
const degreeId = new mongoose.Types.ObjectId(); // replace with real Degree _id if you have

// Helpers
const randomDepartment = () =>
  departmentIds[Math.floor(Math.random() * departmentIds.length)];

const randomSemester = () => Math.floor(Math.random() * 8) + 1;

const randomYearOfAdmission = () => 2018 + Math.floor(Math.random() * 6); // e.g., between 2018 and 2023

// Dummy student base
const dummyStudents = [
  { name: "Amit Sharma", phone: "9876543210" },
  { name: "Priya Verma", phone: "9123456789" },
  { name: "Rahul Mehta", phone: "9988776655" },
  { name: "Sneha Iyer", phone: "9090909090" },
  { name: "Karan Desai", phone: "9191919191" },
  { name: "Neha Singh", phone: "9345678901" },
  { name: "Vivek Nair", phone: "9456789012" },
  { name: "Pooja Patel", phone: "9567890123" },
  { name: "Rohan Gupta", phone: "9678901234" },
  { name: "Meera Joshi", phone: "9789012345" },
];

const seedStudents = dummyStudents.map((s, idx) => {
  const year = randomYearOfAdmission();
  const enrollNo = `ENR${year}${1000 + idx}`;
  const email = `${s.name.toLowerCase().replace(" ", ".")}@example.com`;

  return {
    ...s,
    email,
    password: "hashedpassword123",
    enrollmentNo: enrollNo,
    yearOfAdmission: year,
    semester: randomSemester(),
    degree: degreeId,
    department: randomDepartment(),
    college: collegeId,
    careerGoals: ["Software Engineer", "Research", "Entrepreneurship"],
    interests: ["AI", "Cloud Computing", "Data Science"],
    strengths: ["Teamwork", "Problem Solving", "Adaptability"],
    status: "active",
  };
});

export const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to DB");

    await studentDao.insertMany(seedStudents);

    console.log("Dummy students inserted!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding students:", err);
    process.exit(1);
  }
};
