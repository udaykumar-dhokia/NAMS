import { Router } from "express";
import { AttendanceController } from "./attendance.controller";

const router = Router();

router.post("/", AttendanceController.create);
router.get("/:id", AttendanceController.getById);
router.get("/course/:courseId", AttendanceController.getByCourse);
router.get("/faculty/:facultyId", AttendanceController.getByFaculty);
router.patch("/:attendanceId/mark", AttendanceController.markStudent);
router.patch("/:attendanceId/remove", AttendanceController.removeStudent);
router.delete("/:id", AttendanceController.delete);

export default router;
