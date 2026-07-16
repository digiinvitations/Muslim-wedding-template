"use client";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";

export default function Dua() {
  const { data } = useWedding();

  return (
    <section className="pt-24 pb-12 bg-emerald-50 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
      
      {/* Dua Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center bg-emerald-50/50 p-10 md:p-16 rounded-2xl border border-transparent [background:linear-gradient(#ecfdf5,#ecfdf5)_padding-box,linear-gradient(to_bottom_right,#B8860B,#FFD700,#B8860B)_border-box] shadow-[0_10px_40px_rgba(255,215,0,0.1)] relative z-10"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 border-l border-b border-[#FFD700]/30 rounded-bl-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 border-r border-t border-[#FFD700]/30 rounded-tr-[60px] pointer-events-none" />

        <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20" />

        <div className="relative inline-block mb-8">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 bg-[#FFD700]/10 rounded-full blur-xl -z-10" />
           <h2 className="text-2xl md:text-3xl font-serif bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm pb-1">
             A Humble Request
           </h2>
        </div>
        <p className="text-emerald-900/80 font-light text-lg md:text-xl leading-relaxed italic relative z-10">
          &quot;{data.dua}&quot;
        </p>
      </motion.div>
    </section>
  );
}
