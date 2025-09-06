import express from "express";
import DegreeController from "./degree.controller";
const router = express.Router();

router.get("/get-all", DegreeController.getAllDegrees);
router.get("/:collegeId", DegreeController.getDegreesByCollegeId);
router.post("/create", DegreeController.createDegree);

export default router;
