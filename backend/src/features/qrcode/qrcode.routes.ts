import { Router } from "express";
import { createQRCode, scanQRCode } from "./qrcode.controller";
import qrcodeModel from "./qrcode.model";

const router = Router();

// Route to create a new QR code
router.post("/create", createQRCode);

// (Optional) Other routes you might add later
router.post("/scan", scanQRCode);
// router.post("/invalidate/:qrId", invalidateQRCode);
// router.get("/active/:lectureId", getActiveQRCode);
// router.get("/history/:lectureId", getQRHistory);
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const qr = await qrcodeModel.findById(req.params.id);
    if (!qr) return res.status(404).json({ message: "QR not found" });

    res.json(qr);
  } catch (error) {
    res.status(500).json({ message: "Error fetching QR", error });
  }
});

export default router;
