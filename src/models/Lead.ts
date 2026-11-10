import mongoose, { Schema, Document } from "mongoose";

export interface ILeadDoc extends Document {
  refNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  websiteUrl?: string;
  serviceIds: string[];
  industry?: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  attachmentUrls?: string[];
  stage:
    | "New"
    | "Assigned"
    | "Contacted"
    | "Qualified"
    | "Discovery"
    | "Proposal Sent"
    | "Negotiation"
    | "Won"
    | "Lost"
    | "Nurture";
  assignedTo?: mongoose.Types.ObjectId;
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  notes?: string;
  convertedOrgId?: mongoose.Types.ObjectId;
  convertedProjectId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILeadDoc>(
  {
    refNumber: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    companyName: { type: String, required: true, trim: true },
    websiteUrl: { type: String, trim: true },
    serviceIds: [{ type: String, trim: true }],
    industry: { type: String, trim: true },
    budgetRange: { type: String, required: true },
    timeline: { type: String, required: true },
    projectDescription: { type: String, required: true },
    attachmentUrls: [{ type: String }],
    stage: {
      type: String,
      enum: [
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
      ],
      default: "New",
      index: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", index: true },
    sourceUrl: { type: String },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    notes: { type: String },
    convertedOrgId: { type: Schema.Types.ObjectId, ref: "Organization" },
    convertedProjectId: { type: Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

// Compound indexes for CRM queries
LeadSchema.index({ stage: 1, createdAt: -1 });
LeadSchema.index({ assignedTo: 1, stage: 1 });

export const Lead = mongoose.models.Lead || mongoose.model<ILeadDoc>("Lead", LeadSchema);

