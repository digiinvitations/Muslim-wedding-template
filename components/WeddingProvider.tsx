"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { WeddingData } from "@/lib/types";
import { defaultWeddingData } from "@/lib/defaultData";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

interface WeddingContextType {
  data: WeddingData;
  setData: (newData: WeddingData | ((prev: WeddingData) => WeddingData)) => void;
  resetToDefault: () => void;
  isLoaded: boolean;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<WeddingData>(defaultWeddingData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let initialLoadCount = 0;
    const handleLoad = () => {
      initialLoadCount++;
      if (initialLoadCount >= 3) {
        setIsLoaded(true);
      }
    };

    const mainRef = doc(db, "wedding", "main");
    const ceremoniesRef = doc(db, "wedding", "ceremonies");
    const galleryRef = doc(db, "wedding", "gallery");
    
    // Subscribe to changes in the database in real-time
    const unsubMain = onSnapshot(mainRef, (docSnap) => {
      if (docSnap.exists()) {
        setDataState(prev => ({ ...prev, ...docSnap.data() }));
      } else {
        // Initialize main
        setDoc(mainRef, {
          opening: defaultWeddingData.opening,
          hero: defaultWeddingData.hero,
          couple: defaultWeddingData.couple,
          journey: defaultWeddingData.journey,
          quranVerse: defaultWeddingData.quranVerse,
          dua: defaultWeddingData.dua,
          family: defaultWeddingData.family,
          venue: defaultWeddingData.venue,
          theme: defaultWeddingData.theme,
        }).catch(console.error);
      }
      handleLoad();
    }, (error) => {
      console.error("Firestore onSnapshot error (main):", error);
      handleLoad();
    });

    const unsubCeremonies = onSnapshot(ceremoniesRef, (docSnap) => {
      if (docSnap.exists()) {
        setDataState(prev => ({ ...prev, ceremonies: docSnap.data().ceremonies }));
      } else {
        setDoc(ceremoniesRef, { ceremonies: defaultWeddingData.ceremonies }).catch(console.error);
      }
      handleLoad();
    }, (error) => {
      console.error("Firestore onSnapshot error (ceremonies):", error);
      handleLoad();
    });

    const unsubGallery = onSnapshot(galleryRef, (docSnap) => {
      if (docSnap.exists()) {
        setDataState(prev => ({ ...prev, gallery: docSnap.data().gallery }));
      } else {
        setDoc(galleryRef, { gallery: defaultWeddingData.gallery }).catch(console.error);
      }
      handleLoad();
    }, (error) => {
      console.error("Firestore onSnapshot error (gallery):", error);
      handleLoad();
    });

    // Fallback to local storage if needed on first load
    const saved = localStorage.getItem("weddingData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Defer local storage fallback state update to avoid synchronous state update in effect warning
        setTimeout(() => {
          setDataState(prev => ({ ...prev, ...parsed }));
        }, 0);
      } catch (e) {
        console.error("Failed to parse local storage wedding data", e);
      }
    }

    return () => {
      unsubMain();
      unsubCeremonies();
      unsubGallery();
    };
  }, []);

  const setData = (newData: WeddingData | ((prev: WeddingData) => WeddingData)) => {
    setDataState((prev) => {
      const resolvedData = typeof newData === "function" ? newData(prev) : newData;
      
      // Save asynchronously to Firestore for global access (split to avoid 1MB limit)
      const mainRef = doc(db, "wedding", "main");
      const ceremoniesRef = doc(db, "wedding", "ceremonies");
      const galleryRef = doc(db, "wedding", "gallery");
      
      const { ceremonies, gallery, ...mainData } = resolvedData;

      setDoc(mainRef, mainData).catch(console.error);
      setDoc(ceremoniesRef, { ceremonies }).catch(console.error);
      setDoc(galleryRef, { gallery }).catch(console.error);
      
      localStorage.setItem("weddingData", JSON.stringify(resolvedData));
      return resolvedData;
    });
  };

  const resetToDefault = () => {
    setData(defaultWeddingData);
  };

  return (
    <WeddingContext.Provider value={{ data, setData, resetToDefault, isLoaded }}>
      {!isLoaded && (
        <div className="fixed inset-0 bg-[#0f172a] flex items-center justify-center z-50">
          <div className="text-[#d4af37] font-serif text-lg tracking-wider animate-pulse">
            Loading...
          </div>
        </div>
      )}
      <div className={!isLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error("useWedding must be used within a WeddingProvider");
  }
  return context;
}
