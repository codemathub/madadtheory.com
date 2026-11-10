import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, ArrowRight, Video, Camera, Sparkles } from "lucide-react";
import { useTestimonialsAndGallery, VideoTestimonial } from "@/lib/testimonialsAndGalleryStore";

export default function Gallery() {
  const { videos, photos } = useTestimonialsAndGallery();
  const [activeTab, setActiveTab] = useState<"all" | "videos" | "photos">("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    document.title = "Culture, Videos & Media Gallery — Mad Ad Theory";
  }, []);

  const toggleVideo = (id: string) => {
    if (playingVideoId === id) {
      setPlayingVideoId(null);
    } else {
      setPlayingVideoId(id);
    }
  };

  return (
    <div className="min-h-screen bg-surface-subtle dark:bg-[#0D0A14] text-text-main dark:text-text-main-dark">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-brand-border/40 dark:border-[#261E33]/40 bg-surface dark:bg-[#120E1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Camera className="w-3.5 h-3.5" />
            <span>Behind the Scenes & Client Stories</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto">
            Our Culture & Client Reels
          </h1>

          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Directly from our client war-rooms, campaign launches, and strategy sprints. Real people delivering measurable growth.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-surface-card dark:bg-[#1A1424] text-text-muted border border-brand-border dark:border-[#261E33] hover:text-text-main"
              }`}
            >
              All Media ({videos.length + photos.length})
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "videos"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-surface-card dark:bg-[#1A1424] text-text-muted border border-brand-border dark:border-[#261E33] hover:text-text-main"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Reels ({videos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "photos"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-surface-card dark:bg-[#1A1424] text-text-muted border border-brand-border dark:border-[#261E33] hover:text-text-main"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Culture Photos ({photos.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Video Reels Section */}
        {(activeTab === "all" || activeTab === "videos") && videos.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Client Video Reels
                </h2>
                <p className="text-xs text-text-muted mt-1">
                  Founder & VP reviews on performance campaigns and revenue scaling.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((vid) => {
                const isPlaying = playingVideoId === vid.id;

                return (
                  <div
                    key={vid.id}
                    className="group rounded-2xl overflow-hidden bg-black border border-brand-border/60 dark:border-[#261E33] flex flex-col relative shadow-lg"
                  >
                    <div className="aspect-[9/16] relative bg-black overflow-hidden">
                      <video
                        id={`vid-${vid.id}`}
                        src={vid.videoUrl}
                        poster={vid.posterUrl}
                        playsInline
                        loop
                        muted={isMuted}
                        autoPlay={isPlaying}
                        className="w-full h-full object-cover"
                      />

                      {/* Play/Pause Overlay */}
                      <button
                        type="button"
                        onClick={() => toggleVideo(vid.id)}
                        className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all cursor-pointer"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        <div className="w-12 h-12 rounded-full bg-white/90 text-purple-900 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </div>
                      </button>

                      {/* Mute Toggle */}
                      {isPlaying && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                          }}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      )}

                      {/* Details Badge */}
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white pointer-events-none">
                        <h3 className="font-bold text-sm leading-tight">{vid.name}</h3>
                        <p className="text-xs text-purple-300 font-semibold">{vid.company}</p>
                        <p className="text-[11px] text-slate-300">{vid.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Culture Photos Section */}
        {(activeTab === "all" || activeTab === "photos") && photos.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Office Culture & War-Room Sprints
                </h2>
                <p className="text-xs text-text-muted mt-1">
                  A glimpse into our team sprint sessions, strategy reviews, and culture.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group rounded-2xl overflow-hidden bg-surface-card dark:bg-[#151020] border border-brand-border dark:border-[#261E33] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-950 relative">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {photo.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[10px] font-bold">
                        {photo.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-purple-900 to-slate-900 text-white text-center space-y-4 shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to Build Something Remarkable?
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto leading-relaxed">
            Let our team engineer, run, and scale high-performing acquisition campaigns for your brand.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-white text-purple-900 hover:bg-purple-50 transition-all shadow-lg"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
