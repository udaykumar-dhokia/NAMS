import { Router } from "express";
import TimetableController from "./timetable.controller";
import adminMiddleware from "../../middlewares/admin.middleware";

const router = Router();

router.post("/create", adminMiddleware, TimetableController.createTimetable);
router.get("/", adminMiddleware, TimetableController.getAllTimetables);
router.get("/:id", adminMiddleware, TimetableController.getTimetableById);
router.put("/:id", adminMiddleware, TimetableController.updateTimetable);
router.delete("/:id", adminMiddleware, TimetableController.deleteTimetable);

export default router;
