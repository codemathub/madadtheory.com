import { Router, Request, Response } from "express";
import { Lead } from "../models/Lead";
import mongoose from "mongoose";

const router = Router();

// Fallback in-memory store in case MongoDB is running offline
let inMemoryLeads = [
  {
    id: "lead-seed-1",
    refNumber: "MAT-20261105-8841",
    fullName: "Aarav Sharma",
    email: "aarav@zestapparel.com",
    phone: "+91 98112 34567",
    companyName: "Zest Apparel DTC",
    websiteUrl: "https://zestapparel.com",
    servicesRequired: ["Performance Marketing", "Social Media Marketing", "Creative Strategy"],
    industry: "E-commerce & Retail",
    approxBudget: "$25,000 - $50,000/mo",
    expectedTimeline: "Immediate (1-2 weeks)",
    projectDescription: "Looking to scale Meta and Google Ad spend from $15k to $60k/month while holding a minimum 3.8x ROAS.",
    stage: "Qualified",
    createdAt: new Date("2026-11-04T10:30:00Z"),
  },
  {
    id: "lead-seed-2",
    refNumber: "MAT-20261104-1290",
    fullName: "Priya Nair",
    email: "priya@zenithsaas.io",
    phone: "+91 99201 88721",
    companyName: "Zenith B2B Cloud",
    websiteUrl: "https://zenithsaas.io",
    servicesRequired: ["Performance Marketing", "Website Development", "Workflow Automation"],
    industry: "SaaS & Technology",
    approxBudget: "$10,000 - $25,000/mo",
    expectedTimeline: "1 month",
    projectDescription: "B2B pipeline generation via LinkedIn and Google Search. Need CRM sync to HubSpot and high-converting landing pages.",
    stage: "New",
    createdAt: new Date("2026-11-05T08:15:00Z"),
  },
];

// Helper to generate reference number
function generateRef(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `MAT-${dateStr}-${randomSuffix}`;
}

// GET all leads
router.get("/", async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbLeads = await Lead.find().sort({ createdAt: -1 });
      if (dbLeads.length > 0) {
        return res.json({ success: true, count: dbLeads.length, leads: dbLeads });
      }
    }
    // Return in-memory list if DB empty or offline
    return res.json({ success: true, count: inMemoryLeads.length, leads: inMemoryLeads });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST subscribe to newsletter
router.post("/subscribe", async (req: Request, res: Response) => {
  try {
    const { email, sourceUrl } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Valid email address is required." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const refNumber = generateRef();
    const newSubscriberData = {
      refNumber,
      fullName: cleanEmail.split("@")[0],
      email: cleanEmail,
      phone: "",
      companyName: "Newsletter Subscriber",
      websiteUrl: "",
      servicesRequired: ["Newsletter Insights"],
      industry: "General",
      approxBudget: "Subscriber",
      expectedTimeline: "Immediate",
      projectDescription: "Subscribed to marketing insights and growth tips in footer.",
      stage: "New",
      sourceUrl: sourceUrl || "",
      utmSource: "footer_newsletter",
      utmCampaign: "newsletter_growth_tips",
      createdAt: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      const leadDoc = new Lead(newSubscriberData);
      await leadDoc.save();
      inMemoryLeads.unshift({ id: leadDoc._id.toString(), ...newSubscriberData });
      return res.status(201).json({
        success: true,
        message: "Subscribed successfully! Weekly growth insights will be sent to your inbox.",
        lead: leadDoc,
      });
    } else {
      const memoryLead = { id: `lead-${Date.now()}`, ...newSubscriberData };
      inMemoryLeads.unshift(memoryLead);
      return res.status(201).json({
        success: true,
        message: "Subscribed successfully! Weekly growth insights will be sent to your inbox.",
        lead: memoryLead,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST new lead enquiry
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      companyName,
      websiteUrl,
      servicesRequired,
      services,
      industry,
      approxBudget,
      budgetRange,
      expectedTimeline,
      timeline,
      projectDescription,
      sourceUrl,
      utmSource,
      utmCampaign,
      id,
    } = req.body;

    const finalBudget = approxBudget || budgetRange || "Flexible";
    const finalTimeline = expectedTimeline || timeline || "Immediate";
    const finalServices = Array.isArray(servicesRequired)
      ? servicesRequired
      : Array.isArray(services)
      ? services
      : [];

    if (!fullName || !email || !companyName || !projectDescription) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields (fullName, email, companyName, projectDescription).",
      });
    }

    const refNumber = req.body.refNumber || generateRef();

    const newLeadData = {
      refNumber,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || "",
      companyName: companyName.trim(),
      websiteUrl: websiteUrl || "",
      servicesRequired: finalServices,
      services: finalServices,
      industry: industry || "General",
      approxBudget: finalBudget,
      budgetRange: finalBudget,
      expectedTimeline: finalTimeline,
      timeline: finalTimeline,
      projectDescription: projectDescription.trim(),
      stage: "New",
      sourceUrl: sourceUrl || "",
      utmSource: utmSource || "",
      utmCampaign: utmCampaign || "",
      createdAt: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      const leadDoc = new Lead(newLeadData);
      await leadDoc.save();
      // Keep in-memory synced as well
      const savedLead = {
        id: id || leadDoc._id.toString(),
        _id: leadDoc._id.toString(),
        ...newLeadData,
      };
      inMemoryLeads.unshift(savedLead);
      return res.status(201).json({
        success: true,
        message: "Enquiry submitted and saved to MongoDB.",
        lead: savedLead,
      });
    } else {
      const memoryLead = { id: id || `lead-${Date.now()}`, ...newLeadData };
      inMemoryLeads.unshift(memoryLead);
      return res.status(201).json({
        success: true,
        message: "Enquiry saved to performance storage.",
        lead: memoryLead,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH lead stage
router.patch("/:id/stage", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;

    if (!stage) {
      return res.status(400).json({ success: false, error: "Stage is required." });
    }

    if (mongoose.connection.readyState === 1) {
      const updated = await Lead.findByIdAndUpdate(id, { stage }, { new: true });
      if (updated) {
        return res.json({ success: true, lead: updated });
      }
    }

    // In-memory fallback update
    const lead = inMemoryLeads.find((l) => l.id === id || l.refNumber === id || (l as any)._id === id);
    if (lead) {
      lead.stage = stage;
      return res.json({ success: true, lead });
    }

    return res.status(404).json({ success: false, error: "Lead not found." });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

