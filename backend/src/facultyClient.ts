import { io } from "socket.io-client";

//to run this file use command: ts-node facultyClient.ts

// Use your running backend server URL
const socket = io("http://localhost:3000", {
  transports: ["websocket"], // force WebSocket
});

// Replace with a real lectureId from your DB
const lectureId = "68bb45fb120e862f811086d1";

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  // Join faculty room
  socket.emit("join-faculty-room", lectureId);
  console.log(`Joined faculty room for lecture ${lectureId}`);
});

socket.on("new-qr", (data) => {
  console.log("New QR received from backend:");
  console.log(data);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from server");
});
