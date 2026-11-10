import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLogDoc extends Document {
  actorId: mongoose.Types.ObjectId;
  actorName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  diffBefore?: Record<string, any>;
  diffAfter?: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLogDoc>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actorName: { type: String, required: true },
    action: { type: String, required: true, index: true },
    resourceType: { type: String, required: true, index: true },
    resourceId: { type: String, required: true, index: true },
    diffBefore: { type: Schema.Types.Mixed },
    diffAfter: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog = mongoose.models.AuditLog || mongoose.model<IAuditLogDoc>("AuditLog", AuditLogSchema);

