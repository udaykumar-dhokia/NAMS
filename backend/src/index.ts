import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
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

app.get("/", (_req, res) => {
  res.status(HttpStatus.OK).json({ message: "Server is up and running..." });
});
app.use("/api/auth", AuthRoutes);
app.use("/api/college", CollegeRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/degree", DegreeRoutes);
app.use("/api/department", DepartmentRoutes);
app.use("/api/course", CourseRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
