import mongoose, { Schema, Document } from "mongoose";

export interface IProjectDoc extends Document {
  code: string;
  name: string;
  slug: string;
  organizationId: mongoose.Types.ObjectId;
  leadId?: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  teamIds: mongoose.Types.ObjectId[];
  status: "Discovery" | "In Progress" | "Client Review" | "Completed" | "On Hold";
  health: "Green" | "Amber" | "Red";
  scopeSummary: string;
  targetCompletionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProjectDoc>(
  {
    code: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["Discovery", "In Progress", "Client Review", "Completed", "On Hold"],
      default: "Discovery",
      index: true,
    },
    health: {
      type: String,
      enum: ["Green", "Amber", "Red"],
      default: "Green",
    },
    scopeSummary: { type: String, required: true },
    targetCompletionDate: { type: Date },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model<IProjectDoc>("Project", ProjectSchema);

