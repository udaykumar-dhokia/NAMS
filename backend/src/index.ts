import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import connectDB from "./config/db.config";
import cors from "cors";
import HttpStatus from "./utils/httpStatus";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(HttpStatus.OK).json({ message: "Server is up and running..." });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
