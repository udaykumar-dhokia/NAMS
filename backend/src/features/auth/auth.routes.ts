import express from "express";
import AuthController from "./auth.controller";
import FacultyAuthController from "../faculty/faculty.controller";
const router = express.Router();

router.post("/a/login", AuthController.adminLogin);
router.post("/a/register", AuthController.adminRegister);
router.post("/f/login", FacultyAuthController.facultyLogin);
router.post("/f/register", FacultyAuthController.facultyRegister);
// router.post("/s/login");

export default router;
