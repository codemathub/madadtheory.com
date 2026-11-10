import { Router, Request, Response } from "express";

const router = Router();

// In-memory demo projects & deliverables
let projects = [
  {
    id: "proj-velox-01",
    organizationName: "Velox Growth DTC",
    title: "Q4 Performance Creative & Media Sprint",
    targetRoas: 3.5,
    currentRoas: 4.82,
    monthlyAdSpend: 85000,
    revenueGenerated: 342800,
    deliverables: [
      {
        id: "deliv-1",
        title: "Q4 Meta High-Velocity Video Ad Variations (Batch 3)",
        category: "Creative Assets",
        status: "Pending Approval",
        submittedDate: "Nov 04, 2026",
        fileSize: "142 MB (MP4)",
      },
      {
        id: "deliv-2",
        title: "Google Search High-Intent Intent Account Restructure",
        category: "Paid Acquisition",
        status: "Approved",
        submittedDate: "Oct 28, 2026",
        fileSize: "12 KB (Architecture Plan)",
      },
      {
        id: "deliv-3",
        title: "Conversions API (CAPI) Server-Side Tagging Infrastructure",
        category: "Tracking Architecture",
        status: "Approved",
        submittedDate: "Oct 22, 2026",
        fileSize: "Active Endpoint",
      },
    ],
  },
];

// GET projects
router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, projects });
});

// PATCH deliverable approval
router.patch("/:projId/deliverables/:delivId", (req: Request, res: Response) => {
  const { projId, delivId } = req.params;
  const { status } = req.body;

  const project = projects.find((p) => p.id === projId);
  if (!project) {
    return res.status(404).json({ success: false, error: "Project not found." });
  }

  const deliverable = project.deliverables.find((d) => d.id === delivId);
  if (!deliverable) {
    return res.status(404).json({ success: false, error: "Deliverable not found." });
  }

  deliverable.status = status || "Approved";
  return res.json({ success: true, deliverable });
});

export default router;

