import { Router } from "express";
import StudentController from "./student.controller";

const router = Router();

router.post("/", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudentById);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);
router.get("/college/:collegeId", StudentController.getStudentsByCollege);

export default router;
