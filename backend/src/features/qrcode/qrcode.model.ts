import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("QRCode", qrCodeSchema);
