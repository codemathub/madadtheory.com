import mongoose, { Schema, Document } from "mongoose";

export interface ISiteContent extends Document {
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  metricRoas: string;
  metricDataDriven: string;
  metricBrandsScaled: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  footerNotice: string;
  copyrightText: string;
  announcementText: string;
  logoUrl?: string;
  bannerEnabled?: boolean;
  bannerLink?: string;
  bannerText?: string;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    heroHeadline: {
      type: String,
      default: "You set the target. We hit it.",
    },
    heroSubheadline: {
      type: String,
      default:
        "Data-engineered paid advertising, custom web technology, and automated business workflows designed to scale brands profitably.",
    },
    heroBadge: {
      type: String,
      default: "Performance Marketing Agency",
    },
    metricRoas: {
      type: String,
      default: "3x–5x",
    },
    metricDataDriven: {
      type: String,
      default: "100%",
    },
    metricBrandsScaled: {
      type: String,
      default: "60+",
    },
    contactEmail: {
      type: String,
      default: "info@nerditia.com",
    },
    contactPhone: {
      type: String,
      default: "+91 99536 09096",
    },
    officeAddress: {
      type: String,
      default:
        "C-7/307, Ground Floor, Lawrence Road, Keshav Puram, New Delhi, Delhi 110035, India",
    },
    footerNotice: {
      type: String,
      default:
        "India's Most Trusted Performance Agency. All attribution models validated with first-party tracking.",
    },
    copyrightText: {
      type: String,
      default: "© 2026 Mad Ad Theory. All rights reserved.",
    },
    announcementText: {
      type: String,
      default:
        "Now onboarding select performance ad accounts for the upcoming growth cycle.",
    },
    logoUrl: {
      type: String,
      default: "/images/logo-raw.jpeg",
    },
    bannerEnabled: {
      type: Boolean,
      default: true,
    },
    bannerLink: {
      type: String,
      default: "/contact",
    },
    bannerText: {
      type: String,
      default:
        "Now onboarding select performance ad accounts for the upcoming growth cycle.",
    },
  },
  {
    timestamps: true,
  }
);

export const SiteContent =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);
