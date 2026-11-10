import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { SiteContent } from "../models/SiteContent";

const router = Router();

// Fallback in-memory defaults
let activeContent = {
  heroHeadline: "You set the target. We hit it.",
  heroSubheadline:
    "Data-engineered paid advertising, custom web technology, and automated business workflows designed to scale brands profitably.",
  heroBadge: "Performance Marketing Agency",
  metricRoas: "3x–5x",
  metricDataDriven: "100%",
  metricBrandsScaled: "60+",
  contactEmail: "info@nerditia.com",
  contactPhone: "+91 99536 09096",
  officeAddress:
    "C-7/307, Ground Floor, Lawrence Road, Keshav Puram, New Delhi, Delhi 110035, India",
  footerNotice:
    "Mad Ad Theory — Performance marketing agency delivering measurable growth across paid media and custom web platforms.",
  copyrightText: "© 2026 Mad Ad Theory. All rights reserved.",
  announcementText:
    "Now onboarding select performance ad accounts for the upcoming growth cycle.",
  updatedAt: new Date().toISOString(),
};

// GET content
router.get("/", async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let doc = await SiteContent.findOne();
      if (!doc) {
        doc = await SiteContent.create(activeContent);
      } else if (doc.officeAddress.includes("Noida") || doc.contactEmail.includes("growth@")) {
        doc.officeAddress = activeContent.officeAddress;
        doc.contactPhone = activeContent.contactPhone;
        doc.contactEmail = activeContent.contactEmail;
        await doc.save();
      }
      return res.json({ success: true, content: doc });
    }
    return res.json({ success: true, content: activeContent });
  } catch (error: any) {
    return res.json({ success: true, content: activeContent });
  }
});

// PUT update content (from Admin CMS)
router.put("/", async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    activeContent = {
      ...activeContent,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (mongoose.connection.readyState === 1) {
      let doc = await SiteContent.findOne();
      if (!doc) {
        doc = new SiteContent(activeContent);
      } else {
        Object.assign(doc, updates);
      }
      await doc.save();
      return res.json({
        success: true,
        message: "Site content and footer updated in MongoDB.",
        content: doc,
      });
    }

    return res.json({
      success: true,
      message: "Site content updated in memory storage.",
      content: activeContent,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
