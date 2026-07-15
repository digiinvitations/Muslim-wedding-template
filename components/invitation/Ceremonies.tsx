"use client";
import { formatImageUrl } from "@/lib/utils";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";
import { MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";

export default function Ceremonies() {
  const { data } = useWedding();
  const enabledCeremonies = data.ceremonies.filter(c => c.enabled);

  return (
    <section className="py-24 bg-white px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
      
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-32 h-40 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 border-l border-b border-[#d4af37]/30 rounded-bl-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-40 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 border-r border-t border-[#d4af37]/30 rounded-tr-[100px] pointer-events-none" />
      
      {/* Corner Diamonds */}
      <div className="absolute top-8 left-8 w-4 h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20 pointer-events-none opacity-80" />
      <div className="absolute top-10 left-10 w-2 h-2 bg-[#FFD700] rotate-45 shadow-[0_0_5px_rgba(255,215,0,0.8)] z-20 pointer-events-none" />
      
      <div className="absolute bottom-8 right-8 w-4 h-4 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20 pointer-events-none opacity-80" />
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-[#FFD700] rotate-45 shadow-[0_0_5px_rgba(255,215,0,0.8)] z-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[#FFD700]/10 rounded-[100px] blur-3xl -z-10" />
          <h2 className="text-3xl md:text-5xl font-serif tracking-wide bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm pb-2">
            Wedding Ceremonies
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
          </div>
        </motion.div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-12 px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {enabledCeremonies.map((ceremony, index) => (
            <motion.div
              key={ceremony.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`min-w-[90vw] md:min-w-[500px] lg:min-w-[600px] snap-center shrink-0 rounded-xl border border-[#d4af37]/30 backdrop-blur-sm relative overflow-hidden group hover:border-[#d4af37]/60 transition-colors shadow-sm ${
                ceremony.id === 'nikah' ? 'bg-gradient-to-br from-emerald-50 to-white shadow-[0_4px_30px_rgba(212,175,55,0.15)]' : 'bg-white'
              }`}
            >
              {ceremony.id === 'nikah' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-80 z-20" />
              )}
              
              <div className="w-full h-48 md:h-64 relative">
                {ceremony.thumbnailUrl && (
                  <Image 
                    src={formatImageUrl(ceremony.thumbnailUrl)}
                    alt={ceremony.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="text-3xl font-serif text-white">
                    {ceremony.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 relative z-10">
                <div className="flex-1 space-y-6">
                  <div className="space-y-4 text-emerald-900/80 font-light">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#b8860b]" />
                      <span>{ceremony.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#b8860b]" />
                      <span>{ceremony.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#b8860b]" />
                      <span>{ceremony.venue}</span>
                    </div>
                  </div>

                  {ceremony.mapUrl && (
                    <div className="pt-2">
                      <a 
                        href={ceremony.mapUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block px-8 py-3 rounded-full border border-[#d4af37] text-[#b8860b] hover:bg-[#d4af37] hover:text-white transition-colors tracking-widest text-sm uppercase"
                      >
                        Get Directions
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 h-48 md:h-full min-h-[200px] rounded-lg overflow-hidden border border-[#d4af37]/30 relative">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(ceremony.venue)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
