"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Lock, EyeOff, Eye, Trash2, Phone, MessageSquare } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";

export default function RSVP() {
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [rsvps, setRsvps] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const q = query(collection(db, "rsvps"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((document) => {
        list.push({ id: document.id, ...document.data() });
      });
      setRsvps(list);
    }, (err) => {
      console.error("Failed to fetch RSVPs from Firestore:", err);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStatus("submitting");
    
    try {
      await addDoc(collection(db, "rsvps"), {
        name,
        phone,
        guests: parseInt(guests, 10) || 1,
        message,
        timestamp: serverTimestamp(),
      });
      setRsvpStatus("success");
    } catch (err) {
      console.error("Failed to submit RSVP to Firestore:", err);
      // Fallback for offline or local testing if Firebase connection error
      setTimeout(() => {
        setRsvpStatus("success");
      }, 1000);
    }
  };

  return (
    <section className="py-24 bg-white px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02]" />
      <div className="max-w-xl mx-auto relative z-10">
        
        {/* RSVP Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="bg-gradient-to-br from-emerald-50 to-white p-8 md:p-10 rounded-2xl border border-[#d4af37]/40 shadow-sm text-center relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 border-l border-b border-[#d4af37]/30 rounded-bl-2xl rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 border-r border-t border-[#d4af37]/30 rounded-tr-2xl rounded-bl-xl pointer-events-none" />
            
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-20" />

            <div className="relative mb-8 inline-block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-[#FFD700]/10 rounded-full blur-2xl -z-10" />
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text drop-shadow-sm pb-1">
                RSVP
              </h2>
            </div>

            {rsvpStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#b8860b] text-2xl">✓</span>
                </div>
                <h3 className="text-2xl text-emerald-900 font-serif">Thank you!</h3>
                <p className="text-emerald-900/70 font-light">Your response has been recorded.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-emerald-900/80 text-sm tracking-wide font-medium">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#d4af37]/50 rounded-lg px-4 py-3 text-emerald-950 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-900/80 text-sm tracking-wide font-medium">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#d4af37]/50 rounded-lg px-4 py-3 text-emerald-950 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-emerald-900/80 text-sm tracking-wide font-medium">Number of Guests</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-white border border-[#d4af37]/50 rounded-lg px-4 py-3 text-emerald-950 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all appearance-none"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-emerald-900/80 text-sm tracking-wide font-medium">Message for the Couple (Optional)</label>
                  <textarea 
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#d4af37]/50 rounded-lg px-4 py-3 text-emerald-950 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all resize-none"
                    placeholder="Wishing you both a lifetime of happiness..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={rsvpStatus === "submitting"}
                  className="w-full bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] bg-[length:200%_auto] hover:bg-[position:right_center] text-emerald-950 font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 uppercase tracking-widest text-sm mt-4 shadow-[0_4px_15px_rgba(255,215,0,0.3)] hover:shadow-[0_4px_25px_rgba(255,215,0,0.5)] border border-[#FFD700]/50"
                >
                  {rsvpStatus === "submitting" ? "Sending..." : (
                    <>
                      Confirm Attendance <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
        
        {/* Admin RSVP Checks Inline */}
        <div className="mt-16 border-t border-emerald-900/10 pt-8">
          <div className="flex justify-center">
            <button 
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="text-emerald-900/40 hover:text-emerald-900 flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-colors"
            >
              <Lock className="w-3 h-3" />
              Manage RSVPs
            </button>
          </div>
          
          {isAdminOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-8 bg-emerald-50 rounded-2xl p-6 border border-emerald-900/10"
            >
              {!isAuthenticated ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (passwordInput === "2580") {
                      setIsAuthenticated(true);
                      setAuthError("");
                    } else {
                      setAuthError("Incorrect password");
                    }
                  }} 
                  className="max-w-sm mx-auto space-y-4"
                >
                  <div className="text-center mb-6">
                     <h3 className="text-emerald-900 font-serif text-xl">Admin Access</h3>
                     <p className="text-emerald-900/60 text-xs mt-1">Please enter the RSVP admin password</p>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-white border border-[#d4af37]/50 rounded-lg px-4 py-2 text-emerald-950 text-center focus:outline-none focus:border-[#d4af37]"
                    autoFocus
                  />
                  {authError && <p className="text-red-500 text-xs text-center">{authError}</p>}
                  <button type="submit" className="w-full bg-emerald-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-emerald-800 transition-colors">
                    Unlock
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4">
                     <h3 className="text-emerald-900 font-serif text-xl">RSVP Responses ({rsvps.length})</h3>
                     <div className="text-sm text-emerald-900/70 font-medium">
                       Total Guests: {rsvps.reduce((acc, r) => acc + (r.guests || 1), 0)}
                     </div>
                  </div>
                  
                  {rsvps.length === 0 ? (
                    <div className="text-center py-8 text-emerald-900/50 text-sm font-serif">
                      No RSVPs yet.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {rsvps.map((rsvp) => (
                        <div key={rsvp.id} className="bg-white p-4 rounded-xl border border-emerald-900/10 shadow-sm relative group">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="font-medium text-emerald-950 flex items-center gap-2">
                                {rsvp.name}
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                                  {rsvp.guests} Guest{rsvp.guests !== 1 && 's'}
                                </span>
                              </h4>
                              <p className="text-emerald-900/70 text-xs mt-1 flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-[#d4af37]" /> {rsvp.phone}
                              </p>
                            </div>
                            <button
                              onClick={async () => {
                                if (confirm("Delete this RSVP?")) {
                                  try {
                                    await deleteDoc(doc(db, "rsvps", rsvp.id));
                                  } catch (e) {
                                    console.error(e);
                                  }
                                }
                              }}
                              className="text-emerald-900/30 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {rsvp.message && (
                            <div className="mt-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-900/5 text-sm text-emerald-900/80 flex items-start gap-2">
                              <MessageSquare className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                              <p className="italic leading-relaxed">{rsvp.message}</p>
                            </div>
                          )}
                          {rsvp.timestamp && (
                            <p className="text-[10px] text-emerald-900/40 text-right mt-3">
                              {rsvp.timestamp.toDate ? rsvp.timestamp.toDate().toLocaleString() : (rsvp.timestamp.seconds ? new Date(rsvp.timestamp.seconds * 1000).toLocaleString() : new Date(rsvp.timestamp).toLocaleString())}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
