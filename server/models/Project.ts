import mongoose, { Schema, Document } from "mongoose";

export interface IDeliverable {
  id: string;
  title: string;
  category: string;
  status: "Pending Approval" | "Approved" | "In Production";
  submittedDate: string;
  fileSize?: string;
  signedOffBy?: string;
  signedOffAt?: Date;
}

export interface IProject extends Document {
  title: string;
  organizationName: string;
  status: "Discovery" | "Active" | "Review" | "Completed" | "Paused";
  targetRoas: number;
  currentRoas: number;
  monthlyAdSpend: number;
  revenueGenerated: number;
  deliverables: IDeliverable[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    organizationName: { type: String, required: true },
    status: {
      type: String,
      enum: ["Discovery", "Active", "Review", "Completed", "Paused"],
      default: "Active",
    },
    targetRoas: { type: Number, default: 3.5 },
    currentRoas: { type: Number, default: 4.8 },
    monthlyAdSpend: { type: Number, default: 75000 },
    revenueGenerated: { type: Number, default: 342000 },
    deliverables: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        status: {
          type: String,
          enum: ["Pending Approval", "Approved", "In Production"],
          default: "Pending Approval",
        },
        submittedDate: { type: String },
        fileSize: { type: String },
        signedOffBy: { type: String },
        signedOffAt: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

