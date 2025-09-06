import express from "express";
import http from "http";
import connectDB from "./config/db.config";
import qrRoutes from "../src/features/qrcode/qrcode.routes";
import { Server } from "socket.io"; 

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.json());

//routes
app.use("/api/qr", qrRoutes);

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

// Setup Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "*", // adjust to your frontend URL in production
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Faculty joins a lecture room
  socket.on("join-faculty-room", (lectureId: string) => {
    socket.join(`faculty_${lectureId}`);
    console.log(`Faculty joined room faculty_${lectureId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
