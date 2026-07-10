"use client";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";

export default function Family() {
  const { data } = useWedding();

  return (
    <section className="pt-12 pb-24 bg-white px-4 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
      
      {/* Family Section */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-emerald-900 font-serif tracking-wide mb-16"
        >
          With Best Compliments From
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
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
