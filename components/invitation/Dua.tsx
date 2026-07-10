"use client";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";

export default function Dua() {
  const { data } = useWedding();

  return (
    <section className="pt-24 pb-12 bg-white px-4 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
      
      {/* Dua Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center bg-emerald-50/50 p-10 md:p-16 rounded-2xl border border-[#d4af37]/40 shadow-sm relative z-10"
      >
        <h2 className="text-2xl md:text-3xl text-emerald-900 font-serif mb-8">A Humble Request</h2>
        <p className="text-emerald-900/80 font-light text-lg md:text-xl leading-relaxed italic">
          &quot;{data.dua}&quot;
        </p>
      </motion.div>
    </section>
  );
}
