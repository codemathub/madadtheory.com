import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  FileEdit,
  FolderKanban,
  CheckCircle,
  ExternalLink,
  LogOut,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Save,
  Sparkles,
  TrendingUp,
  DollarSign,
  Clock,
  Layers,
  Globe,
  ShieldCheck,
  RefreshCw,
  UserCheck,
  Image as ImageIcon,
  Star,
  Trash2,
  Plus,
  Video,
  Film,
  UploadCloud,
  Briefcase,
  BookOpen,
  Award,
  Upload,
  Megaphone,
  Edit3,
  X,
  Check,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { leadsStore, LeadItem } from "@/lib/leadsStore";
import { useSiteContent, updateSiteContent, SiteContentData } from "@/lib/siteContentStore";
import { GoogleReview, initialGoogleReviews } from "@/components/public/GoogleReviewsSlider";
import {
  getEcosystemProjects,
  saveEcosystemProjects,
  resetEcosystemProjects,
  EcosystemProject,
  initialCategories,
} from "@/lib/ecosystemStore";
import {
  getVideoTestimonials,
  saveVideoTestimonials,
  getGalleryPhotos,
  saveGalleryPhotos,
  VideoTestimonial,
  GalleryPhoto,
} from "@/lib/testimonialsAndGalleryStore";
import { getCareers, saveCareers, CareerRole } from "@/lib/careersStore";
import { getBlogPosts, saveBlogPosts, BlogPost } from "@/lib/blogStore";
import { getPortfolio, savePortfolio } from "@/lib/portfolioStore";
import { CaseStudy } from "@/lib/portfolioData";
import { getServicesData, saveServicesData } from "@/lib/servicesStore";
import { ServiceItem } from "@/lib/servicesData";

type AdminTab =
  | "leads"
  | "cms-hero"
  | "cms-footer"
  | "services"
  | "portfolio"
  | "careers"
  | "blog"
  | "reviews"
  | "ecosystem"
  | "media-upload"
  | "media";

