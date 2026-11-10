import mongoose, { Schema, Document } from "mongoose";

export interface IApprovalDoc extends Document {
  deliverableId: string;
  versionNumber: number;
  clientUserId: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  decision: "Approved" | "Changes Requested";
  feedbackComment?: string;
  checksum: string;
  signedAt: Date;
}

const ApprovalSchema = new Schema<IApprovalDoc>(
  {
    deliverableId: { type: String, required: true, index: true },
    versionNumber: { type: Number, required: true },
    clientUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    decision: { type: String, enum: ["Approved", "Changes Requested"], required: true },
    feedbackComment: { type: String },
    checksum: { type: String, required: true },
    signedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Lock each approval to the exact deliverable version so it is immutable
ApprovalSchema.index({ deliverableId: 1, versionNumber: 1 });

export const Approval = mongoose.models.Approval || mongoose.model<IApprovalDoc>("Approval", ApprovalSchema);

