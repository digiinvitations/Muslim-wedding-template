"use client";
import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { formatImageUrl } from "@/lib/utils";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
}

export default function ImageUploader({ label, value, onChange, accept = "image/*" }: ImageUploaderProps) {
  const [mode, setMode] = useState<"link" | "upload">("link");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getLabelText = () => {
    if (accept.startsWith("video/")) return "video file (.mp4)";
    if (accept.startsWith("audio/")) return "audio file (.mp3)";
    return "image";
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(20);

    if (file.type.startsWith("image/")) {
      // Compress image
      const img = document.createElement("img");
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          
          // Max width/height
          const MAX_SIZE = 600;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with lower quality (0.5)
          const base64String = canvas.toDataURL("image/jpeg", 0.5);
          onChange(base64String);
          setIsUploading(false);
          setProgress(100);
        };
      };
      reader.onerror = () => {
        console.error("Failed to read file");
        setIsUploading(false);
        setProgress(0);
      };
      reader.readAsDataURL(file);
    } else {
      // For audio/video just read as data URL (might still be large, but usually we prefer URLs for these)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
        setIsUploading(false);
        setProgress(100);
      };
      reader.onerror = () => {
        console.error("Failed to read file");
        setIsUploading(false);
        setProgress(0);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <label className="text-sm text-slate-400">{label}</label>
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => setMode("link")}
            className={`px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              mode === "link" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <LinkIcon className="w-3 h-3" /> Link
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              mode === "upload" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <Upload className="w-3 h-3" /> Upload
          </button>
        </div>
      </div>

      {mode === "link" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm"
        />
      ) : (
        <div className="flex items-center gap-4">
          {value && value.length > 0 ? (
            <div className="w-16 h-16 rounded overflow-hidden bg-slate-800 shrink-0 relative border border-slate-700 flex items-center justify-center">
              {accept.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formatImageUrl(value)} alt="Preview" className="w-full h-full object-cover" />
              ) : accept.startsWith("video/") ? (
                <span className="text-emerald-500 text-xs font-mono font-bold">VIDEO</span>
              ) : accept.startsWith("audio/") ? (
                <span className="text-emerald-500 text-xs font-mono font-bold">AUDIO</span>
              ) : (
                <ImageIcon className="w-6 h-6 text-slate-500" />
              )}
            </div>
          ) : null}
          <div className="flex-1">
            <input
              type="file"
              accept={accept}
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`w-full bg-slate-950 border ${isUploading ? "border-emerald-500/50" : "border-slate-800 border-dashed"} rounded-lg px-4 py-4 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors flex flex-col items-center justify-center gap-2 text-sm`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                  <span className="text-emerald-500">Uploading... {Math.round(progress)}%</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Click to select {getLabelText()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