export default function AdminWorkspace() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as AdminTab) || "leads";
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);

  // Leads State
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [leadFilter, setLeadFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // CMS Content State
  const liveContent = useSiteContent();
  const [formContent, setFormContent] = useState<SiteContentData>(liveContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // Sync CMS form content when liveContent loads
  useEffect(() => {
    setFormContent(liveContent);
  }, [liveContent]);

  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingLogo(true);
    showToast("Uploading brand logo...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        const updated = { ...formContent, logoUrl: data.url };
        setFormContent(updated);
        await updateSiteContent(updated);
        showToast("Brand logo updated and live across the entire website!");
      } else {
        showToast("Upload notice: " + (data.error || "Failed to upload logo"));
      }
    } catch (err: any) {
      showToast("Error uploading logo: " + err.message);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleResetLogo = async () => {
    const updated = { ...formContent, logoUrl: "/images/logo-raw.jpeg" };
    setFormContent(updated);
    await updateSiteContent(updated);
    showToast("Brand logo reset to official emblem.");
  };

  // Google Reviews State
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>(() => {
    try {
      const saved = localStorage.getItem("mat_google_reviews");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialGoogleReviews;
  });
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRole, setNewReviewRole] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleSelectReviewToEdit = (r: GoogleReview) => {
    setEditingReviewId(r.id);
    setNewReviewAuthor(r.author);
    setNewReviewRole(r.role || "");
    setNewReviewText(r.text);
    setNewReviewRating(r.rating);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelReviewEdit = () => {
    setEditingReviewId(null);
    setNewReviewAuthor("");
    setNewReviewRole("");
    setNewReviewText("");
    setNewReviewRating(5);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;

    if (editingReviewId) {
      const updated = googleReviews.map((r) =>
        r.id === editingReviewId
          ? {
              ...r,
              author: newReviewAuthor.trim(),
              role: newReviewRole.trim() || "Client",
              text: newReviewText.trim(),
              rating: newReviewRating,
            }
          : r
      );
      setGoogleReviews(updated);
      localStorage.setItem("mat_google_reviews", JSON.stringify(updated));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("google_reviews_updated"));
      }
      handleCancelReviewEdit();
      showToast("Review updated successfully!");
    } else {
      const colors = ["bg-blue-600", "bg-purple-600", "bg-emerald-600", "bg-rose-600", "bg-amber-600", "bg-cyan-600"];
      const initials = newReviewAuthor.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "U";
      const newRev: GoogleReview = {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor.trim(),
        role: newReviewRole.trim() || "Client",
        avatarBg: colors[Math.floor(Math.random() * colors.length)],
        initials,
        rating: newReviewRating,
        timeAgo: "Just now",
        text: newReviewText.trim(),
        verified: true,
      };
      const updated = [newRev, ...googleReviews];
      setGoogleReviews(updated);
      localStorage.setItem("mat_google_reviews", JSON.stringify(updated));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("google_reviews_updated"));
      }
      handleCancelReviewEdit();
      showToast("Review added to website!");
    }
  };

  const handleDeleteReview = (id: string) => {
    const updated = googleReviews.filter(r => r.id !== id);
    setGoogleReviews(updated);
    localStorage.setItem("mat_google_reviews", JSON.stringify(updated));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("google_reviews_updated"));
    }
    showToast("Review removed from website.");
  };

  // Ecosystem Projects Management State
  const [ecosystemProjects, setEcosystemProjects] = useState<EcosystemProject[]>(getEcosystemProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("pm-1");
  const [editingProject, setEditingProject] = useState<EcosystemProject>(() => {
    const list = getEcosystemProjects();
    return list[0] || ({} as EcosystemProject);
  });
  const [isUploadingScreenshot, setIsUploadingScreenshot] = useState(false);

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    const found = ecosystemProjects.find((p) => p.id === id);
    if (found) setEditingProject({ ...found });
  };

  const handleAddNewProject = () => {
    const newId = `pm-${Date.now()}`;
    const newNumber = String(ecosystemProjects.length + 1).padStart(2, "0");
    const newProj: EcosystemProject = {
      id: newId,
      categoryId: "performance-marketing",
      number: newNumber,
      title: "New Growth Showcase",
      shortTag: "Active ROAS",
      summary: "Full-funnel paid acquisition and high-converting performance campaign.",
      liveUrl: "https://nerditia.com",
      imageUrl: "",
      serviceSlug: "performance-marketing",
      status: "Active & Scaling",
      kpis: [
        { label: "Blended ROAS", value: "4.5x", note: "Meta & Google Ads" },
        { label: "Monthly Volume", value: "₹85 Lakhs", note: "Attributed Revenue" },
        { label: "Blended CAC", value: "₹380", note: "Lower Acquisition Cost" },
        { label: "Attribution", value: "100%", note: "Server-Side Tracking" },
      ],
      techStack: ["Meta CAPI", "Google Ads", "Next.js"],
    };
    const updated = [newProj, ...ecosystemProjects];
    setEcosystemProjects(updated);
    saveEcosystemProjects(updated);
    setSelectedProjectId(newId);
    setEditingProject(newProj);
    showToast("New showcase project created! Add your screenshot & links.");
  };

  const handleDeleteProject = (id: string) => {
    if (ecosystemProjects.length <= 1) {
      showToast("Cannot delete the last project.");
      return;
    }
    const updated = ecosystemProjects.filter((p) => p.id !== id);
    setEcosystemProjects(updated);
    saveEcosystemProjects(updated);
    setSelectedProjectId(updated[0].id);
    setEditingProject(updated[0]);
    showToast("Project removed from showcase.");
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingScreenshot(true);
    showToast("Uploading screenshot to server...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setEditingProject((prev) => ({ ...prev, imageUrl: data.url }));
        showToast("Screenshot uploaded! Click 'Save Project' to save.");
        return;
      }
    } catch {}
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setEditingProject((prev) => ({ ...prev, imageUrl: base64 }));
      showToast("Screenshot loaded! Click 'Save Project' to save.");
    };
    reader.readAsDataURL(file);
    setIsUploadingScreenshot(false);
  };

  // --- Careers State & Handlers ---
  const [careersList, setCareersList] = useState<CareerRole[]>(getCareers);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("Paid Acquisition");
  const [newJobLoc, setNewJobLoc] = useState("Remote / Hybrid (New Delhi)");
  const [newJobType, setNewJobType] = useState("Full-Time");
  const [newJobExp, setNewJobExp] = useState("2-4 Years");
  const [newJobDesc, setNewJobDesc] = useState("");

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim() || !newJobDesc.trim()) return;
    const item: CareerRole = {
      id: `job-${Date.now()}`,
      title: newJobTitle.trim(),
      department: newJobDept,
      location: newJobLoc,
      type: newJobType,
      experience: newJobExp,
      description: newJobDesc.trim(),
      status: "Open",
    };
    const updated = [item, ...careersList];
    setCareersList(updated);
    saveCareers(updated);
    setNewJobTitle("");
    setNewJobDesc("");
    showToast("Job opening published on Careers page!");
  };

  const handleDeleteJob = (id: string) => {
    const updated = careersList.filter((j) => j.id !== id);
    setCareersList(updated);
    saveCareers(updated);
    showToast("Job opening removed.");
  };

  // --- Portfolio / Case Studies State & Handlers ---
  const [portfolioList, setPortfolioList] = useState<CaseStudy[]>(getPortfolio);
  const [editingCsId, setEditingCsId] = useState<string | null>(null);
  const [newCsClient, setNewCsClient] = useState("");
  const [newCsIndustry, setNewCsIndustry] = useState("");
  const [newCsHeadline, setNewCsHeadline] = useState("");
  const [newCsRoas, setNewCsRoas] = useState("4.6x");
  const [newCsGrowth, setNewCsGrowth] = useState("+320%");
  const [newCsStrategy, setNewCsStrategy] = useState("");

  const handleSelectCaseStudyToEdit = (cs: CaseStudy) => {
    setEditingCsId(cs.id);
    setNewCsClient(cs.clientName);
    setNewCsIndustry(cs.industry);
    setNewCsHeadline(cs.headline);
    setNewCsStrategy(cs.strategy);
    const roasMetric = cs.results.find((r) => r.label.toLowerCase().includes("roas"));
    if (roasMetric) setNewCsRoas(roasMetric.value);
    const growthMetric = cs.results.find((r) => r.label.toLowerCase().includes("growth"));
    if (growthMetric) setNewCsGrowth(growthMetric.value);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelCaseStudyEdit = () => {
    setEditingCsId(null);
    setNewCsClient("");
    setNewCsIndustry("");
    setNewCsHeadline("");
    setNewCsStrategy("");
    setNewCsRoas("4.6x");
    setNewCsGrowth("+320%");
  };

  const handleAddCaseStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCsClient.trim() || !newCsHeadline.trim()) return;

    if (editingCsId) {
      const updated = portfolioList.map((c) =>
        c.id === editingCsId
          ? {
              ...c,
              clientName: newCsClient.trim(),
              industry: newCsIndustry.trim() || "E-commerce & Growth",
              headline: newCsHeadline.trim(),
              strategy: newCsStrategy.trim() || c.strategy,
              results: [
                { label: "Average ROAS", value: newCsRoas.trim() },
                { label: "Revenue Growth", value: newCsGrowth.trim() },
                { label: "Attribution", value: "100%" },
              ],
            }
          : c
      );
      setPortfolioList(updated);
      savePortfolio(updated);
      handleCancelCaseStudyEdit();
      showToast("Case study updated successfully!");
    } else {
      const item: CaseStudy = {
        id: `cs-${Date.now()}`,
        slug: newCsClient.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        clientName: newCsClient.trim(),
        industry: newCsIndustry.trim() || "E-commerce & Growth",
        servicesUsed: ["Performance Marketing", "Website Development"],
        headline: newCsHeadline.trim(),
        challenge: "Customer acquisition costs were rising and previous ad funnels lacked server-side tracking.",
        strategy: newCsStrategy.trim() || "Deployed high-frequency creative testing matrix and CAPI attribution.",
        results: [
          { label: "Average ROAS", value: newCsRoas.trim() },
          { label: "Revenue Growth", value: newCsGrowth.trim() },
          { label: "Attribution", value: "100%" },
        ],
      };
      const updated = [item, ...portfolioList];
      setPortfolioList(updated);
      savePortfolio(updated);
      handleCancelCaseStudyEdit();
      showToast("Case study published on Work page!");
    }
  };

  const handleDeleteCaseStudy = (id: string) => {
    const updated = portfolioList.filter((c) => c.id !== id);
    setPortfolioList(updated);
    savePortfolio(updated);
    showToast("Case study removed.");
  };

  // --- Services & Navbar State & Handlers ---
  const [servicesList, setServicesList] = useState<ServiceItem[]>(getServicesData);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [newServiceTitle, setNewServiceTitle] = useState("");
  const [newServiceCategory, setNewServiceCategory] = useState<"Marketing" | "Technology" | "Automation" | "Creative">("Marketing");
  const [newServiceSummary, setNewServiceSummary] = useState("");

  const handleSelectServiceToEdit = (s: ServiceItem) => {
    setEditingServiceId(s.id);
    setNewServiceTitle(s.title);
    setNewServiceCategory(s.category as any);
    setNewServiceSummary(s.shortSummary);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelServiceEdit = () => {
    setEditingServiceId(null);
    setNewServiceTitle("");
    setNewServiceCategory("Marketing");
    setNewServiceSummary("");
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim() || !newServiceSummary.trim()) return;

    if (editingServiceId) {
      const updated = servicesList.map((s) =>
        s.id === editingServiceId
          ? {
              ...s,
              title: newServiceTitle.trim(),
              category: newServiceCategory,
              shortSummary: newServiceSummary.trim(),
              fullOverview: newServiceSummary.trim(),
            }
          : s
      );
      setServicesList(updated);
      saveServicesData(updated);
      handleCancelServiceEdit();
      showToast("Service updated successfully!");
    } else {
      const slug = newServiceTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const item: ServiceItem = {
        id: `srv-${Date.now()}`,
        slug,
        title: newServiceTitle.trim(),
        category: newServiceCategory,
        shortSummary: newServiceSummary.trim(),
        fullOverview: newServiceSummary.trim(),
        deliverables: ["Strategy Architecture", "Execution & Launch", "Weekly Performance Sprints"],
        icon: "Target",
        faqs: [{ question: "How quickly do we start?", answer: "Onboarding completes within 5 business days." }],
      };
      const updated = [item, ...servicesList];
      setServicesList(updated);
      saveServicesData(updated);
      handleCancelServiceEdit();
      showToast("Service added to website!");
    }
  };

  const handleDeleteService = (id: string) => {
    const updated = servicesList.filter((s) => s.id !== id);
    setServicesList(updated);
    saveServicesData(updated);
    showToast("Service removed from website.");
  };

  // --- Blog / Insights State & Handlers ---
  const [blogList, setBlogList] = useState<BlogPost[]>(getBlogPosts);
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("Paid Media");
  const [newBlogReadTime, setNewBlogReadTime] = useState("6 min read");
  const [newBlogSummary, setNewBlogSummary] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogCoverImage, setNewBlogCoverImage] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("Senior Growth Strategist");
  const [isUploadingBlogCover, setIsUploadingBlogCover] = useState(false);

  const handleBlogCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBlogCover(true);
    showToast("Uploading article cover image...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setNewBlogCoverImage(data.url);
        showToast("Article cover uploaded successfully!");
      } else {
        showToast("Upload notice: " + (data.error || "Failed to upload image"));
      }
    } catch (err: any) {
      showToast("Error uploading image: " + err.message);
    } finally {
      setIsUploadingBlogCover(false);
    }
  };

  const handleSelectBlogToEdit = (post: BlogPost) => {
    setEditingBlogSlug(post.slug);
    setNewBlogTitle(post.title);
    setNewBlogCategory(post.category);
    setNewBlogReadTime(post.readTime);
    setNewBlogSummary(post.summary);
    setNewBlogContent(post.content || "");
    setNewBlogCoverImage(post.coverImage || "");
    setNewBlogAuthor(post.author || "Senior Growth Strategist");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelBlogEdit = () => {
    setEditingBlogSlug(null);
    setNewBlogTitle("");
    setNewBlogCategory("Paid Media");
    setNewBlogReadTime("6 min read");
    setNewBlogSummary("");
    setNewBlogContent("");
    setNewBlogCoverImage("");
    setNewBlogAuthor("Senior Growth Strategist");
  };

  const handleAddBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim() || !newBlogSummary.trim()) return;

    if (editingBlogSlug) {
      const updated = blogList.map((b) =>
        b.slug === editingBlogSlug
          ? {
              ...b,
              title: newBlogTitle.trim(),
              summary: newBlogSummary.trim(),
              category: newBlogCategory,
              readTime: newBlogReadTime,
              content: newBlogContent.trim(),
              coverImage: newBlogCoverImage.trim(),
              author: newBlogAuthor.trim() || "Senior Growth Strategist",
            }
          : b
      );
      setBlogList(updated);
      saveBlogPosts(updated);
      handleCancelBlogEdit();
      showToast("Blog article updated successfully!");
    } else {
      const slug = newBlogTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const item: BlogPost = {
        slug,
        title: newBlogTitle.trim(),
        summary: newBlogSummary.trim(),
        category: newBlogCategory,
        readTime: newBlogReadTime,
        date: "November 2026",
        author: newBlogAuthor.trim() || "Senior Growth Strategist",
        content: newBlogContent.trim(),
        coverImage: newBlogCoverImage.trim(),
      };
      const updated = [item, ...blogList];
      setBlogList(updated);
      saveBlogPosts(updated);
      handleCancelBlogEdit();
      showToast("Blog article published on Blog page!");
    }
  };

  const handleDeleteBlogPost = (slug: string) => {
    const updated = blogList.filter((b) => b.slug !== slug);
    setBlogList(updated);
    saveBlogPosts(updated);
    showToast("Blog article removed.");
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = ecosystemProjects.map((p) =>
      p.id === editingProject.id ? editingProject : p
    );
    setEcosystemProjects(updated);
    saveEcosystemProjects(updated);
    showToast(`"${editingProject.title}" saved successfully!`);
  };

  const handleResetEcosystem = () => {
    if (window.confirm("Reset all projects to official defaults?")) {
      const def = resetEcosystemProjects();
      setEcosystemProjects(def);
      setEditingProject(def[0]);
      showToast("Reset to official defaults.");
    }
  };

  // Media Videos & Gallery Management State
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>(getVideoTestimonials);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(getGalleryPhotos);

  // New video form state
  const [newVidName, setNewVidName] = useState("");
  const [newVidCompany, setNewVidCompany] = useState("");
  const [newVidRole, setNewVidRole] = useState("");
  const [newVidUrl, setNewVidUrl] = useState("");
  const [newVidPoster, setNewVidPoster] = useState("");
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);

  // New photo form state
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoTag, setNewPhotoTag] = useState("Delhi Hub");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingVideo(true);
    showToast("Uploading video reel to server...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setNewVidUrl(data.url);
        showToast("Video uploaded! Ready to publish.");
      } else {
        showToast("Upload notice: " + (data.error || "Failed to upload video"));
      }
    } catch (err: any) {
      showToast("Error uploading video: " + err.message);
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handlePosterFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPoster(true);
    showToast("Uploading poster thumbnail...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setNewVidPoster(data.url);
        showToast("Poster thumbnail uploaded!");
      } else {
        showToast("Poster notice: " + (data.error || "Failed to upload thumbnail"));
      }
    } catch (err: any) {
      showToast("Error uploading thumbnail: " + err.message);
    } finally {
      setIsUploadingPoster(false);
    }
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVidName.trim() || !newVidUrl.trim()) {
      showToast("Please provide the client name and upload a video.");
      return;
    }
    const item: VideoTestimonial = {
      id: `vid-${Date.now()}`,
      name: newVidName.trim(),
      company: newVidCompany.trim() || "Client Partner",
      role: newVidRole.trim() || "Founder & Operator",
      videoUrl: newVidUrl.trim(),
      posterUrl:
        newVidPoster.trim() ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    };
    const updated = [item, ...videoTestimonials];
    setVideoTestimonials(updated);
    saveVideoTestimonials(updated);
    setNewVidName("");
    setNewVidCompany("");
    setNewVidRole("");
    setNewVidUrl("");
    setNewVidPoster("");
    showToast("Video reel published to website!");
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videoTestimonials.filter((v) => v.id !== id);
    setVideoTestimonials(updated);
    saveVideoTestimonials(updated);
    showToast("Video testimonial removed from site.");
  };

  const handlePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPhoto(true);
    showToast("Uploading photo to server...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setNewPhotoUrl(data.url);
        showToast("Photo uploaded! Click 'Publish Culture Photo'.");
        return;
      }
    } catch {}
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPhotoUrl(reader.result as string);
      showToast("Photo loaded! Click 'Publish Culture Photo'.");
    };
    reader.readAsDataURL(file);
    setIsUploadingPhoto(false);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) {
      showToast("Please enter a caption and upload a photo.");
      return;
    }
    const item: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      title: newPhotoTitle.trim(),
      tag: newPhotoTag.trim() || "Team Culture",
      imageUrl: newPhotoUrl.trim(),
    };
    const updated = [item, ...galleryPhotos];
    setGalleryPhotos(updated);
    saveGalleryPhotos(updated);
    setNewPhotoTitle("");
    setNewPhotoUrl("");
    showToast("Photo published to website!");
  };

  const handleDeletePhoto = (id: string) => {
    const updated = galleryPhotos.filter((p) => p.id !== id);
    setGalleryPhotos(updated);
    saveGalleryPhotos(updated);
    showToast("Gallery photo removed.");
  };

  // Auth check & load leads
  useEffect(() => {
    const session = localStorage.getItem("mat_admin_session");
    const token = localStorage.getItem("mat_admin_token");
    
    if (!session && !token) {
      navigate("/admin/login");
      return;
    }

    // Verify token validity with backend if token exists
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            localStorage.removeItem("mat_admin_session");
            localStorage.removeItem("mat_admin_token");
            navigate("/admin/login");
          }
        })
        .catch(() => {});
    }

    loadLeads();

    const handleLeadsUpdated = () => {
      loadLeadsQuiet();
    };
    window.addEventListener("leads_updated", handleLeadsUpdated);
    window.addEventListener("storage", handleLeadsUpdated);

    // Auto-poll leads every 5 seconds for real-time updates
    const interval = setInterval(() => {
      loadLeadsQuiet();
    }, 5000);
    return () => {
      window.removeEventListener("leads_updated", handleLeadsUpdated);
      window.removeEventListener("storage", handleLeadsUpdated);
      clearInterval(interval);
    };
  }, []);

  const loadLeads = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.leads) {
          setLeads(data.leads);
          setIsRefreshing(false);
          return;
        }
      }
    } catch {}
    setLeads(leadsStore.getLeads());
    setIsRefreshing(false);
  };

  const loadLeadsQuiet = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.leads) {
          setLeads(data.leads);
        }
      }
    } catch {
      setLeads(leadsStore.getLeads());
    }
  };

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleStageChange = async (leadId: string, newStage: string) => {
    leadsStore.updateLeadStage(leadId, newStage);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId || l.refNumber === leadId ? { ...l, stage: newStage } : l))
    );
    if (selectedLead && (selectedLead.id === leadId || selectedLead.refNumber === leadId)) {
      setSelectedLead({ ...selectedLead, stage: newStage });
    }
    showToast(`Lead moved to stage: ${newStage}`);
  };

  const handleConvertToClient = (lead: LeadItem) => {
    handleStageChange(lead.id, "Won");
    showToast(`Converted ${lead.companyName} to Active Client Project!`);
  };

  const handleCopyLeadSummary = (lead: LeadItem) => {
    const svcs = (lead.servicesRequired || lead.services || []).join(", ") || "General Inquiry";
    const text = `MAD AD THEORY - CLIENT ENQUIRY BRIEF
Ref ID: ${lead.refNumber}
Company: ${lead.companyName} (${lead.industry || "General"})
Contact Person: ${lead.fullName}
Email: ${lead.email}
Phone: ${lead.phone || "None provided"}
Website: ${lead.websiteUrl || "None provided"}
Budget: ${lead.approxBudget || lead.budgetRange || "Flexible"}
Timeline: ${lead.expectedTimeline || lead.timeline || "Immediate"}
Services Required: ${svcs}

Project Brief & Goals:
${lead.projectDescription}

Submitted At: ${new Date(lead.createdAt).toLocaleString()}`;

    try {
      navigator.clipboard.writeText(text);
      showToast("Full enquiry details copied to clipboard!");
    } catch {
      showToast("Unable to copy to clipboard.");
    }
  };

  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSiteContent(formContent);
    setIsSaving(false);
    showToast("Content updated successfully!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSignOut = () => {
    localStorage.removeItem("mat_admin_session");
    localStorage.removeItem("mat_admin_token");
    navigate("/admin/login");
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStage = leadFilter === "All" || lead.stage === leadFilter;
    const matchesSearch =
      (lead.companyName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.refNumber || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.stage === "New").length;
  const wonLeads = leads.filter((l) => l.stage === "Won").length;

  return (
    <div className="min-h-screen bg-surface-subtle dark:bg-[#0D0A14] text-text-main dark:text-text-main-dark flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#151020] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" title="Go to Website">
              <Logo size="sm" />
            </Link>
            <span className="text-brand-border">|</span>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl border border-brand-border dark:border-[#261E33] hover:border-brand-purple text-text-muted hover:text-brand-purple transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              View Website
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-xs text-red-500 hover:bg-red-500/10 rounded-xl"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Clean Sub-Navigation Tabs without horizontal scrollbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 border-t border-brand-border/40 dark:border-[#261E33]/40 overflow-x-auto no-scrollbar text-xs font-medium">
          <button
            onClick={() => handleTabChange("leads")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "leads"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Inquiries ({totalLeads})</span>
          </button>

          <button
            onClick={() => handleTabChange("ecosystem")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "ecosystem"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Projects ({ecosystemProjects.length})</span>
          </button>

          <button
            onClick={() => handleTabChange("media")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "media" || activeTab === "media-upload"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Videos & Photos ({videoTestimonials.length + galleryPhotos.length})</span>
          </button>

          <button
            onClick={() => handleTabChange("reviews")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "reviews"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews ({googleReviews.length})</span>
          </button>

          <button
            onClick={() => handleTabChange("services")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "services"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Services ({servicesList.length})</span>
          </button>

          <button
            onClick={() => handleTabChange("portfolio")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "portfolio"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Case Studies ({portfolioList.length})</span>
          </button>

          <button
            onClick={() => handleTabChange("blog")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "blog"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog ({blogList.length})</span>
          </button>

          <button
            onClick={() => handleTabChange("cms-hero")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "cms-hero"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>Website Text</span>
          </button>

          <button
            onClick={() => handleTabChange("cms-footer")}
            className={`py-3 px-3.5 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === "cms-footer"
                ? "border-purple-600 text-purple-600 dark:text-purple-400 font-bold"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Footer & Contact</span>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center animate-fade-in">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* ==================================================================== */}
        {/* TAB 1: INBOUND LEADS & CRM PIPELINE */}
        {/* ==================================================================== */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Sober & Compact Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33]">
                <span className="text-xs text-text-muted font-medium block">
                  Total Inquiries
                </span>
                <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
                  {totalLeads}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33]">
                <span className="text-xs text-text-muted font-medium block">
                  New / Unassigned
                </span>
                <div className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">
                  {newLeads}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33]">
                <span className="text-xs text-text-muted font-medium block">
                  Deals Won
                </span>
                <div className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">
                  {wonLeads}
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by company, contact, email or ref #..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#151020] focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadLeads}
                  disabled={isRefreshing}
                  className="rounded-xl text-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>

                <div className="flex items-center gap-1 overflow-x-auto text-xs">
                  {["All", "New", "Contacted", "Qualified", "Proposal Sent", "Won"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadFilter(st)}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        leadFilter === st
                          ? "bg-brand-purple text-white shadow-sm"
                          : "bg-surface-card dark:bg-[#151020] text-text-muted border border-brand-border dark:border-[#261E33] hover:text-text-main"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Leads Table + Details Drawer */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              <div className="xl:col-span-7 2xl:col-span-8 p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    All Inquiries ({filteredLeads.length})
                  </h3>
                  <span className="text-xs text-text-muted">Click any row to view details</span>
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 text-text-muted text-xs">
                    No leads matching current filters.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-brand-border dark:border-[#261E33] text-text-muted uppercase tracking-wider">
                          <th className="pb-3 font-semibold">Ref #</th>
                          <th className="pb-3 font-semibold">Company & Contact</th>
                          <th className="pb-3 font-semibold">Budget</th>
                          <th className="pb-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/60 dark:divide-[#261E33]/60">
                        {filteredLeads.map((lead) => (
                          <tr
                            key={lead.id}
                            onClick={() => setSelectedLead(lead)}
                            className={`cursor-pointer transition-colors hover:bg-brand-purple/5 ${
                              selectedLead?.id === lead.id ? "bg-brand-purple/10" : ""
                            }`}
                          >
                            <td className="py-3.5 font-mono font-bold text-brand-purple">
                              {lead.refNumber}
                            </td>
                            <td className="py-3.5">
                              <div className="font-bold text-text-main dark:text-text-main-dark">
                                {lead.companyName}
                              </div>
                              <div className="text-[11px] text-text-muted">
                                {lead.fullName} • {lead.email}
                              </div>
                            </td>
                            <td className="py-3.5 font-medium">{lead.approxBudget}</td>
                            <td className="py-3.5">
                              <select
                                value={lead.stage}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleStageChange(lead.id, e.target.value)}
                                className="text-[11px] font-bold rounded-lg border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#151020] px-2 py-1 focus:outline-none focus:border-brand-purple"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Discovery">Discovery</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="Won">Won</option>
                                <option value="Lost">Lost</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Lead Details Drawer */}
              <div className="xl:col-span-5 2xl:col-span-4 p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-6">
                {selectedLead ? (
                  <>
                    <div className="border-b border-brand-border dark:border-[#261E33] pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                          {selectedLead.refNumber}
                        </span>
                        <select
                          value={selectedLead.stage}
                          onChange={(e) => handleStageChange(selectedLead.id, e.target.value)}
                          className="text-xs font-bold rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] px-2.5 py-1 text-brand-purple focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Discovery">Discovery</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </div>

                      <h4 className="text-xl font-black text-slate-900 dark:text-white">
                        {selectedLead.companyName}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {selectedLead.fullName}
                        </span>
                        {selectedLead.industry && (
                          <>
                            <span className="text-slate-400 text-xs">•</span>
                            <span className="text-xs text-text-muted">{selectedLead.industry}</span>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] text-text-muted mt-1">
                        Received: {new Date(selectedLead.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Quick Contact Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`mailto:${selectedLead.email}?subject=Regarding%20Your%20Inquiry%20with%20Mad%20Ad%20Theory`}
                        className="p-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] hover:border-brand-purple flex items-center justify-center gap-2 text-xs font-bold text-text-main hover:text-brand-purple transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-purple" />
                        <span>Email Client</span>
                      </a>

                      {selectedLead.phone ? (
                        <a
                          href={`tel:${selectedLead.phone}`}
                          className="p-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] hover:border-brand-purple flex items-center justify-center gap-2 text-xs font-bold text-text-main hover:text-brand-purple transition-all"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Call Direct</span>
                        </a>
                      ) : (
                        <button
                          disabled
                          className="p-2.5 rounded-xl border border-brand-border/40 dark:border-[#261E33]/40 bg-surface-subtle/50 dark:bg-[#0D0A14]/50 flex items-center justify-center gap-2 text-xs text-text-muted opacity-50 cursor-not-allowed"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>No Phone</span>
                        </button>
                      )}
                    </div>

                    {/* Contact & Website Information */}
                    <div className="p-4 rounded-xl bg-surface-subtle dark:bg-[#0D0A14] border border-brand-border/60 dark:border-[#261E33]/60 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted font-medium">Work Email:</span>
                        <a href={`mailto:${selectedLead.email}`} className="font-semibold text-text-main hover:underline">
                          {selectedLead.email}
                        </a>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted font-medium">Phone Number:</span>
                        <span className="font-semibold">{selectedLead.phone || "Not provided"}</span>
                      </div>
                      {selectedLead.websiteUrl && (
                        <div className="flex items-center justify-between">
                          <span className="text-text-muted font-medium">Website:</span>
                          <a
                            href={selectedLead.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-brand-purple hover:underline inline-flex items-center gap-1"
                          >
                            <span>{selectedLead.websiteUrl.replace(/^https?:\/\//, "")}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Budget & Timeline Card */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-surface-subtle dark:bg-[#0D0A14] border border-brand-border/60 dark:border-[#261E33]/60">
                        <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">
                          Approx Budget
                        </span>
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{selectedLead.approxBudget}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-surface-subtle dark:bg-[#0D0A14] border border-brand-border/60 dark:border-[#261E33]/60">
                        <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">
                          Timeline
                        </span>
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-purple" />
                          <span>{selectedLead.expectedTimeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Services Requested */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                        Services Required ({selectedLead.servicesRequired.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLead.servicesRequired.map((svc) => (
                          <span
                            key={svc}
                            className="px-2.5 py-1 rounded-lg bg-brand-purple/10 text-brand-purple border border-brand-purple/20 text-xs font-bold"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Brief */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                        Client Message & Requirement
                      </span>
                      <div className="p-4 rounded-xl bg-surface-subtle dark:bg-[#0D0A14] border border-brand-border/60 dark:border-[#261E33]/60 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {selectedLead.projectDescription}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleCopyLeadSummary(selectedLead)}
                        className="w-full rounded-xl text-xs font-bold py-2.5"
                      >
                        Copy Inquiry Details
                      </Button>

                      <Button
                        type="button"
                        onClick={() => handleConvertToClient(selectedLead)}
                        className="w-full rounded-xl text-xs font-bold py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Mark as Won
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="py-20 text-center text-text-muted text-xs space-y-2">
                    <p className="font-semibold text-text-main">No Inquiry Selected</p>
                    <p>Click on any row in the table to view details.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: LIVE CMS SITE CONTENT & METRICS EDITOR */}
        {/* ==================================================================== */}
        {activeTab === "cms-hero" && (
          <form onSubmit={handleSaveCMS} className="space-y-6">
            {/* 1. Official Brand Logo Card */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-brand-purple" />
                    <span>Brand Logo & Monogram</span>
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Upload your official brand logo. Dynamically updates across the Navbar, Footer, Mobile Navigation, and Admin.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Live on All Pages
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                {/* Live Emblem Preview Box */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-white shadow-md border-2 border-brand-purple/30 flex items-center justify-center p-2 overflow-hidden group relative">
                    <img
                      src={formContent.logoUrl || "/images/logo-raw.jpeg"}
                      alt="Brand Logo"
                      className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-text-muted font-bold">Current Emblem</span>
                </div>

                {/* Upload Action (Strictly File Upload) */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="p-4 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-2">
                    <label className="text-xs font-bold block text-slate-800 dark:text-slate-200">
                      Upload New Logo from Device:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileUpload}
                      className="block w-full text-xs text-text-muted file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-purple file:text-white hover:file:opacity-90 cursor-pointer"
                    />
                    {isUploadingLogo && (
                      <span className="text-xs text-brand-purple font-semibold flex items-center gap-1.5 mt-1">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Uploading logo to server...
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="text-xs font-semibold text-text-muted hover:text-rose-500 transition-colors"
                    >
                      Reset to default logo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Public Announcement Top Banner Card */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-purple-500" />
                    <span>Top Announcement Banner</span>
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Rendered prominently at the very top of the website above the navigation bar.
                  </p>
                </div>

                {/* Banner Active Toggle */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className="text-xs font-bold text-text-muted">
                    {formContent.bannerEnabled !== false ? "Banner Visible" : "Banner Hidden"}
                  </span>
                  <input
                    type="checkbox"
                    checked={formContent.bannerEnabled !== false}
                    onChange={(e) =>
                      setFormContent({ ...formContent, bannerEnabled: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-brand-purple focus:ring-brand-purple cursor-pointer"
                  />
                </label>
              </div>

              {/* LIVE PREVIEW OF THE BANNER */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 block">
                  Live Site Preview (How visitors see it at top of site):
                </span>
                <div className="rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white p-3 shadow-md flex items-center justify-between gap-3 text-xs">
                  <div className="flex-1 flex items-center justify-center gap-2 flex-wrap text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[9px] uppercase tracking-wider border border-purple-500/30">
                      <Megaphone className="w-2.5 h-2.5 text-purple-400" />
                      <span>Announcement</span>
                    </span>
                    <span className="text-slate-200 font-medium">
                      {formContent.announcementText || "Now onboarding select performance ad accounts for the upcoming growth cycle."}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-purple-300 underline text-xs">
                      Learn More →
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">
                    Announcement Text
                  </label>
                  <input
                    type="text"
                    value={formContent.announcementText}
                    onChange={(e) =>
                      setFormContent({
                        ...formContent,
                        announcementText: e.target.value,
                        bannerText: e.target.value,
                      })
                    }
                    placeholder="e.g. Now onboarding select performance ad accounts for the upcoming growth cycle."
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">
                    Destination Link
                  </label>
                  <input
                    type="text"
                    value={formContent.bannerLink || "/contact"}
                    onChange={(e) =>
                      setFormContent({ ...formContent, bannerLink: e.target.value })
                    }
                    placeholder="/contact or /get-a-quote"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 3. Hero & Website Copy Card */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Hero & Website Copy</h3>
                  <p className="text-xs text-text-muted">
                    Edit the main hero text and marketing numbers displayed on the homepage.
                  </p>
                </div>
                <Button type="submit" disabled={isSaving} className="rounded-xl font-bold text-xs">
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    Hero Badge Tagline
                  </label>
                  <input
                    type="text"
                    value={formContent.heroBadge}
                    onChange={(e) => setFormContent({ ...formContent, heroBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    Attribution Notice / Trust Badge
                  </label>
                  <input
                    type="text"
                    value={formContent.footerNotice}
                    onChange={(e) => setFormContent({ ...formContent, footerNotice: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                  Main Headline (H1)
                </label>
                <input
                  type="text"
                  value={formContent.heroHeadline}
                  onChange={(e) => setFormContent({ ...formContent, heroHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                  Subheadline / Agency Value Proposition
                </label>
                <textarea
                  rows={3}
                  value={formContent.heroSubheadline}
                  onChange={(e) =>
                    setFormContent({ ...formContent, heroSubheadline: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple leading-relaxed"
                  required
                />
              </div>

              {/* Metrics Fields */}
              <div className="pt-4 border-t border-brand-border dark:border-[#261E33]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4">
                  Core Metrics Displayed Across Site
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1 font-semibold">
                      Average Client Results (e.g. 4.8x)
                    </label>
                    <input
                      type="text"
                      value={formContent.metricRoas}
                      onChange={(e) =>
                        setFormContent({ ...formContent, metricRoas: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-bold focus:outline-none focus:border-brand-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-text-muted mb-1 font-semibold">
                      Tracking Accuracy %
                    </label>
                    <input
                      type="text"
                      value={formContent.metricDataDriven}
                      onChange={(e) =>
                        setFormContent({ ...formContent, metricDataDriven: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-bold focus:outline-none focus:border-brand-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-text-muted mb-1 font-semibold">
                      Clients Served Count
                    </label>
                    <input
                      type="text"
                      value={formContent.metricBrandsScaled}
                      onChange={(e) =>
                        setFormContent({ ...formContent, metricBrandsScaled: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-bold focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: FOOTER & CONTACT INFO CMS */}
        {/* ==================================================================== */}
        {activeTab === "cms-footer" && (
          <form onSubmit={handleSaveCMS} className="space-y-6">
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Footer & Contact Details</h3>
                  <p className="text-xs text-text-muted">
                    Update phone, email, office address, and copyright text.
                  </p>
                </div>
                <Button type="submit" disabled={isSaving} className="rounded-xl font-bold text-xs">
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  {isSaving ? "Publishing..." : "Save & Publish Changes"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    Official Contact Email
                  </label>
                  <input
                    type="email"
                    value={formContent.contactEmail}
                    onChange={(e) =>
                      setFormContent({ ...formContent, contactEmail: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    Official Telephone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formContent.contactPhone}
                    onChange={(e) =>
                      setFormContent({ ...formContent, contactPhone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                  Headquarters & Office Address
                </label>
                <input
                  type="text"
                  value={formContent.officeAddress}
                  onChange={(e) =>
                    setFormContent({ ...formContent, officeAddress: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                  Footer Agency Summary Notice
                </label>
                <textarea
                  rows={2}
                  value={formContent.footerNotice}
                  onChange={(e) =>
                    setFormContent({ ...formContent, footerNotice: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                  Copyright Legal Line
                </label>
                <input
                  type="text"
                  value={formContent.copyrightText}
                  onChange={(e) =>
                    setFormContent({ ...formContent, copyrightText: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-card dark:bg-[#0D0A14] text-xs font-medium focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>
            </div>
          </form>
        )}

        {/* ==================================================================== */}
        {/* TAB: SERVICES & NAVBAR MANAGER */}
        {/* ==================================================================== */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <form
              onSubmit={handleAddService}
              className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-main dark:text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-purple" />
                    <span>{editingServiceId ? "Edit Service" : "Add New Service"}</span>
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Changes here immediately update the website navigation menu and service pages.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {editingServiceId && (
                    <Button type="button" variant="outline" size="sm" onClick={handleCancelServiceEdit} className="rounded-xl">
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" size="sm" className="rounded-xl">
                    <Save className="w-3.5 h-3.5 mr-1" />
                    {editingServiceId ? "Save Changes" : "Publish Service"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meta ROAS Scaling Engine"
                    value={newServiceTitle}
                    onChange={(e) => setNewServiceTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Category *
                  </label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Technology">Technology</option>
                    <option value="Automation">Automation</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Service Summary / Scope *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Comprehensive description of the service deliverables, tech stack, and execution method..."
                  value={newServiceSummary}
                  onChange={(e) => setNewServiceSummary(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple resize-none"
                />
              </div>
            </form>

            {/* Existing Services Grid */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <h4 className="text-sm font-bold text-text-main dark:text-white">
                  Active Services ({servicesList.length})
                </h4>
                <span className="text-xs text-text-muted">Active on Services Page</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicesList.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                          {srv.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSelectServiceToEdit(srv)}
                            className="p-1 rounded-lg text-slate-400 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors"
                            title="Edit service"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteService(srv.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Remove service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h5 className="font-heading font-bold text-sm text-text-main dark:text-white leading-tight">
                        {srv.title}
                      </h5>
                      <p className="text-xs text-text-muted mt-1 line-clamp-2">
                        {srv.shortSummary}
                      </p>
                    </div>
                    <div className="text-[10px] text-text-muted font-mono pt-2 border-t border-brand-border/40 dark:border-white/5 flex items-center justify-between">
                      <span>/{srv.slug}</span>
                      <span className="text-emerald-500">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB: PORTFOLIO & WORK MANAGER */}
        {/* ==================================================================== */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <form
              onSubmit={handleAddCaseStudy}
              className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-main dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-purple" />
                    <span>{editingCsId ? "Edit Case Study" : "Add New Case Study"}</span>
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Published case studies appear on the portfolio and work page.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {editingCsId && (
                    <Button type="button" variant="outline" size="sm" onClick={handleCancelCaseStudyEdit} className="rounded-xl">
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" size="sm" className="rounded-xl">
                    <Save className="w-3.5 h-3.5 mr-1" />
                    {editingCsId ? "Save Changes" : "Publish Case Study"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aura Direct D2C"
                    value={newCsClient}
                    onChange={(e) => setNewCsClient(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Industry *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fashion & Apparel"
                    value={newCsIndustry}
                    onChange={(e) => setNewCsIndustry(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Average ROAS
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5.2x"
                    value={newCsRoas}
                    onChange={(e) => setNewCsRoas(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Revenue Growth
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +380%"
                    value={newCsGrowth}
                    onChange={(e) => setNewCsGrowth(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Headline / Outcome *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scaled Monthly Revenue 4.2x in 90 Days via Full-Funnel Creative Matrix"
                  value={newCsHeadline}
                  onChange={(e) => setNewCsHeadline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Execution Strategy (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Key strategic pivots, creative angles, or tracking architecture implemented..."
                  value={newCsStrategy}
                  onChange={(e) => setNewCsStrategy(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple resize-none"
                />
              </div>
            </form>

            {/* Existing Case Studies List */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <h4 className="text-sm font-bold text-text-main dark:text-white">
                  Active Case Studies ({portfolioList.length})
                </h4>
                <span className="text-xs text-text-muted">Active on Portfolio</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioList.map((cs) => (
                  <div
                    key={cs.id}
                    className="p-5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-brand-purple">
                          {cs.clientName} • {cs.industry}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSelectCaseStudyToEdit(cs)}
                            className="p-1 rounded-lg text-slate-400 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors"
                            title="Edit case study"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCaseStudy(cs.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Remove case study"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h5 className="font-heading font-bold text-sm text-text-main dark:text-white leading-snug">
                        {cs.headline}
                      </h5>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-brand-border/40 dark:border-white/5">
                      {cs.results.map((res, rIdx) => (
                        <div key={rIdx} className="text-center p-2 rounded-lg bg-surface-card dark:bg-[#151020]">
                          <div className="text-xs font-heading font-bold text-brand-purple">
                            {res.value}
                          </div>
                          <div className="text-[10px] text-text-muted truncate">
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB: CAREERS & OPENINGS MANAGER */}
        {/* ==================================================================== */}
        {activeTab === "careers" && (
          <div className="space-y-6">
            <form
              onSubmit={handleAddJob}
              className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-main dark:text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-purple" />
                    <span>Post New Career Opportunity</span>
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Job postings appear on the careers page and accept incoming applications.
                  </p>
                </div>
                <Button type="submit" size="sm" className="rounded-xl">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Post Job
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Meta Performance Media Buyer"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newJobDept}
                    onChange={(e) => setNewJobDept(e.target.value)}
                    placeholder="e.g. Paid Acquisition"
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newJobLoc}
                    onChange={(e) => setNewJobLoc(e.target.value)}
                    placeholder="e.g. Remote / Hybrid (New Delhi)"
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Employment Type
                  </label>
                  <select
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract / Sprint">Contract / Sprint</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    value={newJobExp}
                    onChange={(e) => setNewJobExp(e.target.value)}
                    placeholder="e.g. 2-4 Years"
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Job Description & Qualifications *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Responsibilities, required technical skills, and key qualifications..."
                  value={newJobDesc}
                  onChange={(e) => setNewJobDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple resize-none"
                />
              </div>
            </form>

            {/* Existing Careers List */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <h4 className="text-sm font-bold text-text-main dark:text-white">
                  Active Openings ({careersList.length})
                </h4>
                <span className="text-xs text-text-muted">Active on Careers</span>
              </div>

              <div className="space-y-3">
                {careersList.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {job.status}
                        </span>
                        <span className="text-xs text-brand-purple font-medium">
                          {job.department}
                        </span>
                        <span className="text-text-muted text-xs">• {job.type}</span>
                        <span className="text-text-muted text-xs">• {job.location}</span>
                      </div>
                      <h5 className="font-heading font-bold text-sm text-text-main dark:text-white">
                        {job.title}
                      </h5>
                      <p className="text-xs text-text-muted line-clamp-1 max-w-2xl">
                        {job.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 text-xs font-semibold self-start sm:self-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB: BLOG & INSIGHTS MANAGER */}
        {/* ==================================================================== */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <form
              onSubmit={handleAddBlogPost}
              className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-main dark:text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-purple" />
                    <span>
                      {editingBlogSlug ? "Edit Article" : "Publish New Article (/blog)"}
                    </span>
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Articles are published immediately to the Insights & Performance Strategy Hub.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {editingBlogSlug && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCancelBlogEdit}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" size="sm" className="rounded-xl">
                    <Save className="w-3.5 h-3.5 mr-1" />
                    {editingBlogSlug ? "Save Article Changes" : "Publish Article"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-text-muted">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scaling Meta ROAS Above 4.5x: Creative Diversification Protocol"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-text-muted">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newBlogCategory}
                    onChange={(e) => setNewBlogCategory(e.target.value)}
                    placeholder="e.g. Paid Media"
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-text-muted">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={newBlogReadTime}
                    onChange={(e) => setNewBlogReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              {/* Cover Image Upload (Strictly via upload button) */}
              <div className="p-4 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Article Cover Image (Upload from Device):
                  </span>
                  {newBlogCoverImage && (
                    <button
                      type="button"
                      onClick={() => setNewBlogCoverImage("")}
                      className="text-xs text-rose-500 hover:underline font-semibold"
                    >
                      Remove Cover
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {newBlogCoverImage ? (
                    <div className="w-20 h-14 rounded-lg overflow-hidden border border-brand-purple/40 bg-black shrink-0 shadow-sm">
                      <img
                        src={newBlogCoverImage}
                        alt="Article Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-14 rounded-lg border border-dashed border-brand-border dark:border-[#261E33] flex items-center justify-center shrink-0 text-text-muted">
                      <ImageIcon className="w-5 h-5 opacity-40" />
                    </div>
                  )}

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBlogCoverUpload}
                      className="block w-full text-xs text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-purple file:text-white hover:file:opacity-90 cursor-pointer"
                    />
                    {isUploadingBlogCover && (
                      <span className="text-xs text-brand-purple font-semibold flex items-center gap-1.5 mt-1">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Uploading cover image...
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Article Summary / Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Key strategic takeaways and performance marketing insights covered in this article..."
                  value={newBlogSummary}
                  onChange={(e) => setNewBlogSummary(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Full Article Content (Markdown or Paragraphs)
                </label>
                <textarea
                  rows={6}
                  placeholder="Full article content, paragraphs, strategy breakdowns, and tactical advice..."
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple font-mono leading-relaxed resize-y"
                />
              </div>
            </form>

            {/* Existing Blog Articles List */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <h4 className="text-sm font-bold text-text-main dark:text-white">
                  Active Articles ({blogList.length})
                </h4>
                <span className="text-xs text-text-muted">Click Edit to modify any article</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogList.map((b) => (
                  <div
                    key={b.slug}
                    className="p-5 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] flex flex-col justify-between space-y-3"
                  >
                    <div>
                      {b.coverImage && (
                        <div className="h-28 w-full rounded-lg overflow-hidden mb-3 bg-black">
                          <img
                            src={b.coverImage}
                            alt={b.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                          {b.category} • {b.readTime}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSelectBlogToEdit(b)}
                            className="p-1 rounded-lg text-slate-400 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors"
                            title="Edit article"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlogPost(b.slug)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Remove article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h5 className="font-heading font-bold text-sm text-text-main dark:text-white leading-snug">
                        {b.title}
                      </h5>
                      <p className="text-xs text-text-muted mt-1 line-clamp-2">
                        {b.summary}
                      </p>
                    </div>
                    <div className="text-[10px] text-text-muted font-mono pt-2 border-t border-brand-border/40 dark:border-white/5 flex items-center justify-between">
                      <Link
                        to={`/blog/${b.slug}`}
                        target="_blank"
                        className="text-brand-purple hover:underline inline-flex items-center gap-1"
                      >
                        <span>/blog/{b.slug}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <span className="text-emerald-500 font-bold">Published</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: GOOGLE REVIEWS MANAGER */}
        {/* ==================================================================== */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Add New Review Card */}
            <form
              onSubmit={handleAddReview}
              className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-brand-border dark:border-[#261E33] pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-main dark:text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{editingReviewId ? "Edit Review" : "Add New Review"}</span>
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Client reviews displayed on the website.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {editingReviewId && (
                    <Button type="button" variant="outline" size="sm" onClick={handleCancelReviewEdit} className="rounded-xl">
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" size="sm" className="rounded-xl">
                    <Save className="w-3.5 h-3.5 mr-1" />
                    {editingReviewId ? "Save Review" : "Add to Website"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikas Sharma"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Role / Company (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Founder, D2C Apparel"
                    value={newReviewRole}
                    onChange={(e) => setNewReviewRole(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">
                    Star Rating
                  </label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Review Text *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Paste the Google review text..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-xs focus:outline-none focus:border-brand-purple leading-relaxed"
                />
              </div>
            </form>

            {/* List of Active Reviews */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Active Reviews ({googleReviews.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {googleReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${rev.avatarBg}`}
                          >
                            {rev.initials}
                          </div>
                          <div>
                            <span className="font-bold text-xs block text-text-main dark:text-white">
                              {rev.author}
                            </span>
                            <span className="text-[10px] text-text-muted block">
                              {rev.role || "Client"} • {rev.timeAgo}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-text-muted dark:text-slate-300 leading-relaxed italic">
                        "{rev.text}"
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-brand-border/60 dark:border-[#261E33] flex items-center justify-between">
                      <span className="text-[10px] text-emerald-500 font-semibold">
                        ✓ Active on Website
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectReviewToEdit(rev)}
                          className="text-xs text-brand-purple hover:underline font-semibold inline-flex items-center gap-1 p-1 rounded transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(rev.id)}
                          className="text-xs text-rose-500 hover:text-rose-600 font-semibold inline-flex items-center gap-1 p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: LIVE SHOWCASE PROJECTS CMS */}
        {/* ==================================================================== */}
        {activeTab === "ecosystem" && editingProject && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Projects
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Manage portfolio projects, links, and screenshots.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddNewProject}
                  className="text-xs rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add New Project
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetEcosystem}
                  className="text-xs rounded-xl"
                >
                  Reset Defaults
                </Button>
                <a
                  href="/#ecosystem"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-purple/10 text-brand-purple text-xs font-bold hover:bg-brand-purple/20 transition-colors"
                >
                  <span>View on Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Project Selector List (Left column) */}
              <div className="lg:col-span-4 xl:col-span-4 p-4 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-3">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-text-muted block">
                    Showcase Projects ({ecosystemProjects.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddNewProject}
                    className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>New</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
                  {ecosystemProjects.map((proj) => {
                    const isSelected = selectedProjectId === proj.id;

                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => handleSelectProject(proj.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between ${
                          isSelected
                            ? "bg-brand-purple/10 border-brand-purple text-brand-purple shadow-xs"
                            : "bg-surface-subtle dark:bg-[#0E0A16] border-brand-border/40 hover:border-brand-purple/40 text-text-main"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-[11px] font-bold opacity-70 shrink-0">
                            {proj.number}
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold truncate">{proj.title}</h4>
                            <span className="text-[10px] text-text-muted capitalize block truncate">
                              {proj.categoryId.replace("-", " ")}
                            </span>
                          </div>
                        </div>

                        {proj.imageUrl ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold shrink-0">
                            Screenshot
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 font-medium shrink-0">
                            Default UI
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Edit Form (Right column) */}
              <div className="lg:col-span-8 xl:col-span-8 p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-6">
                <form onSubmit={handleSaveProject} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border dark:border-[#261E33] pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-brand-purple font-bold tracking-wider">
                        Project ID: {editingProject.id}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        {editingProject.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {ecosystemProjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(editingProject.id)}
                          className="px-3.5 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                      <Button type="submit" variant="primary" size="sm" className="rounded-xl font-bold shadow-md bg-purple-600 hover:bg-purple-700 text-white px-4 py-2">
                        <Save className="w-3.5 h-3.5 mr-1.5" />
                        Save Project
                      </Button>
                    </div>
                  </div>

                  {/* 1. Screenshot Upload Section */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-main block">
                      Project Screenshot (Uploaded via Button)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                      {/* Image Preview Box */}
                      <div className="h-44 rounded-2xl border-2 border-dashed border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] flex flex-col items-center justify-center p-3 overflow-hidden relative group">
                        {editingProject.imageUrl ? (
                          <>
                            <img
                              src={editingProject.imageUrl}
                              alt="Uploaded screenshot"
                              className="w-full h-full object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={() => setEditingProject((prev) => ({ ...prev, imageUrl: "" }))}
                              className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold shadow-md hover:bg-red-700 transition-colors"
                            >
                              Remove Screenshot
                            </button>
                          </>
                        ) : (
                          <div className="text-center space-y-2 p-4 text-text-muted">
                            <ImageIcon className="w-8 h-8 mx-auto opacity-50 text-purple-400" />
                            <p className="text-xs font-semibold">No screenshot uploaded yet.</p>
                            <span className="text-[10px] text-text-muted block">
                              Click upload below to add a real project capture.
                            </span>
                          </div>
                        )}
                      </div>

                      {/* File Uploader (Button only, no URL paste) */}
                      <div className="p-4 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-2">
                        <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">
                          Upload Screenshot File:
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="block w-full text-xs text-text-muted file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:opacity-90 cursor-pointer"
                        />
                        {isUploadingScreenshot && (
                          <span className="text-xs text-purple-500 font-semibold flex items-center gap-1 mt-1">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Uploading screenshot to server...
                          </span>
                        )}
                        <p className="text-[11px] text-text-muted mt-1">
                          Images are uploaded directly to the local server and rendered live.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Category & Live Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-main block">
                        Category
                      </label>
                      <select
                        value={editingProject.categoryId}
                        onChange={(e) =>
                          setEditingProject((prev) => ({
                            ...prev,
                            categoryId: e.target.value as any,
                          }))
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main font-semibold"
                      >
                        <option value="performance-marketing">Performance Marketing</option>
                        <option value="software-tech">Web & Software</option>
                        <option value="automation-crm">Workflow Automation</option>
                        <option value="influencer-creative">Influencer & Creative</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-main block">
                        Website Link
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          required
                          value={editingProject.liveUrl}
                          onChange={(e) =>
                            setEditingProject((prev) => ({ ...prev, liveUrl: e.target.value }))
                          }
                          placeholder="https://client-domain.com"
                          className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main"
                        />
                        <a
                          href={editingProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 rounded-xl border border-brand-border dark:border-[#261E33] text-xs font-bold hover:border-brand-purple flex items-center gap-1 shrink-0"
                        >
                          <span>Test</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 3. Title & Highlight Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-main block">
                        Project Name / Title
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject((prev) => ({ ...prev, title: e.target.value }))
                        }
                        placeholder="e.g. D2C Fashion ROAS Sprint"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main font-semibold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-main block">
                        Highlight Badge / Metric Tag
                      </label>
                      <input
                        type="text"
                        value={editingProject.shortTag}
                        onChange={(e) =>
                          setEditingProject((prev) => ({
                            ...prev,
                            shortTag: e.target.value,
                          }))
                        }
                        placeholder="e.g. 4.82x ROAS or 148 Demos / mo"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-main block">
                      Summary Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject.summary}
                      onChange={(e) =>
                        setEditingProject((prev) => ({ ...prev, summary: e.target.value }))
                      }
                      placeholder="Short summary of results and deliverables..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main resize-none"
                    />
                  </div>

                  {/* 4. 4 KPI Metrics */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-main block">
                      Key Results & Metrics (4 Items)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {editingProject.kpis.map((kpi, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-1.5"
                        >
                          <input
                            type="text"
                            value={kpi.label}
                            onChange={(e) => {
                              const copy = [...editingProject.kpis];
                              copy[idx].label = e.target.value;
                              setEditingProject((prev) => ({ ...prev, kpis: copy }));
                            }}
                            placeholder="Metric (e.g. ROAS)"
                            className="w-full px-2 py-1 text-[11px] font-bold rounded-lg border border-brand-border/60 bg-transparent text-text-main"
                          />
                          <input
                            type="text"
                            value={kpi.value}
                            onChange={(e) => {
                              const copy = [...editingProject.kpis];
                              copy[idx].value = e.target.value;
                              setEditingProject((prev) => ({ ...prev, kpis: copy }));
                            }}
                            placeholder="Value (e.g. 4.82x)"
                            className="w-full px-2 py-1 text-xs font-black rounded-lg border border-brand-border/60 bg-transparent text-purple-600 dark:text-purple-400"
                          />
                          <input
                            type="text"
                            value={kpi.note}
                            onChange={(e) => {
                              const copy = [...editingProject.kpis];
                              copy[idx].note = e.target.value;
                              setEditingProject((prev) => ({ ...prev, kpis: copy }));
                            }}
                            placeholder="Note (e.g. Meta & Google)"
                            className="w-full px-2 py-0.5 text-[10px] text-text-muted rounded-lg border border-brand-border/60 bg-transparent"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-border dark:border-[#261E33] flex justify-end">
                    <Button type="submit" variant="primary" size="md" className="rounded-xl font-bold shadow-md bg-purple-600 hover:bg-purple-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Project
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: VIDEOS, PHOTOS & BRAND ASSETS (MEDIA STUDIO) */}
        {/* ==================================================================== */}
        {(activeTab === "media" || activeTab === "media-upload") && (
          <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Videos & Photos
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Upload video reels and team photos.
                </p>
              </div>

              <Link
                to="/gallery"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold hover:bg-purple-500/20 transition-colors shrink-0"
              >
                <span>View Public Gallery</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 1. Client Video Reels */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-6">
              <div className="border-b border-brand-border dark:border-[#261E33] pb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Add Video Reel
                  </h4>
                </div>
                <span className="text-xs font-bold text-text-muted">
                  {videoTestimonials.length} Reels
                </span>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-main block">Client Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newVidName}
                      onChange={(e) => setNewVidName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-main block">Company / Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={newVidCompany}
                      onChange={(e) => setNewVidCompany(e.target.value)}
                      placeholder="e.g. Apex Apparel D2C"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-main block">Role / Designation</label>
                    <input
                      type="text"
                      value={newVidRole}
                      onChange={(e) => setNewVidRole(e.target.value)}
                      placeholder="e.g. Founder & CEO"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main"
                    />
                  </div>
                </div>

                {/* Direct Upload Buttons for Video and Poster */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-2">
                    <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">
                      1. Upload Video File (MP4, WebM):
                    </span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/*"
                      onChange={handleVideoFileUpload}
                      className="block w-full text-xs text-text-muted file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:opacity-90 cursor-pointer"
                    />
                    {isUploadingVideo && (
                      <span className="text-xs text-purple-500 font-semibold flex items-center gap-1 mt-1">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Uploading video to server...
                      </span>
                    )}
                    {newVidUrl && !isUploadingVideo && (
                      <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1 mt-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Video ready: {newVidUrl}
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-2">
                    <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">
                      2. Upload Video Thumbnail / Poster:
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePosterFileUpload}
                      className="block w-full text-xs text-text-muted file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:opacity-90 cursor-pointer"
                    />
                    {isUploadingPoster && (
                      <span className="text-xs text-purple-500 font-semibold flex items-center gap-1 mt-1">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Uploading poster to server...
                      </span>
                    )}
                    {newVidPoster && !isUploadingPoster && (
                      <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1 mt-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Poster attached
                      </span>
                    )}
                  </div>
                </div>

                {/* Optional direct URL fallback */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[11px] text-text-muted block mb-1">Or Video Direct URL:</label>
                    <input
                      type="url"
                      value={newVidUrl}
                      onChange={(e) => setNewVidUrl(e.target.value)}
                      placeholder="https://... or uploaded file path"
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-text-muted block mb-1">Or Poster Image URL:</label>
                    <input
                      type="url"
                      value={newVidPoster}
                      onChange={(e) => setNewVidPoster(e.target.value)}
                      placeholder="https://... or uploaded poster path"
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main"
                    />
                  </div>
                </div>

                {/* Video preview */}
                {newVidUrl && (
                  <div className="p-3 rounded-2xl bg-black/40 border border-brand-border/40 flex items-center gap-4">
                    <div className="w-16 h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                      <video src={newVidUrl} poster={newVidPoster} className="w-full h-full object-cover" muted autoPlay loop />
                    </div>
                    <div className="text-xs space-y-1">
                      <span className="font-bold text-emerald-400 block">Preview Ready</span>
                      <span className="text-slate-300 font-semibold">{newVidName || "Client"} • {newVidCompany || "Company"}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button type="submit" variant="primary" size="md" className="rounded-xl font-bold shadow-md bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-1.5" />
                    Publish Video Reel to Homepage
                  </Button>
                </div>
              </form>

              {/* Active Videos List */}
              <div className="space-y-3 pt-4 border-t border-brand-border dark:border-[#261E33]">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                  Active Video Testimonials ({videoTestimonials.length})
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {videoTestimonials.map((vid) => (
                    <div
                      key={vid.id}
                      className="p-3 rounded-2xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-2 relative group"
                    >
                      <div className="aspect-[9/16] rounded-xl overflow-hidden bg-black relative">
                        <video
                          src={vid.videoUrl}
                          poster={vid.posterUrl}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {vid.name}
                        </h5>
                        <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold truncate">
                          {vid.company}
                        </p>
                        <p className="text-[10px] text-text-muted truncate">
                          {vid.role}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(vid.id)}
                        className="w-full py-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete Reel</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Upload Team & Culture Photos */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-6">
              <div className="border-b border-brand-border dark:border-[#261E33] pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-500">
                    Culture & Office Gallery
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Add Team & Culture Photo
                  </h4>
                </div>
                <span className="text-xs font-bold text-text-muted">
                  {galleryPhotos.length} Photos Active
                </span>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-main block">Photo Caption / Title *</label>
                    <input
                      type="text"
                      required
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      placeholder="e.g. Campaign Launch & Delhi Team Sprint"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-main block">Tag / Office Location</label>
                    <input
                      type="text"
                      value={newPhotoTag}
                      onChange={(e) => setNewPhotoTag(e.target.value)}
                      placeholder="e.g. Delhi Hub, Milestone, Sprint"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] text-text-main"
                    />
                  </div>
                </div>

                {/* Direct Photo File Upload */}
                <div className="p-4 rounded-xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-2">
                  <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">
                    Upload Photo File from Device:
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileUpload}
                    className="block w-full text-xs text-text-muted file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:opacity-90 cursor-pointer"
                  />
                  {isUploadingPhoto && (
                    <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1 mt-1">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Uploading photo to server...
                    </span>
                  )}
                  {newPhotoUrl && !isUploadingPhoto && (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-emerald-500/40 bg-black shrink-0">
                        <img src={newPhotoUrl} alt="Upload preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-emerald-500 font-semibold">Photo attached and ready!</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" variant="primary" size="md" className="rounded-xl font-bold shadow-md bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-1.5" />
                    Publish Photo to Gallery
                  </Button>
                </div>
              </form>

              {/* Active Photos Grid */}
              <div className="space-y-3 pt-4 border-t border-brand-border dark:border-[#261E33]">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                  Active Gallery Photos ({galleryPhotos.length})
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="p-3 rounded-2xl border border-brand-border dark:border-[#261E33] bg-surface-subtle dark:bg-[#0D0A14] space-y-2 relative group"
                    >
                      <div className="h-32 rounded-xl overflow-hidden bg-slate-900 relative">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                        {photo.tag && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-[9px] font-mono text-white font-bold">
                            {photo.tag}
                          </span>
                        )}
                      </div>

                      <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {photo.title}
                      </h5>

                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="w-full py-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete Photo</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Official Brand Assets */}
            <div className="p-6 rounded-2xl bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] space-y-6">
              <div className="border-b border-brand-border dark:border-[#261E33] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-purple">
                  Identity Settings
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Brand Assets & Official Graphics
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface-subtle dark:bg-[#0D0A14] border border-brand-border dark:border-[#261E33] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                      Official Brand Logo
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                      Live on Site
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-md border border-brand-purple/20 flex items-center justify-center p-2 shrink-0">
                      <img
                        src={formContent.logoUrl || "/images/logo-raw.jpeg"}
                        alt="Logo Asset"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileUpload}
                        className="block w-full text-xs text-text-muted file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-purple file:text-white hover:file:opacity-90 cursor-pointer"
                      />
                      {isUploadingLogo && (
                        <span className="text-xs text-brand-purple font-semibold flex items-center gap-1">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Uploading logo...
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={handleResetLogo}
                        className="text-[11px] text-text-muted hover:text-rose-500 font-semibold"
                      >
                        Reset to default logo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-surface-subtle dark:bg-[#0D0A14] border border-brand-border dark:border-[#261E33] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                      Top Announcement Banner
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
                      {formContent.bannerEnabled !== false ? "Active" : "Disabled"}
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white p-3 shadow-sm flex items-center justify-between gap-2 text-xs">
                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[9px] uppercase tracking-wider border border-purple-500/30">
                        Announcement
                      </span>
                      <span className="text-slate-200 text-xs font-medium truncate">
                        {formContent.announcementText || "Performance ad accounts onboarding open."}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-text-muted flex items-center justify-between">
                    <span>Manage banner text & visibility under <strong>Website Text</strong> tab.</span>
                    <button
                      type="button"
                      onClick={() => handleTabChange("cms-hero")}
                      className="text-brand-purple font-bold hover:underline"
                    >
                      Edit Banner →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

