"use client";

import { useState, useRef, useEffect } from "react";
import { useWedding } from "@/components/WeddingProvider";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "lucide-react";
import NextLink from "next/link";
import InvitationContent from "@/components/invitation/InvitationContent";
import { formatImageUrl } from "@/lib/utils";

type AppState = "thumbnail" | "video" | "invitation";

export default function Home() {
  const { data } = useWedding();
  const [appState, setAppState] = useState<AppState>("thumbnail");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startVideo = () => {
    setAppState("video");
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleVideoEnd = () => {
    setAppState("invitation");
  };

  return (
    <main className="min-h-screen bg-white text-emerald-950 overflow-hidden relative font-sans selection:bg-[#d4af37] selection:text-white">
      {/* Background Audio */}
      <audio ref={audioRef} src={data.opening.musicUrl} loop />

      <AnimatePresence>
        {appState === "thumbnail" && (
          <div
            key="thumbnail"
            className="fixed inset-0 z-40 cursor-pointer"
            onClick={startVideo}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${formatImageUrl(data.opening.thumbnailUrl)})` }}
            />
          </div>
        )}

        {appState === "video" && (
          <div
            key="video"
            className="fixed inset-0 z-40 flex items-center justify-center"
          >
            <video
              src={data.opening.videoUrl}
              poster={data.opening.thumbnailUrl}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
            />
          </div>
        )}

      </AnimatePresence>

      {/* Main Invitation - Always rendered but opacity controlled or z-indexed */}
      <div 
        className={`relative z-10 transition-opacity duration-1000 ease-in-out ${
          appState === "invitation" ? "opacity-100" : "opacity-0 pointer-events-none h-screen overflow-hidden"
        }`}
      >
        {appState === "invitation" && <InvitationContent />}
      </div>
    </main>
  );
}
