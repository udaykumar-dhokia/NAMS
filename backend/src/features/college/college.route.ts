import express from "express";
import CollegeController from "./college.controller";
const router = express.Router();

router.post("/register", CollegeController.registerCollege);

export default router;
