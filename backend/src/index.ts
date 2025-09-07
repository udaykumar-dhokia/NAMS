import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.config";
import cors from "cors";
import HttpStatus from "./utils/httpStatus";
import cookieParser from "cookie-parser";
import AuthRoutes from "./features/auth/auth.routes";
import CollegeRoutes from "./features/college/college.routes";
import AdminRoutes from "./features/admin/admin.routes";
import DegreeRoutes from "./features/degree/degree.routes";
import DepartmentRoutes from "./features/department/departments.routes";
import CourseRoutes from "./features/course/course.routes";
import TimetableRoutes from "./features/timetable/timetable.routes";
import StudentsRoutes from "./features/student/student.routes";
import FacultyRoutes from "./features/faculty/faculty.routes";
import { watchAttendanceChanges } from "./features/attendance/attendance.stream";
import AttendanceRoutes from "./features/attendance/attendance.routes";
import QrcodeRoutes from "./features/qrcode/qrcode.routes";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

export const io = new Server(server, {
  cors: { origin: "*" },
});

app.get("/", (_req, res) => {
  res.status(HttpStatus.OK).json({ message: "Server is up and running..." });
});
app.use("/api/auth", AuthRoutes);
app.use("/api/college", CollegeRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/degree", DegreeRoutes);
app.use("/api/department", DepartmentRoutes);
app.use("/api/course", CourseRoutes);
app.use("/api/timetables", TimetableRoutes);
app.use("/api/student", StudentsRoutes);
app.use("/api/faculty", FacultyRoutes);
app.use("/api/attendance", AttendanceRoutes);
app.use("/api/qrcode", QrcodeRoutes);

io.on("connection", (socket) => {
  console.log("👨‍💻 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  connectDB();
  watchAttendanceChanges(io);
  console.log(`Server is running on http://localhost:${PORT}`);
});
