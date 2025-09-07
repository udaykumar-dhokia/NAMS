import qrcodeModel from "./qrcode.model";

export function watchAttendanceChanges(io: any) {
  const changeStream = qrcodeModel.watch();

  changeStream.on("change", (change) => {
    console.log("Qrcode change detected:", change);

    // Emit real-time event to all connected clients
    io.emit("qrChange", change);
  });

  changeStream.on("error", (err) => {
    console.error("Change stream error:", err);
  });
}
