import express from "express";
import FacultyAuthController from "./faculty.controller";
import facultyMiddleware from "../../middlewares/faculty.middleware";
const router = express.Router();

router.get("/exists", facultyMiddleware, FacultyAuthController.exists);

export default router;
