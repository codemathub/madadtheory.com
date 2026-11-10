import mongoose, { Schema, Document } from "mongoose";

export interface IServiceDoc extends Document {
  slug: string;
  title: string;
  category: "Marketing" | "Technology" | "Automation" | "Creative";
  shortSummary: string;
  fullOverview: string;
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  iconName: string;
  radialIndex?: number;
  isPublished: boolean;
  sortOrder: number;
}

const ServiceSchema = new Schema<IServiceDoc>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Marketing", "Technology", "Automation", "Creative"],
      required: true,
      index: true,
    },
    shortSummary: { type: String, required: true },
    fullOverview: { type: String, required: true },
    deliverables: [{ type: String }],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    iconName: { type: String, default: "TrendingUp" },
    radialIndex: { type: Number, min: 0, max: 7 },
    isPublished: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model<IServiceDoc>("Service", ServiceSchema);

