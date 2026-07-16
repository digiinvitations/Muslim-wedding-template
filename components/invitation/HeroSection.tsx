"use client";
import { formatImageUrl } from "@/lib/utils";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";
import { MoonStar } from "lucide-react";

import Image from "next/image";

export default function HeroSection() {
  const { data } = useWedding();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50 to-emerald-100 text-center px-4 py-20">
      {/* Decorative Green Border */}
      <div className="absolute inset-4 md:inset-8 border border-emerald-800/40 pointer-events-none z-10 rounded-2xl" />
      <div className="absolute inset-[20px] md:inset-[38px] border-2 border-emerald-800/20 pointer-events-none z-10 rounded-xl" />

      {/* Ornate Corners */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 w-12 h-12 md:w-20 md:h-20 border-t-4 border-l-4 border-transparent [border-image:linear-gradient(to_bottom_right,#B8860B,#FFD700,#B8860B)_1] rounded-tl-xl opacity-80 z-10 pointer-events-none" />
      <div className="absolute top-8 left-8 md:top-14 md:left-14 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-[#d4af37] rounded-tl-lg opacity-60 z-10 pointer-events-none" />
      <div className="absolute top-6 left-6 md:top-10 md:left-10 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20" />
      
      <div className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-20 md:h-20 border-t-4 border-r-4 border-transparent [border-image:linear-gradient(to_bottom_left,#B8860B,#FFD700,#B8860B)_1] rounded-tr-xl opacity-80 z-10 pointer-events-none" />
      <div className="absolute top-8 right-8 md:top-14 md:right-14 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-[#d4af37] rounded-tr-lg opacity-60 z-10 pointer-events-none" />
      <div className="absolute top-6 right-6 md:top-10 md:right-10 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20" />
      
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-12 h-12 md:w-20 md:h-20 border-b-4 border-l-4 border-transparent [border-image:linear-gradient(to_top_right,#B8860B,#FFD700,#B8860B)_1] rounded-bl-xl opacity-80 z-10 pointer-events-none" />
      <div className="absolute bottom-8 left-8 md:bottom-14 md:left-14 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-[#d4af37] rounded-bl-lg opacity-60 z-10 pointer-events-none" />
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 -translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20" />
      
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-20 md:h-20 border-b-4 border-r-4 border-transparent [border-image:linear-gradient(to_top_left,#B8860B,#FFD700,#B8860B)_1] rounded-br-xl opacity-80 z-10 pointer-events-none" />
      <div className="absolute bottom-8 right-8 md:bottom-14 md:right-14 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-[#d4af37] rounded-br-lg opacity-60 z-10 pointer-events-none" />
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20" />

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03]" />
        {/* Silhouette or Pattern */}
        <div className="absolute bottom-0 w-full h-[40vh] bg-[url('https://picsum.photos/seed/mosquewhite/1920/800')] bg-cover bg-bottom opacity-[0.05] mix-blend-multiply" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-3xl mx-auto space-y-8 flex flex-col items-center"
      >
        <motion.div 
          animate={{ scale: [1, 1.15, 1] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center items-center mb-6"
        >
          {data.hero.iconUrl ? (
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image 
                src={formatImageUrl(data.hero.iconUrl)} 
                alt="Hero Icon" 
                fill 
                className="object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <MoonStar className="w-16 h-16 text-[#d4af37]" strokeWidth={1} />
          )}
        </motion.div>

        <p className="text-xl md:text-2xl text-emerald-900 font-serif tracking-[0.2em]">
          Bismillah-ir-Rahman-ir-Rahim
        </p>
        
        <p className="text-sm md:text-base text-emerald-800/70 tracking-widest uppercase mt-4 font-medium">
          Together with the blessings of Allah
        </p>
        
        <p className="text-md md:text-lg text-emerald-900/90 font-light mt-2">
          We cordially invite you for the Nikah Ceremony of
        </p>

        <div className="py-12 space-y-6 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-serif font-light bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm">
            {data.hero.groomName.split(' ')[0]}
          </h1>
          <span className="text-emerald-800/40 text-3xl">❤</span>
          <h1 className="text-6xl md:text-8xl font-serif font-light bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm">
            {data.hero.brideName.split(' ')[0]}
          </h1>
        </div>

        <div className="pt-8">
          <p className="text-2xl md:text-3xl text-emerald-900 font-serif italic border-t border-[#d4af37]/30 pt-8 inline-block px-12">
            &quot;In Sha Allah&quot;
          </p>
        </div>
      </motion.div>
    </section>
  );
}
