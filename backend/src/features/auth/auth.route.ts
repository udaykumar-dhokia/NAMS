import express from "express";
import AuthController from "./auth.controller";
const router = express.Router();

router.post("/a/login", AuthController.adminLogin);
router.post("/f/login");
router.post("/s/login");

export default router;
