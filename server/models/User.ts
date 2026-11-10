import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  fullName: string;
  role:
    | "Super Admin"
    | "Admin"
    | "Manager"
    | "Sales"
    | "Marketing / Editor"
    | "Designer / Developer"
    | "Client Owner"
    | "Client Member"
    | "Client Viewer";
  organizationId?: mongoose.Types.ObjectId;
  organizationName?: string;
  status: "Active" | "Suspended" | "Pending";
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: [
        "Super Admin",
        "Admin",
        "Manager",
        "Sales",
        "Marketing / Editor",
        "Designer / Developer",
        "Client Owner",
        "Client Member",
        "Client Viewer",
      ],
      default: "Admin",
    },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization" },
    organizationName: { type: String },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Pending"],
      default: "Active",
    },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

