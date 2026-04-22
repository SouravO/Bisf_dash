"use client";

import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Loader2,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from "lucide-react";
import SearchableSelect from "@/components/SearchableSelect";
import { uniqueIndianCities } from "@/lib/cities";
import { uniqueIndianStates } from "@/lib/places";

// --- SUPABASE CONFIGURATION ---
const SUPABASE_URL = "https://pszgnnbpyqvbdndcoelb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzemdubmJweXF2YmRuZGNvZWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTc3MTIsImV4cCI6MjA5MDc3MzcxMn0.SZfNKtY_r59lm5OzyDgWrueILpT5zyMKy51di8tkEZE";

interface FormData {
  ecosystem: boolean | null;
  is_interested: boolean | null;
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
}

interface JourneyFormProps {
  onBackToHome: () => void;
}

export default function JourneyForm({ onBackToHome }: JourneyFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ecosystem: null,
    is_interested: null,
    name: "",
    phone: "",
    email: "",
    state: "",
    city: "",
  });

  const handleNext = () => setStep((prev) => prev + 1);

  const updateData = (field: keyof FormData, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitToSupabase = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          place: formData.state || null,
          city: formData.city || null,
          is_interested: formData.is_interested,
          ecosystem: formData.ecosystem,
          status: "new",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit to Supabase");
      setStep(5);
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSidePanelContent = () => {
    switch (step) {
      case 1: return { title: "Beyond Investment.", subtitle: "Discover opportunities that shape tomorrow." };
      case 2: return { title: "Join the Ecosystem.", subtitle: "Connect and scale with visionary leaders." };
      case 3: return { title: "Let's Connect.", subtitle: "We're excited to learn about your journey." };
      case 4: return { title: "Find Your Network.", subtitle: "Unlock hyper-local opportunities." };
      case 5: return { title: "Welcome Aboard.", subtitle: "The future of innovation starts right here." };
      default: return { title: "", subtitle: "" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans text-slate-800 animate-in fade-in duration-500">
      
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-6 bg-white shadow-sm z-10">
        <button onClick={onBackToHome}>
          <img src="/logos.png" alt="BISF Logo" className="w-24 h-auto object-contain" />
        </button>
        <a href="/admin/login" className="text-[#2B2E7E]"><ShieldCheck className="w-6 h-6" /></a>
      </header>

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#2B2E7E] relative overflow-hidden flex-col justify-between p-16 text-white shadow-2xl z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <button onClick={onBackToHome} className="inline-block p-4 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
            <img src="/logos.png" alt="BISF Logo" className="w-60 h-auto object-contain brightness-0 invert" />
          </button>
        </div>

        <div className="relative z-10 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-blue-300" /> A Venture by iQue Global
          </div>
          <h2 className="text-5xl font-bold tracking-tight leading-tight mb-6">{getSidePanelContent().title}</h2>
          <p className="text-xl text-blue-100 max-w-md font-light">{getSidePanelContent().subtitle}</p>
        </div>

        <div className="relative z-10 flex gap-3">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${step === idx ? "w-8 bg-white" : "w-2 bg-white/30"}`} />
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: Forms */}
      <main className="flex-grow flex flex-col relative bg-slate-50/50">
        <div className="hidden lg:flex absolute top-8 right-12 z-20">
          <a href="/admin/login" className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:text-[#2B2E7E] shadow-sm flex items-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4" /> Admin Login
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
          <div className="w-full max-w-2xl">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95">
                <div className="text-[#2B2E7E] font-bold text-sm uppercase">Step 01</div>
                <h2 className="text-3xl font-bold">Are you ready to be part of something bigger?</h2>
                <div className="grid md:grid-cols-2 gap-5 mt-8">
                  <button onClick={() => { updateData("is_interested", true); handleNext(); }} className="p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#2B2E7E] transition-all text-left">
                    <span className="text-4xl block mb-4">🚀</span>
                    <div className="font-bold text-xl mb-2">Yes, tell me more</div>
                    <div className="text-slate-500">Awesome, let's dive into details!</div>
                  </button>
                  <button onClick={() => { updateData("is_interested", false); handleNext(); }} className="p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-400 transition-all text-left">
                    <span className="text-4xl block mb-4">👀</span>
                    <div className="font-bold text-xl mb-2">I'm just exploring</div>
                    <div className="text-slate-500">No pressure. Take your time.</div>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95">
                <div className="text-[#2B2E7E] font-bold text-sm uppercase">Step 02</div>
                <h2 className="text-3xl font-bold">Ready to join our ecosystem?</h2>
                <div className="grid md:grid-cols-2 gap-5 mt-8">
                  <button onClick={() => { updateData("ecosystem", true); handleNext(); }} className="p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#2B2E7E] transition-all text-left">
                    <span className="text-4xl block mb-4">🎉</span>
                    <div className="font-bold text-xl mb-2">Yes, I'm in!</div>
                    <div className="text-slate-500">Let's build together.</div>
                  </button>
                  <button onClick={() => { updateData("ecosystem", false); handleNext(); }} className="p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-400 transition-all text-left">
                    <span className="text-4xl block mb-4">⏳</span>
                    <div className="font-bold text-xl mb-2">Not right now</div>
                    <div className="text-slate-500">Our doors are always open.</div>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95">
                <div className="text-[#2B2E7E] font-bold text-sm uppercase">Step 03</div>
                <h2 className="text-3xl font-bold">Tell us about you</h2>
                <div className="space-y-5 mt-8">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => updateData("name", e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2B2E7E]" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => updateData("phone", e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2B2E7E]" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => updateData("email", e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2B2E7E]" />
                  </div>
                </div>
                <div className="flex justify-end pt-6">
                  <button onClick={handleNext} disabled={!formData.name || !formData.phone} className="px-8 py-4 bg-[#2B2E7E] text-white rounded-xl font-semibold flex items-center gap-3 disabled:opacity-50">
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95">
                <div className="text-[#2B2E7E] font-bold text-sm uppercase">Step 04</div>
                <h2 className="text-3xl font-bold">Where Are You Based?</h2>
                <div className="grid gap-6 mt-8 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <SearchableSelect label="State" placeholder="Select State" value={formData.state} onChange={(val) => updateData("state", val)} icon={<MapPin className="w-5 h-5" />} options={uniqueIndianStates} />
                  <SearchableSelect label="City" placeholder="Select City" value={formData.city} onChange={(val) => updateData("city", val)} icon={<Building2 className="w-5 h-5" />} options={uniqueIndianCities} />
                </div>
                <div className="flex justify-between items-center gap-4 pt-6">
                  <button onClick={() => setStep(3)} className="px-6 py-4 text-slate-500 font-medium">Back</button>
                  <button onClick={submitToSupabase} disabled={isSubmitting} className="px-10 py-4 bg-[#2B2E7E] text-white rounded-xl font-bold disabled:opacity-70 flex items-center gap-3">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Profile"}
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center space-y-8 animate-in zoom-in-95 bg-white p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2B2E7E] to-blue-400"></div>
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-4xl font-extrabold">You're All Set!</h2>
                <p className="text-lg text-slate-500">Welcome to the elite BISF ecosystem.</p>
                <button onClick={onBackToHome} className="mt-4 px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200">Return Home</button>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
