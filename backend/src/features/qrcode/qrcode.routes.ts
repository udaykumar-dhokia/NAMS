import { Router } from "express";
import { createQRCode, scanQRCode } from "./qrcode.controllers";

const router = Router();

// Route to create a new QR code
router.post("/create", createQRCode);

// (Optional) Other routes you might add later
router.post("/scan", scanQRCode);
// router.post("/invalidate/:qrId", invalidateQRCode);
// router.get("/active/:lectureId", getActiveQRCode);
// router.get("/history/:lectureId", getQRHistory);

export default router;
