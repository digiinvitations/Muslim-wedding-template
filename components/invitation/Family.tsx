"use client";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";

export default function Family() {
  const { data } = useWedding();

  return (
    <section className="pt-12 pb-24 bg-emerald-50 px-4 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
      
      {/* Family Section */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-16 inline-block"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-20 bg-[#FFD700]/10 rounded-full blur-2xl -z-10" />
          <h2 className="text-3xl md:text-5xl font-serif tracking-wide bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm pb-2">
            With Best Compliments From
          </h2>
          <div className="flex justify-center mt-4">
             <div className="w-2 h-2 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent -translate-x-1/2" />
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.8)] z-10" />
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl text-[#b8860b] border-b border-[#d4af37]/30 pb-4 uppercase tracking-widest font-medium">
              Bride&apos;s Family
            </h3>
            <ul className="space-y-3 text-emerald-900/80 font-light text-lg">
              {data.family.brideFamily.map((member, i) => (
                <li key={i}>{member}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl text-[#b8860b] border-b border-[#d4af37]/30 pb-4 uppercase tracking-widest font-medium">
              Groom&apos;s Family
            </h3>
            <ul className="space-y-3 text-emerald-900/80 font-light text-lg">
              {data.family.groomFamily.map((member, i) => (
                <li key={i}>{member}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
