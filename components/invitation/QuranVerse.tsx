"use client";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";

export default function QuranVerse() {
  const { data } = useWedding();

  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50 relative px-4 flex justify-center items-center">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl text-center space-y-10 relative z-10"
      >
        <p className="text-3xl md:text-5xl font-arabic bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm leading-relaxed rtl py-4">
          {data.quranVerse.arabic}
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#FFD700]/70" />
          <div className="w-2 h-2 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#FFD700]/70" />
        </div>
        
        <p className="text-lg md:text-xl text-emerald-900/80 font-light italic leading-relaxed">
          &quot;{data.quranVerse.english}&quot;
        </p>
        
        <p className="text-emerald-800 tracking-widest text-sm uppercase font-medium">
          {data.quranVerse.reference}
        </p>
      </motion.div>
    </section>
  );
}
