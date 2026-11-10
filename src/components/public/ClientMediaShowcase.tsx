import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useTestimonialsAndGallery, VideoTestimonial } from "@/lib/testimonialsAndGalleryStore";

function VideoCard({ video }: { video: VideoTestimonial }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="shrink-0 w-64 sm:w-72 aspect-[9/16] rounded-3xl overflow-hidden relative border-2 border-slate-200 dark:border-white/10 shadow-xl bg-slate-950 group">
      {/* Video Element (Auto-plays muted loop) */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.posterUrl}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Top Controls Overlay */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
        <button
          type="button"
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-md"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-md"
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
        </button>
      </div>

      {/* Bottom Client Details Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-12 space-y-1">
        <h4 className="font-heading font-black text-sm text-white leading-tight">
          {video.name}
        </h4>
        <p className="text-xs font-semibold text-purple-400 truncate">
          {video.company}
        </p>
        <span className="text-[10px] text-white/70 block truncate">
          {video.role}
        </span>
      </div>
    </div>
  );
}

export function ClientMediaShowcase() {
  const { videos } = useTestimonialsAndGallery();

  // Double arrays for seamless infinite marquee loop
  const marqueeVideos = [...videos, ...videos, ...videos];

  return (
    <section className="py-20 md:py-28 bg-surface-subtle overflow-hidden">
      {/* ─── CLIENT VIDEO TESTIMONIALS ─── */}
      <div className="space-y-10">
        {/* Ribbon Marquee Banner */}
        <div className="w-full bg-slate-900 dark:bg-black py-3 border-y border-white/10 overflow-hidden">
          <div className="animate-marquee-fast flex items-center gap-8 whitespace-nowrap text-xs font-heading font-black uppercase tracking-widest text-white/90">
            <span>Develop it Once • Develop it from Best • Scale with Mad Ad Theory • Zero Vanity Metrics • High ROAS •</span>
            <span>Develop it Once • Develop it from Best • Scale with Mad Ad Theory • Zero Vanity Metrics • High ROAS •</span>
            <span>Develop it Once • Develop it from Best • Scale with Mad Ad Theory • Zero Vanity Metrics • High ROAS •</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
              Happy Clients Testimonials
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Watch real founders and brand operators share their verified growth metrics and partnership experience.
            </p>
          </div>
        </div>

        {/* Video Reel Infinite Sliding Track (Pauses cleanly on hover) */}
        <div className="overflow-hidden w-full py-4 marquee-track group">
          <div className="animate-marquee-fast flex gap-6 px-4 hover:[animation-play-state:paused]">
            {marqueeVideos.map((video, idx) => (
              <VideoCard key={`${video.id}-${idx}`} video={video} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

