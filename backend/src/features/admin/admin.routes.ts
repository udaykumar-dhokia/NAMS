import express from "express";
import AdminController from "./admin.controller";
import adminMiddleware from "../../middlewares/admin.middleware";
const router = express.Router();

router.get("/exists", adminMiddleware, AdminController.exists);

export default router;
