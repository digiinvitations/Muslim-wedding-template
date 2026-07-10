"use client";
import { formatImageUrl } from "@/lib/utils";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";
import Image from "next/image";

export default function BrideGroomIntro() {
  const { data } = useWedding();

  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50 relative px-4">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] z-0" />
      
      <div className="max-w-5xl mx-auto relative z-10 space-y-24">
        {/* Groom Card */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_40px_rgba(212,175,55,0.2)] p-2 bg-white">
              <div className="relative w-full h-full rounded-t-full rounded-b-lg overflow-hidden">
                <Image 
                  src={formatImageUrl(data.couple.groomImage)} 
                  alt={data.hero.groomName}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-[#b8860b]">{data.hero.groomName}</h2>
            <p className="text-emerald-800/70 tracking-widest text-sm uppercase font-medium">Son of {data.couple.groomParents}</p>
            <p className="text-emerald-900/80 font-light leading-relaxed max-w-md mx-auto md:mx-0">
              {data.couple.groomIntro}
            </p>
          </div>
        </motion.div>

        {/* Decorative & Separator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center py-4"
        >
          <div className="w-16 h-16 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-white shadow-sm z-20">
            <span className="text-3xl font-serif text-[#b8860b]">&amp;</span>
          </div>
        </motion.div>

        {/* Bride Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row-reverse items-center gap-12"
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_40px_rgba(212,175,55,0.2)] p-2 bg-white">
              <div className="relative w-full h-full rounded-t-full rounded-b-lg overflow-hidden">
                <Image 
                  src={formatImageUrl(data.couple.brideImage)} 
                  alt={data.hero.brideName}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-right space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-[#b8860b]">{data.hero.brideName}</h2>
            <p className="text-emerald-800/70 tracking-widest text-sm uppercase font-medium">Daughter of {data.couple.brideParents}</p>
            <p className="text-emerald-900/80 font-light leading-relaxed max-w-md mx-auto md:mx-0 md:ml-auto">
              {data.couple.brideIntro}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
