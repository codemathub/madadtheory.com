import mongoose, { Schema, Document } from "mongoose";

export interface IUserDoc extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  organizationId?: mongoose.Types.ObjectId;
  avatarUrl?: string;
  status: "active" | "suspended";
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: [
        "Super Admin",
        "Admin",
        "Manager",
        "Sales",
        "Marketing",
        "Editor",
        "Developer",
        "Designer",
        "Client Owner",
        "Client Member",
        "Client Viewer",
      ],
      default: "Client Member",
      index: true,
    },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", index: true },
    avatarUrl: { type: String },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUserDoc>("User", UserSchema);

