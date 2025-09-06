import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import connectDB from "./config/db.config";
import cors from "cors";
import HttpStatus from "./utils/httpStatus";
import cookieParser from "cookie-parser";
import AuthRoutes from "./features/auth/auth.route";
import CollegeRoutes from "./features/college/college.route";
import AdminRoutes from "./features/admin/admin.routes";

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

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
