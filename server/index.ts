import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { connectDB } from "./db";
import leadsRouter from "./routes/leads";
import authRouter from "./routes/auth";
import projectsRouter from "./routes/projects";
import contentRouter from "./routes/content";
import uploadRouter from "./routes/upload";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const PORT = Number(process.env.SERVER_PORT || process.env.PORT || 5000);

// Trust reverse proxy (Nginx / Cloudflare) for accurate IP rate limiting
app.set("trust proxy", 1);

// 1. Security Headers (Protection against MIME-sniffing, Clickjacking, XSS)
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible CDN scripts, fonts, Three.js assets
    crossOriginEmbedderPolicy: false,
  })
);

// 2. High-Efficiency Gzip Compression (Reduces network payload & server CPU/bandwidth by up to 80%)
app.use(compression());

// 3. CORS & Safe Payload Size Limiters (Prevents memory exhaustion attacks)
app.use(cors());
app.use(express.json({ limit: "2mb" })); // Safe limit for normal JSON (upload route handles larger files separately)
app.use(express.urlencoded({ limit: "2mb", extended: true }));

// 4. DDoS & Abuse Protection Rate Limiters
// General API Rate Limiter: Max 200 requests per 15 minutes per IP
const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests from this IP. Please try again after a few minutes.",
  },
});

// Strict OTP Rate Limiter: Max 5 attempts per 15 minutes per IP (prevents email spam abuse)
const otpAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many login attempts. Please wait 15 minutes before requesting another code.",
  },
});

// Strict Inquiry / Lead Submission Limiter: Max 10 submissions per 15 minutes per IP
const leadSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "We have received your inquiries. Please allow our team time to review before submitting again.",
  },
});

// Static Asset Serving
const publicPath = path.resolve(process.cwd(), "public");
const imagesPath = path.resolve(process.cwd(), "public", "images");
const uploadsPath = path.resolve(process.cwd(), "public", "uploads");

// Explicitly serve /images from public/images
if (fs.existsSync(imagesPath)) {
  app.use("/images", express.static(imagesPath, { maxAge: "7d" }));
}

// Explicitly serve uploads from public/uploads
if (fs.existsSync(uploadsPath)) {
  app.use("/uploads", express.static(uploadsPath, { maxAge: "7d" }));
}

// Serve root public folder (favicon.ico, favicon.svg, robots.txt, etc.)
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath, { maxAge: "1d" }));
}

// API Routes with Protection
app.use("/api/auth/send-otp", otpAuthLimiter);
app.use("/api/auth", authRouter);

app.use("/api/leads", leadSubmissionLimiter, leadsRouter);
app.use("/api/v1/public/leads", leadSubmissionLimiter, leadsRouter);

app.use("/api/projects", generalApiLimiter, projectsRouter);
app.use("/api/content", generalApiLimiter, contentRouter);
app.use("/api/upload", uploadRouter); // Has its own multer size limits

// Health check endpoint for Uptime monitors / PM2
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    platform: "Mad Ad Theory Connected Backend",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
  });
});

// Production Static Serving & SPA Route Fallback
const distPath = path.resolve(process.cwd(), "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: "1d" }));

  app.get("*", (req, res, next) => {
    // Never send index.html for API endpoints, uploads, images, assets, or file extensions
    if (
      req.path.startsWith("/api") ||
      req.path.startsWith("/uploads") ||
      req.path.startsWith("/images") ||
      req.path.startsWith("/assets") ||
      /\.(jpe?g|png|gif|svg|ico|webp|css|js|map|json|woff2?|ttf|eot)$/i.test(req.path)
    ) {
      return res.status(404).send("Asset not found");
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Global process error handlers to prevent sudden crashes or memory leaks
process.on("unhandledRejection", (reason) => {
  console.error("[Server] Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[Server] Uncaught Exception caught:", error);
});

// Boot Server
async function startServer() {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Mad Ad Theory Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
