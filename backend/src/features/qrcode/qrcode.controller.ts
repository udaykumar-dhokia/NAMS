import { Request, Response } from "express";
import QRCodeModel from "./qrcode.model";
import AttendanceModel from "../attendance/attendance.model";
import crypto from "crypto";
import QRCode from "qrcode";
import { io } from "../..";

// POST /api/qr/create
/// 0. create QR Code for a lecture/session
export const createQRCode = async (req: Request, res: Response) => {
  try {
    const { lectureId } = req.body;
    console.log(lectureId);

    // Check if lecture/session exists
    const lecture = await AttendanceModel.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Generate random token
    const token = crypto.randomBytes(16).toString("hex");

    // Save QR record in DB
    const newQr = await QRCodeModel.create({
      token,
      lecture: lecture._id,
    });

    // Generate QR image (Data URL)
    const qrImage = await QRCode.toDataURL(token);

    await QRCodeModel.findByIdAndUpdate(
      newQr._id,
      { image_url: qrImage },
      { new: true }
    );

    return res.status(201).json({
      message: "QR Code created successfully",
      qrId: newQr._id,
      token: newQr.token,
      qrImage,
    });
  } catch (error) {
    console.error("Error creating QR code:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 *  1. Scan QR Code (student marks attendance)
 */
export const scanQRCode = async (req: Request, res: Response) => {
  try {
    const { token, studentId, lectureId, id } = req.body;

    // Verify QR belongs to this lecture
    const qr = await QRCodeModel.findOne({ token, lecture: lectureId });
    if (!qr) {
      return res.status(400).json({ error: "Invalid or expired QR Code" });
    }

    // Mark attendance (avoid duplicates using $addToSet)
    await AttendanceModel.updateOne(
      { _id: lectureId },
      { $addToSet: { studentsPresent: studentId } }
    );

    // Generate new QR (new token)
    const newToken = crypto.randomBytes(16).toString("hex");

    // Overwrite the same QR entry (or create a new one if you prefer history)
    qr.token = newToken;
    await qr.save();

    // Convert new token → QR image
    const newQrImage = await QRCode.toDataURL(newToken);

    await QRCodeModel.findByIdAndUpdate(
      id,
      { image_url: newQrImage },
      { new: true }
    );

    // Emit new QR to faculty’s frontend using socket.io
    io.to(`faculty_${lectureId}`).emit("new-qr", {
      qrId: qr._id,
      token: qr.token,
      qrImage: newQrImage,
    });

    // Send success response to student
    return res.status(200).json({
      message: "Attendance marked successfully",
      qr: qr,
    });
  } catch (err) {
    console.error("Error scanning QR:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message || "An error occurred",
    });
  }
};

/**
 * 2. Invalidate QR Code (make unusable)
 */
export const invalidateQRCode = async (req: Request, res: Response) => {
  try {
    const { qrId } = req.params;

    const qr = await QRCodeModel.findByIdAndDelete(qrId);
    if (!qr) {
      return res.status(404).json({ error: "QR Code not found" });
    }

    return res
      .status(200)
      .json({ message: "QR Code invalidated successfully" });
  } catch (err) {
    console.error("Error invalidating QR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 *  3. Get Active QR Code for a lecture
 */
export const getActiveQRCode = async (req: Request, res: Response) => {
  try {
    const { lectureId } = req.params;

    const qr = await QRCodeModel.findOne({ lecture: lectureId }).sort({
      updatedAt: -1,
    });
    if (!qr) {
      return res
        .status(404)
        .json({ error: "No active QR code found for this lecture" });
    }

    const qrImage = await QRCode.toDataURL(qr.token);

    return res.status(200).json({
      qrId: qr._id,
      token: qr.token,
      qrImage,
    });
  } catch (err) {
    console.error("Error fetching active QR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 *  4. Get QR History for a lecture (all QR codes ever generated)
 */
export const getQRHistory = async (req: Request, res: Response) => {
  try {
    const { lectureId } = req.params;

    const history = await QRCodeModel.find({ lecture: lectureId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      lectureId,
      count: history.length,
      qrCodes: history,
    });
  } catch (err) {
    console.error("Error fetching QR history:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
