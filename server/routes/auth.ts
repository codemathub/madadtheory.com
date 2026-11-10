import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Otp } from "../models/Otp";
import { sendOtpEmail } from "../services/email";

dotenv.config({ path: ".env.local" });
dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "madadtheory-super-secure-jwt-key-2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const AUTHORIZED_ADMIN_EMAIL = (process.env.AUTHORIZED_ADMIN_EMAIL || "code.mathub@gmail.com").toLowerCase().trim();

// In-memory fallback if MongoDB is momentarily offline
interface MemoryOtp {
  email: string;
  otp: string;
  attempts: number;
  createdAt: number;
}
const memoryOtps: Map<string, MemoryOtp> = new Map();

// Helper to generate 6-digit numeric OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 1. POST /api/auth/send-otp
router.post("/send-otp", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "A valid email address is required." });
    }

    const cleanEmail = email.trim().toLowerCase();

    // STRICT SECURITY: Restrict login strictly to fixed Super Admin email
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        error: "Access Denied: Only the authorized Super Admin email is permitted to receive security codes.",
      });
    }

    // Check rate limit: cooldown of 30 seconds
    const now = Date.now();
    const existingMemory = memoryOtps.get(cleanEmail);
    if (existingMemory && now - existingMemory.createdAt < 30000) {
      const waitSeconds = Math.ceil((30000 - (now - existingMemory.createdAt)) / 1000);
      return res.status(429).json({
        success: false,
        error: `Please wait ${waitSeconds} seconds before requesting a new security code.`,
      });
    }

    const otp = generateOtp();

    // Save to MongoDB if available
    if (mongoose.connection.readyState === 1) {
      await Otp.deleteMany({ email: cleanEmail }); // Clear previous OTPs for this email
      await Otp.create({ email: cleanEmail, otp, attempts: 0 });
    }

    // Always keep memory sync
    memoryOtps.set(cleanEmail, {
      email: cleanEmail,
      otp,
      attempts: 0,
      createdAt: now,
    });

    // Send email via Resend
    const emailResult = await sendOtpEmail(cleanEmail, otp);

    if (!emailResult.success) {
      return res.status(502).json({
        success: false,
        error: "Unable to dispatch security code email at this moment. Please try again shortly.",
      });
    }

    return res.json({
      success: true,
      message: `A single-use security code has been dispatched to ${cleanEmail}. Check your inbox.`,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Failed to process OTP request." });
  }
});

// 2. POST /api/auth/verify-otp
router.post("/verify-otp", async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: "Both email and 6-digit OTP code are required." });
    }

    const cleanEmail = email.trim().toLowerCase();

    // STRICT SECURITY: Restrict login strictly to fixed Super Admin email
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        error: "Access Denied: Only the authorized Super Admin email is permitted to receive security codes.",
      });
    }
    const cleanOtp = otp.toString().trim();

    let isValid = false;

    // Check MongoDB first
    if (mongoose.connection.readyState === 1) {
      const dbOtp = await Otp.findOne({ email: cleanEmail, verified: false }).sort({ createdAt: -1 });
      if (dbOtp) {
        if (dbOtp.attempts >= 5) {
          await Otp.deleteMany({ email: cleanEmail });
          return res.status(400).json({
            success: false,
            error: "Too many failed attempts. Please request a new security code.",
          });
        }

        if (dbOtp.otp === cleanOtp) {
          isValid = true;
          dbOtp.verified = true;
          await dbOtp.save();
          await Otp.deleteMany({ email: cleanEmail });
        } else {
          dbOtp.attempts += 1;
          await dbOtp.save();
          return res.status(400).json({
            success: false,
            error: `Invalid security code. ${5 - dbOtp.attempts} attempts remaining.`,
          });
        }
      }
    }

    // Fallback to memory store if not yet validated
    if (!isValid) {
      const mem = memoryOtps.get(cleanEmail);
      if (mem) {
        if (Date.now() - mem.createdAt > 600000) {
          memoryOtps.delete(cleanEmail);
          return res.status(400).json({
            success: false,
            error: "Security code expired. Please request a new code.",
          });
        }

        if (mem.attempts >= 5) {
          memoryOtps.delete(cleanEmail);
          return res.status(400).json({
            success: false,
            error: "Too many failed attempts. Please request a new security code.",
          });
        }

        if (mem.otp === cleanOtp) {
          isValid = true;
          memoryOtps.delete(cleanEmail);
        } else {
          mem.attempts += 1;
          return res.status(400).json({
            success: false,
            error: `Invalid security code. ${5 - mem.attempts} attempts remaining.`,
          });
        }
      }
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired security code. Please request a new code.",
      });
    }

    // Generate signed JWT Token
    const userPayload = {
      id: `admin-${Date.now()}`,
      email: cleanEmail,
      name: cleanEmail.split("@")[0].toUpperCase() + " Admin",
      role: "Super Admin",
      permissions: ["read", "write", "publish", "delete"],
    };

    const token = jwt.sign(userPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any,
    });

    return res.json({
      success: true,
      message: "Authentication successful.",
      token,
      user: userPayload,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Failed to verify OTP." });
  }
});

// 3. GET /api/auth/me - Token verification
router.get("/me", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized: Missing or malformed token." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ success: true, user: decoded });
  } catch (err: any) {
    return res.status(401).json({ success: false, error: "Session expired or invalid token. Please log in again." });
  }
});

// Admin Auth Middleware
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized: Administrative access token required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Unauthorized: Invalid or expired token." });
  }
}

export default router;
