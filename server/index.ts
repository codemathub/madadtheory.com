import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./db";
import leadsRouter from "./routes/leads";
import authRouter from "./routes/auth";
import projectsRouter from "./routes/projects";
import contentRouter from "./routes/content";
import uploadRouter from "./routes/upload";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve static uploads
const uploadsPath = path.resolve(process.cwd(), "public", "uploads");
app.use("/uploads", express.static(uploadsPath));

// API Routes
app.use("/api/leads", leadsRouter);
app.use("/api/v1/public/leads", leadsRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/content", contentRouter);
app.use("/api/upload", uploadRouter);

import fs from "fs";

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    platform: "Mad Ad Theory Connected Backend",
    timestamp: new Date().toISOString(),
  });
});

// Production Static Serving & SPA Route Fallback
const distPath = path.resolve(process.cwd(), "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Boot Server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Server] Mad Ad Theory Backend running on http://localhost:${PORT}`);
  });
}

startServer();
