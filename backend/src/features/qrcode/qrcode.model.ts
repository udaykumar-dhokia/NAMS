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
    image_url: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("QRCode", qrCodeSchema);
