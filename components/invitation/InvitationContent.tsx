"use client";

import { useWedding } from "@/components/WeddingProvider";
import HeroSection from "./HeroSection";
import ScratchReveal from "./ScratchReveal";
import BrideGroomIntro from "./BrideGroomIntro";
import Ceremonies from "./Ceremonies";
import QuranVerse from "./QuranVerse";
import Dua from "./Dua";
import Family from "./Family";
import Gallery from "./Gallery";
import RSVP from "./RSVP";

import { MoonStar } from "lucide-react";
import NextLink from "next/link";

const Divider = () => (
  <div className="flex items-center justify-center py-16 bg-emerald-50 relative z-20 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
    <div className="w-24 md:w-48 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-[#FFD700]/10" />
    <div className="mx-6 text-[#FFD700] flex items-center gap-2 relative drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#FFD700]/20 rounded-full blur-md" />
      <span className="text-xl">✧</span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="animate-[spin_20s_linear_infinite]">
        <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" />
      </svg>
      <span className="text-xl">✧</span>
    </div>
    <div className="w-24 md:w-48 h-[2px] bg-gradient-to-l from-transparent via-[#FFD700]/60 to-[#FFD700]/10" />
  </div>
);

export default function InvitationContent() {
  const { data } = useWedding();

  return (
    <div className="w-full">
      <HeroSection />
      <Divider />
      <ScratchReveal />
      <Divider />
      <BrideGroomIntro />
      <Divider />
      <Ceremonies />
      <Divider />
      <QuranVerse />
      <Divider />
      <Dua />
      <Divider />
      <Gallery />
      <Divider />
      <Family />
      <Divider />
      <RSVP />
      
      {/* Thank You / Outro */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-emerald-50 to-emerald-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 z-0" />
        <div className="relative z-10 space-y-6">
          <div className="relative inline-block mb-4">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-20 bg-[#FFD700]/10 rounded-full blur-2xl -z-10" />
             <h2 className="text-4xl md:text-5xl font-serif font-light bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm">
               JazakAllahu Khairan
             </h2>
          </div>
          <p className="text-lg md:text-xl text-emerald-900/80 max-w-lg mx-auto font-light leading-relaxed">
            We look forward to celebrating this blessed occasion with you.
          </p>
          <div className="pt-8">
            <span className="text-transparent bg-gradient-to-br from-[#B8860B] via-[#FFD700] to-[#B8860B] bg-clip-text text-2xl drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]">❤</span>
          </div>
        </div>
      </section>
      
      {/* Footer / Admin Links */}
      <footer className="bg-emerald-950 py-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <NextLink href="/admin">
            <span className="text-emerald-900/50 hover:text-[#d4af37] transition-colors text-xs tracking-wider cursor-pointer font-serif flex items-center gap-1">
              Admin Panel
            </span>
          </NextLink>
        </div>
      </footer>
    </div>
  );
}
