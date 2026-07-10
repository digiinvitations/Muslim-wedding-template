"use client";

import { useWedding } from "@/components/WeddingProvider";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Save, ArrowLeft, RefreshCw, Trash2, Plus, Calendar, Phone, Users, MessageSquare } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const { data, setData, resetToDefault } = useWedding();
  const [activeTab, setActiveTab] = useState("general");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const q = query(collection(db, "rsvps"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setRsvps(list);
    }, (err) => {
      console.error("Failed to fetch RSVPs from Firestore:", err);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleDeleteRSVP = async (id: string) => {
    if (confirm("Are you sure you want to delete this RSVP?")) {
      try {
        await deleteDoc(doc(db, "rsvps", id));
      } catch (err) {
        console.error("Failed to delete RSVP:", err);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "426098") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans">
        <form onSubmit={handleLogin} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-slate-400 text-sm">Please enter the master admin password.</p>
          </div>
          
          <div className="space-y-2">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-center text-white focus:outline-none focus:border-emerald-500 tracking-widest"
              autoFocus
            />
            {authError && <p className="text-red-400 text-xs text-center">{authError}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
          >
            Unlock Admin Panel
          </button>
        </form>
      </div>
    );
  }

  const handleSave = () => {
    setSaveStatus("saving");
    // Actually Context is auto-saving to localStorage in our Provider via useEffect, 
    // but this gives visual feedback.
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 500);
  };

  const handleChange = (section: string, field: string, value: any) => {
    setData(prev => {
      if (section === "hero") {
        return { ...prev, hero: { ...prev.hero, [field]: value } };
      }
      if (section === "opening") {
        return { ...prev, opening: { ...prev.opening, [field]: value } };
      }
      if (section === "couple") {
        return { ...prev, couple: { ...prev.couple, [field]: value } };
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Invitation Builder</h1>
            <p className="text-slate-400 text-sm">Manage your interactive luxury invitation.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={resetToDefault}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-900/40 transition-colors border border-red-900/50 text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 text-sm">
                <ArrowLeft className="w-4 h-4" /> Preview
              </button>
            </Link>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors text-sm font-medium"
            >
              <Save className="w-4 h-4" /> 
              {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
              {[
                { id: "general", label: "General Settings" },
                { id: "opening", label: "Opening Experience" },
                { id: "couple", label: "Bride & Groom" },
                { id: "ceremonies", label: "Ceremonies" },
                { id: "gallery", label: "Moments" },
                { id: "rsvps", label: "RSVP Responses" },
              ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id 
                    ? "bg-emerald-900/40 border border-emerald-800/50 text-emerald-400" 
                    : "hover:bg-slate-800 text-slate-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="md:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
            {activeTab === "general" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">General Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Groom Name</label>
                    <input 
                      type="text" 
                      value={data.hero.groomName}
                      onChange={(e) => handleChange("hero", "groomName", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Bride Name</label>
                    <input 
                      type="text" 
                      value={data.hero.brideName}
                      onChange={(e) => handleChange("hero", "brideName", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Nikah Date & Time</label>
                    <input 
                      type="datetime-local" 
                      value={data.hero.date.slice(0, 16)} // quick hack for datetime-local format
                      onChange={(e) => handleChange("hero", "date", e.target.value + ":00Z")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-6 md:col-span-2">
                    <ImageUploader 
                      label="Hero Icon Image (Optional override for Bismillah/default icon)" 
                      value={data.hero.iconUrl || ""} 
                      onChange={(val) => handleChange("hero", "iconUrl", val)} 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "opening" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">Opening Experience</h2>
                <div className="space-y-6">
                  <ImageUploader 
                    label="Thumbnail Image" 
                    value={data.opening.thumbnailUrl} 
                    onChange={(val) => handleChange("opening", "thumbnailUrl", val)} 
                  />
                  <ImageUploader 
                    label="Cinematic Video (.mp4)" 
                    value={data.opening.videoUrl} 
                    onChange={(val) => handleChange("opening", "videoUrl", val)} 
                    accept="video/*"
                  />
                  <ImageUploader 
                    label="Background Music (.mp3)" 
                    value={data.opening.musicUrl} 
                    onChange={(val) => handleChange("opening", "musicUrl", val)} 
                    accept="audio/*"
                  />
                </div>
              </div>
            )}

            {activeTab === "couple" && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">Bride & Groom Details</h2>
                
                <div className="space-y-6">
                  <h3 className="text-lg text-emerald-400">Groom</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6 md:col-span-2">
                      <ImageUploader 
                        label="Groom Photo" 
                        value={data.couple.groomImage} 
                        onChange={(val) => handleChange("couple", "groomImage", val)} 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm text-slate-400">Parents Name</label>
                      <input 
                        type="text" 
                        value={data.couple.groomParents}
                        onChange={(e) => handleChange("couple", "groomParents", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm text-slate-400">Introduction</label>
                      <textarea 
                        rows={3}
                        value={data.couple.groomIntro}
                        onChange={(e) => handleChange("couple", "groomIntro", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-800" />

                <div className="space-y-6">
                  <h3 className="text-lg text-emerald-400">Bride</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6 md:col-span-2">
                      <ImageUploader 
                        label="Bride Photo" 
                        value={data.couple.brideImage} 
                        onChange={(val) => handleChange("couple", "brideImage", val)} 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm text-slate-400">Parents Name</label>
                      <input 
                        type="text" 
                        value={data.couple.brideParents}
                        onChange={(e) => handleChange("couple", "brideParents", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm text-slate-400">Introduction</label>
                      <textarea 
                        rows={3}
                        value={data.couple.brideIntro}
                        onChange={(e) => handleChange("couple", "brideIntro", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ceremonies" && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">Ceremonies</h2>
                <div className="space-y-6">
                  {data.ceremonies.map((ceremony, idx) => (
                    <div key={ceremony.id} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg text-emerald-400 font-medium">{ceremony.name}</h3>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={ceremony.enabled}
                            onChange={(e) => {
                              const newCeremonies = [...data.ceremonies];
                              newCeremonies[idx].enabled = e.target.checked;
                              setData(prev => ({ ...prev, ceremonies: newCeremonies }));
                            }}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-950"
                          />
                          <span className="text-sm text-slate-400">Enabled</span>
                        </label>
                      </div>
                      
                      {ceremony.enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs text-slate-400">Date</label>
                            <input 
                              type="text" 
                              value={ceremony.date}
                              onChange={(e) => {
                                const newCeremonies = [...data.ceremonies];
                                newCeremonies[idx].date = e.target.value;
                                setData(prev => ({ ...prev, ceremonies: newCeremonies }));
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-slate-400">Time</label>
                            <input 
                              type="text" 
                              value={ceremony.time}
                              onChange={(e) => {
                                const newCeremonies = [...data.ceremonies];
                                newCeremonies[idx].time = e.target.value;
                                setData(prev => ({ ...prev, ceremonies: newCeremonies }));
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-xs text-slate-400">Venue</label>
                            <input 
                              type="text" 
                              value={ceremony.venue}
                              onChange={(e) => {
                                const newCeremonies = [...data.ceremonies];
                                newCeremonies[idx].venue = e.target.value;
                                setData(prev => ({ ...prev, ceremonies: newCeremonies }));
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-xs text-slate-400">Map Embed/Link URL</label>
                            <input 
                              type="text" 
                              value={ceremony.mapUrl}
                              onChange={(e) => {
                                const newCeremonies = [...data.ceremonies];
                                newCeremonies[idx].mapUrl = e.target.value;
                                setData(prev => ({ ...prev, ceremonies: newCeremonies }));
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <ImageUploader 
                              label="Thumbnail Image" 
                              value={ceremony.thumbnailUrl || ""}
                              onChange={(val) => {
                                const newCeremonies = [...data.ceremonies];
                                newCeremonies[idx].thumbnailUrl = val;
                                setData(prev => ({ ...prev, ceremonies: newCeremonies }));
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "gallery" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-semibold text-white">Moments (Gallery)</h2>
                  <button 
                    onClick={() => setData(prev => ({ ...prev, gallery: [...prev.gallery, ""] }))}
                    className="flex items-center gap-1 text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Photo
                  </button>
                </div>
                <div className="space-y-6">
                  {data.gallery.map((photo, idx) => (
                    <div key={idx} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-400 font-medium">Photo {idx + 1}</span>
                        <button 
                          onClick={() => {
                            const newGallery = [...data.gallery];
                            newGallery.splice(idx, 1);
                            setData(prev => ({ ...prev, gallery: newGallery }));
                          }}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <ImageUploader 
                        label="Photo URL/Upload" 
                        value={photo}
                        onChange={(val) => {
                          const newGallery = [...data.gallery];
                          newGallery[idx] = val;
                          setData(prev => ({ ...prev, gallery: newGallery }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "rsvps" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-semibold text-white">RSVP Responses ({rsvps.length})</h2>
                  <div className="text-sm text-slate-400 font-mono">
                    Total Guests: {rsvps.reduce((acc, r) => acc + (r.guests || 1), 0)}
                  </div>
                </div>
                {rsvps.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 bg-slate-950 rounded-xl border border-slate-800/50 font-serif">
                    No RSVPs submitted yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rsvps.map((rsvp) => (
                      <div key={rsvp.id} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 relative">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-lg font-medium text-white flex items-center gap-2">
                              {rsvp.name}
                              <span className="text-xs bg-emerald-900/40 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded-full font-mono">
                                {rsvp.guests} {rsvp.guests === 1 ? "Guest" : "Guests"}
                              </span>
                            </h3>
                            <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                              <Phone className="w-3.5 h-3.5 text-[#d4af37]" /> {rsvp.phone}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteRSVP(rsvp.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1"
                            title="Delete Response"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {rsvp.message && (
                          <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-slate-300 text-sm flex items-start gap-2.5">
                            <MessageSquare className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                            <p className="italic font-light">&ldquo;{rsvp.message}&rdquo;</p>
                          </div>
                        )}
                        {rsvp.timestamp && (
                          <p className="text-[10px] text-slate-600 font-mono text-right">
                            Submitted: {rsvp.timestamp.toDate ? rsvp.timestamp.toDate().toLocaleString() : (rsvp.timestamp.seconds ? new Date(rsvp.timestamp.seconds * 1000).toLocaleString() : new Date(rsvp.timestamp).toLocaleString())}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
