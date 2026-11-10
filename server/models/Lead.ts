import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  refNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  websiteUrl?: string;
  servicesRequired: string[];
  industry?: string;
  approxBudget: string;
  expectedTimeline: string;
  projectDescription: string;
  stage:
    | "New"
    | "Contacted"
    | "Qualified"
    | "Discovery"
    | "Proposal Sent"
    | "Negotiation"
    | "Won"
    | "Lost";
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    refNumber: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    companyName: { type: String, required: true, trim: true },
    websiteUrl: { type: String, trim: true },
    servicesRequired: [{ type: String, trim: true }],
    industry: { type: String, trim: true },
    approxBudget: { type: String, required: true },
    expectedTimeline: { type: String, required: true },
    projectDescription: { type: String, required: true },
    stage: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Discovery",
        "Proposal Sent",
        "Negotiation",
        "Won",
        "Lost",
      ],
      default: "New",
      index: true,
    },
    sourceUrl: { type: String },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Lead = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

