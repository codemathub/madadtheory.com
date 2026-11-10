import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  attempts: number;
  verified: boolean;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    otp: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, expires: 600 }, // 10 minutes TTL
  },
  {
    timestamps: false,
  }
);

export const Otp = mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);

