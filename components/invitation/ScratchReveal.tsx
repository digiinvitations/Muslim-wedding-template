"use client";
import { useEffect, useRef, useState } from "react";
import { useWedding } from "@/components/WeddingProvider";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

export default function ScratchReveal() {
  const { data } = useWedding();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const triggerCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#d4af37', '#ffffff', '#064e3b']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#d4af37', '#ffffff', '#064e3b']
      });
    }, 250);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    } else {
      canvas.width = 300;
      canvas.height = 150;
    }

    // Fill with gold pattern/color
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some noise/texture to make it look like foil
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "#c5a028" : "#e4c256";
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    
    ctx.font = "20px serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText("Scratch Here", canvas.width / 2, canvas.height / 2 + 6);

    let isDrawing = false;
    let scratchedArea = 0;
    const totalArea = canvas.width * canvas.height;

    const getMousePos = (evt: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if ('touches' in evt) {
        clientX = evt.touches[0].clientX;
        clientY = evt.touches[0].clientY;
      } else {
        clientX = (evt as MouseEvent).clientX;
        clientY = (evt as MouseEvent).clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Rough estimation of scratched area
      scratchedArea += Math.PI * 20 * 20;
      
      // If scratched more than 40%, reveal
      if (!isRevealed && scratchedArea > totalArea * 0.4) {
        setIsRevealed(true);
        triggerCelebration();
        canvas.style.transition = "opacity 0.5s";
        canvas.style.opacity = "0";
        setTimeout(() => {
          canvas.style.display = "none";
        }, 500);
      }
    };

    const handleStart = (evt: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const pos = getMousePos(evt);
      scratch(pos.x, pos.y);
    };

    const handleMove = (evt: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      evt.preventDefault();
      const pos = getMousePos(evt);
      scratch(pos.x, pos.y);
    };

    const handleEnd = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);

    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
    };
  }, [isRevealed]);

  const dateObj = new Date(data.hero.date);
  const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const dayName = dateObj.toLocaleDateString('en-GB', { weekday: 'long' });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!isRevealed) return;
    
    const targetDate = new Date(data.hero.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data.hero.date, isRevealed]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 bg-emerald-50 flex flex-col items-center justify-center relative px-4">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-2xl md:text-3xl text-emerald-900 font-serif mb-4 tracking-widest">
          Scratch To Reveal Our Nikah Date
        </h2>
      </motion.div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-sm h-48 md:h-64 rounded-xl shadow-[0_0_40px_rgba(212,175,55,0.2)] overflow-hidden bg-emerald-50 border border-[#d4af37]/50 flex flex-col items-center justify-center p-6 z-10"
      >
        {/* Hidden Date */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
          <p className="text-[#b8860b] tracking-[0.2em] uppercase text-sm font-medium">The Big Day</p>
          <h3 className="text-3xl md:text-4xl text-emerald-900 font-serif">{formattedDate}</h3>
          <p className="text-xl text-emerald-800 italic font-serif">{dayName}</p>
        </div>
        
        {/* Scratch Canvas Overlay */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-10 cursor-pointer touch-none"
        />
      </div>

      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-4 md:gap-8 z-10"
        >
          {units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-emerald-50 border border-[#d4af37]/30 flex items-center justify-center shadow-sm">
                <span className="text-2xl md:text-3xl font-serif text-[#b8860b]">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="mt-3 text-emerald-800 tracking-widest text-[10px] md:text-xs uppercase font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
