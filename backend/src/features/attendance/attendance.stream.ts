// attendance.watch.ts
import attendanceModel from "./attendance.model";

export function watchAttendanceChanges(io: any) {
  const changeStream = attendanceModel.watch();

  changeStream.on("change", async (change) => {
    console.log("Attendance change detected:", change);

    if (change.operationType === "update") {
      const updatedDoc = await attendanceModel
        .findById(change.documentKey._id)
        .populate("studentsPresent", "name rollNo") // only return name + rollNo
        .populate("course", "name")
        .populate("faculty", "name");

      io.emit("attendanceChange", {
        _id: updatedDoc?._id,
        date: updatedDoc?.date,
        course: updatedDoc?.course,
        faculty: updatedDoc?.faculty,
        image_url: updatedDoc?.image_url,
        studentsPresent: updatedDoc?.studentsPresent,
      });
    }
  });

  changeStream.on("error", (err) => {
    console.error("Change stream error:", err);
  });
}
