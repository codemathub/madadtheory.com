import { useState, useEffect } from "react";

export interface VideoTestimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  videoUrl: string;
  posterUrl: string;
  duration?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  imageUrl: string;
  tag?: string;
}

export const initialVideoTestimonials: VideoTestimonial[] = [
  {
    id: "vid-1",
    name: "Vikram Malhotra",
    company: "Apex D2C Apparel",
    role: "Founder & CEO",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    duration: "0:45",
  },
  {
    id: "vid-2",
    name: "Ananya Deshmukh",
    company: "SaaSFlow Technologies",
    role: "VP of Growth",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    duration: "0:38",
  },
  {
    id: "vid-3",
    name: "Karan Singhania",
    company: "Luxe Decor & Living",
    role: "Managing Director",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    posterUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    duration: "0:52",
  },
  {
    id: "vid-4",
    name: "Rhea Kapoor",
    company: "Glow Botanicals",
    role: "Co-Founder",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    duration: "0:40",
  },
];

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Team Strategy Sprint & Campaign Launch",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    tag: "Delhi Office",
  },
  {
    id: "gal-2",
    title: "Performance Review & ROAS Milestone Celebration",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    tag: "Milestone",
  },
  {
    id: "gal-3",
    title: "Engineering & Headless Checkout Architecture",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    tag: "Dev Team",
  },
  {
    id: "gal-4",
    title: "Quarterly Growth Offsite & Team Bonding",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    tag: "Culture",
  },
  {
    id: "gal-5",
    title: "Creative Studio & Direct-Response Hook Filming",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    tag: "Creative Lab",
  },
  {
    id: "gal-6",
    title: "Client War-Room & Meta Ad-Spend Pacing",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    tag: "Execution",
  },
  {
    id: "gal-7",
    title: "Annual Celebration & Founders Meetup",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    tag: "Delhi Hub",
  },
  {
    id: "gal-8",
    title: "Rapid Prototyping & UX Wireframing Session",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    tag: "Sprint",
  },
];

const VIDEOS_STORAGE_KEY = "mat_video_testimonials_v1";
const PHOTOS_STORAGE_KEY = "mat_gallery_photos_v1";

export function getVideoTestimonials(): VideoTestimonial[] {
  try {
    const raw = localStorage.getItem(VIDEOS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return initialVideoTestimonials;
}

export function saveVideoTestimonials(videos: VideoTestimonial[]): void {
  try {
    localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(videos));
    window.dispatchEvent(new Event("media_testimonials_updated"));
  } catch {}
}

export function getGalleryPhotos(): GalleryPhoto[] {
  try {
    const raw = localStorage.getItem(PHOTOS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return initialGalleryPhotos;
}

export function saveGalleryPhotos(photos: GalleryPhoto[]): void {
  try {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(photos));
    window.dispatchEvent(new Event("media_testimonials_updated"));
  } catch {}
}

export function useTestimonialsAndGallery() {
  const [videos, setVideos] = useState<VideoTestimonial[]>(getVideoTestimonials);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(getGalleryPhotos);

  useEffect(() => {
    const handleUpdate = () => {
      setVideos(getVideoTestimonials());
      setPhotos(getGalleryPhotos());
    };

    window.addEventListener("media_testimonials_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("media_testimonials_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return { videos, photos };
}

