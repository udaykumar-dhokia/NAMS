import express from "express";
import CollegeController from "./college.controller";
const router = express.Router();

router.post("/register", CollegeController.registerCollege);
router.get("/:id", CollegeController.getCollegeById);

export default router;
