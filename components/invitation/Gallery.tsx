"use client";
import { formatImageUrl } from "@/lib/utils";
import { useWedding } from "@/components/WeddingProvider";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const { data } = useWedding();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data.gallery || data.gallery.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % data.gallery.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);

  return (
    <section className="bg-gradient-to-b from-emerald-50 to-emerald-100 relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03]" />
      
      {/* Decorative Ornaments */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-16 h-16 md:w-24 md:h-24 border-t border-l border-transparent [border-image:linear-gradient(to_bottom_right,#B8860B,#FFD700,#B8860B)_1] rounded-tl-2xl opacity-60 pointer-events-none" />
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,215,0,0.5)] z-20" />
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 border-t border-r border-transparent [border-image:linear-gradient(to_bottom_left,#B8860B,#FFD700,#B8860B)_1] rounded-tr-2xl opacity-60 pointer-events-none" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,215,0,0.5)] z-20" />
      
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-24 md:h-24 border-b border-l border-transparent [border-image:linear-gradient(to_top_right,#B8860B,#FFD700,#B8860B)_1] rounded-bl-2xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_rgba(255,215,0,0.5)] z-20" />
      
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-24 md:h-24 border-b border-r border-transparent [border-image:linear-gradient(to_top_left,#B8860B,#FFD700,#B8860B)_1] rounded-br-2xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_rgba(255,215,0,0.5)] z-20" />

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-20 bg-[#FFD700]/10 rounded-full blur-2xl -z-10" />
          <h2 className="text-4xl md:text-5xl font-serif tracking-wide capitalize bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm pb-2">
            Togetherness
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-6 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
          </div>
        </motion.div>

        <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center w-full max-w-5xl mx-auto perspective-[1000px]">
          <AnimatePresence initial={false}>
            {data.gallery.map((src, index) => {
              let diff = index - currentIndex;
              const total = data.gallery.length;
              
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isCenter = diff === 0;
              const xOffset = diff * (typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 140); 
              const scale = isCenter ? 1 : Math.max(0.7, 1 - Math.abs(diff) * 0.15);
              const zIndex = 50 - Math.abs(diff);
              const opacity = Math.abs(diff) > 2 ? 0 : 1 - Math.abs(diff) * 0.25;

              return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      x: xOffset,
                      scale: scale,
                      zIndex: zIndex,
                      opacity: opacity,
                      rotateY: diff * -15
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className={`absolute w-[80vw] max-w-[320px] md:max-w-2xl h-[50vh] md:h-[60vh] rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(255,215,0,0.15)] origin-center p-[4px] md:p-[6px] bg-gradient-to-br from-[#B8860B] via-[#FFD700] to-[#B8860B] ${isCenter ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={() => {
                       if (diff < 0) prev();
                       if (diff > 0) next();
                    }}
                  >
                    <div className="w-full h-full relative flex items-center justify-center bg-emerald-950 rounded-[20px] overflow-hidden">
                       <Image
                         src={formatImageUrl(src)}
                         alt=""
                         fill
                         className="object-cover blur-2xl opacity-50 scale-125"
                         referrerPolicy="no-referrer"
                       />
                       <Image
                         src={formatImageUrl(src)}
                         alt={`Gallery image ${index + 1}`}
                         fill
                         className="object-contain z-10"
                         referrerPolicy="no-referrer"
                       />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
  
            <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-8 z-[60]">
              <button 
                onClick={prev}
                className="p-3 md:p-4 rounded-full bg-gradient-to-br from-[#B8860B] via-[#FFD700] to-[#B8860B] text-emerald-950 shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] hover:scale-110 transition-all z-20 relative"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 drop-shadow-md" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-8 z-[60]">
              <button 
                onClick={next}
                className="p-3 md:p-4 rounded-full bg-gradient-to-br from-[#B8860B] via-[#FFD700] to-[#B8860B] text-emerald-950 shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] hover:scale-110 transition-all z-20 relative"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 drop-shadow-md" />
              </button>
            </div>

        </div>
      </div>
    </section>
  );
}
