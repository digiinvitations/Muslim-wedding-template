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
  <div className="flex items-center justify-center py-12 bg-white relative z-20">
    <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent to-[#d4af37]/50" />
    <div className="mx-4 text-[#d4af37]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" />
      </svg>
    </div>
    <div className="w-24 md:w-32 h-px bg-gradient-to-l from-transparent to-[#d4af37]/50" />
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
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 z-0" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl text-[#d4af37] font-serif font-light mb-4">
            JazakAllahu Khairan
          </h2>
          <p className="text-lg md:text-xl text-emerald-900/80 max-w-lg mx-auto font-light leading-relaxed">
            We look forward to celebrating this blessed occasion with you.
          </p>
          <div className="pt-8">
            <span className="text-[#d4af37] text-2xl">❤</span>
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
