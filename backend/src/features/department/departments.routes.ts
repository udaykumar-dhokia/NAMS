import express from "express";
import DepartmentController from "./department.controller";

const router = express.Router();

router.post("/create", DepartmentController.createDepartment);
router.get("/", DepartmentController.getDepartments);
router.get("/:id", DepartmentController.getDepartmentById);
router.put("/:id", DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);

export default router;
