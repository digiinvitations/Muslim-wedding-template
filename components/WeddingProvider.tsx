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
    const docRef = doc(db, "wedding", "main");
    
    // Subscribe to changes in the database in real-time
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setDataState(docSnap.data() as WeddingData);
      } else {
        // If not found in Firestore, initialize with local storage or default
        const saved = localStorage.getItem("weddingData");
        let initialData = defaultWeddingData;
        if (saved) {
          try {
            initialData = JSON.parse(saved);
          } catch (e) {
            console.error("Failed to parse local storage wedding data", e);
          }
        }
        
        setDoc(docRef, initialData).catch((err) => {
          console.error("Failed to initialize firestore document:", err);
        });
        setDataState(initialData);
      }
      setIsLoaded(true);
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
      // Fallback to local storage if Firestore fails
      const saved = localStorage.getItem("weddingData");
      if (saved) {
        try {
          setDataState(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse local storage wedding data", e);
        }
      }
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const setData = (newData: WeddingData | ((prev: WeddingData) => WeddingData)) => {
    setDataState((prev) => {
      const resolvedData = typeof newData === "function" ? newData(prev) : newData;
      
      // Save asynchronously to Firestore for global access
      const docRef = doc(db, "wedding", "main");
      setDoc(docRef, resolvedData).catch((err) => {
        console.error("Failed to update firestore wedding data:", err);
      });
      
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
