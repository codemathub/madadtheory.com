import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const UPLOADS_DIR = path.resolve(process.cwd(), "public", "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e6)}`;
    cb(null, `${cleanName}_${uniqueSuffix}${ext}`);
  },
});

// Multer filter: images, videos, pdfs
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowed = /jpeg|jpg|png|webp|svg|gif|mp4|webm|pdf/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  const mime = file.mimetype.toLowerCase();

  if (allowed.test(ext) || allowed.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("File type not permitted. Allowed: images, webm/mp4 videos, PDFs."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
});

// 1. POST /api/upload - Single multipart file upload
router.post("/", upload.single("file"), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file provided in form data ('file')." });
    }

    const publicUrl = `/uploads/${req.file.filename}`;
    return res.status(201).json({
      success: true,
      message: "File uploaded successfully.",
      url: publicUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Failed to upload file." });
  }
});

// 2. POST /api/upload/base64 - Convert Base64 data URL to static file on disk
router.post("/base64", (req: Request, res: Response) => {
  try {
    const { base64, filename } = req.body;
    if (!base64 || typeof base64 !== "string") {
      return res.status(400).json({ success: false, error: "Base64 string is required." });
    }

    // Match data URI scheme: data:image/png;base64,...
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, error: "Invalid base64 data URI format." });
    }

    const mime = matches[1];
    const data = Buffer.from(matches[2], "base64");
    const ext = mime.split("/")[1] || "png";
    const name = (filename || "upload").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 25);
    const newFileName = `${name}_${Date.now()}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, newFileName);

    fs.writeFileSync(filePath, data);

    const publicUrl = `/uploads/${newFileName}`;
    return res.status(201).json({
      success: true,
      url: publicUrl,
      filename: newFileName,
      size: data.length,
      mimetype: mime,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Failed to process base64 upload." });
  }
});

export default router;

