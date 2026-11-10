import mongoose, { Schema, Document } from "mongoose";

export interface IOrganizationDoc extends Document {
  name: string;
  domain?: string;
  industry?: string;
  billingEmail?: string;
  primaryContactId?: mongoose.Types.ObjectId;
  portalActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrganizationSchema = new Schema<IOrganizationDoc>(
  {
    name: { type: String, required: true, trim: true },
    domain: { type: String, trim: true },
    industry: { type: String, trim: true },
    billingEmail: { type: String, lowercase: true, trim: true },
    primaryContactId: { type: Schema.Types.ObjectId, ref: "User" },
    portalActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Organization =
  mongoose.models.Organization || mongoose.model<IOrganizationDoc>("Organization", OrganizationSchema);

