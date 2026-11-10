import { z } from "zod";

export const LeadSubmissionSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").toLowerCase(),
  phone: z.string().min(7, "Phone number is too short").max(20).optional().or(z.literal("")),
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(120),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  services: z.array(z.string()).min(1, "Please select at least one service required"),
  industry: z.string().optional().or(z.literal("")),
  budgetRange: z.string().min(1, "Please select an approximate budget range"),
  timeline: z.string().min(1, "Please select your target timeline"),
  projectDescription: z.string().min(20, "Please provide at least 20 characters describing your project goals"),
  attachmentUrls: z.array(z.string()).optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to submit your enquiry",
  }),
  sourceUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadSubmissionInput = z.infer<typeof LeadSubmissionSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ApprovalDecisionSchema = z.object({
  deliverableId: z.string().min(1, "Deliverable ID required"),
  versionNumber: z.number().int().positive(),
  decision: z.enum(["Approved", "Changes Requested"]),
  feedbackComment: z.string().optional(),
});

export type ApprovalDecisionInput = z.infer<typeof ApprovalDecisionSchema>;

export const LeadStatusUpdateSchema = z.object({
  stage: z.enum([
    "New",
    "Assigned",
    "Contacted",
    "Qualified",
    "Discovery",
    "Proposal Sent",
    "Negotiation",
    "Won",
    "Lost",
    "Nurture",
  ]),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

