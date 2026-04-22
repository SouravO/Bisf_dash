import React from "react";
import { ArrowRight } from "lucide-react";

interface StartJourneyButtonProps {
  onClick: () => void;
  className?: string;
}

export default function StartJourneyButton({ onClick, className = "" }: StartJourneyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#2B2E7E] text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-[#1a1c4b] shadow-[0_15px_40px_-10px_rgba(43,46,126,0.6)] hover:-translate-y-1 ${className}`}
    >
      <span>Start Your Journey</span>
      <div className="bg-white/20 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
        <ArrowRight className="w-5 h-5" />
      </div>
    </button>
  );
}
