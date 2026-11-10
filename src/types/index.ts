// Mad Ad Theory — Shared Domain TypeScript Interfaces

export type UserRole =
  | 'Super Admin'
  | 'Admin'
  | 'Manager'
  | 'Sales'
  | 'Marketing'
  | 'Editor'
  | 'Developer'
  | 'Designer'
  | 'Client Owner'
  | 'Client Member'
  | 'Client Viewer';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  avatarUrl?: string;
  status: 'active' | 'suspended';
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type LeadStage =
  | 'New'
  | 'Assigned'
  | 'Contacted'
  | 'Qualified'
  | 'Discovery'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost'
  | 'Nurture';

export interface ILead {
  _id: string;
  refNumber: string; // e.g. MAT-LD-2026-0042
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  websiteUrl?: string;
  serviceIds: string[];
  industry?: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  attachmentUrls?: string[];
  stage: LeadStage;
  assignedTo?: string; // User ID
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  notes?: string;
  convertedOrgId?: string;
  convertedProjectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrganization {
  _id: string;
  name: string;
  domain?: string;
  industry?: string;
  billingEmail?: string;
  primaryContactId?: string;
  portalActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectStatus = 'Discovery' | 'In Progress' | 'Client Review' | 'Completed' | 'On Hold';
export type ProjectHealth = 'Green' | 'Amber' | 'Red';

export interface IProject {
  _id: string;
  code: string; // e.g. MAT-PRJ-001
  name: string;
  slug: string;
  organizationId: string;
  leadId?: string;
  ownerId: string; // Internal Project Lead
  teamIds: string[];
  status: ProjectStatus;
  health: ProjectHealth;
  scopeSummary: string;
  targetCompletionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMilestone {
  _id: string;
  projectId: string;
  title: string;
  description?: string;
  dueAt: Date;
  status: 'Pending' | 'In Progress' | 'Completed';
  sortOrder: number;
}

export interface ITask {
  _id: string;
  projectId: string;
  milestoneId?: string;
  title: string;
  description?: string;
  assigneeIds: string[];
  clientVisible: boolean;
  status: 'Todo' | 'Doing' | 'Client Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueAt?: Date;
}

export type ApprovalState = 'Draft' | 'Pending Client Approval' | 'Approved' | 'Changes Requested';

export interface IDeliverable {
  _id: string;
  projectId: string;
  taskId?: string;
  title: string;
  currentVersion: number;
  approvalStatus: ApprovalState;
  versions: {
    versionNumber: number;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    uploadedBy: string;
    uploadedAt: Date;
    notes?: string;
  }[];
}

export interface IApprovalEvent {
  _id: string;
  deliverableId: string;
  versionNumber: number;
  clientUserId: string;
  organizationId: string;
  decision: 'Approved' | 'Changes Requested';
  feedbackComment?: string;
  checksum: string;
  signedAt: Date;
}

export interface IService {
  _id: string;
  slug: string;
  title: string;
  category: 'Marketing' | 'Technology' | 'Automation' | 'Creative';
  shortSummary: string;
  fullOverview: string;
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  iconName: string;
  radialIndex?: number; // 0 to 7 for the 8 radial service hub nodes
  isPublished: boolean;
  sortOrder: number;
}

export interface IAuditLog {
  _id: string;
  actorId: string;
  actorName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  diffBefore?: Record<string, any>;
  diffAfter?: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
}

