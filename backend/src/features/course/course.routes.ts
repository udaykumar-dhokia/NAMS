import express from "express";
import CourseController from "./course.controller";

const router = express.Router();

router.post("/create", CourseController.createCourse);
router.get("/", CourseController.getCourses);
router.get("/:id", CourseController.getCourseById);
router.put("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);

export default router;
