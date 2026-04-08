"use client";

import React, { useState } from "react";
import Antigravity from "@/components/Antigravity";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  ArrowRight,
  Loader2,
  CheckCircle,
  ShieldCheck,
  ChevronLeft,
  Circle,
} from "lucide-react";

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
  place: string;
  city: string;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ecosystem: null,
    is_interested: null,
    name: "",
    phone: "",
    email: "",
    place: "",
    city: "",
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const updateData = (field: keyof FormData, value: any) => {
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
          place: formData.place || null,
          city: formData.city || null,
          is_interested: formData.is_interested,
          ecosystem: formData.ecosystem,
          status: "new",
        }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setStep(5);
    } catch (error) {
      console.error(error);
      alert("Error saving details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] flex flex-col font-sans text-white relative overflow-hidden selection:bg-[#2B2E7E] selection:text-white">
      {/* --- BRAND BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Brand Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[#2B2E7E]/[0.07] rounded-full blur-[160px]" />
        
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10" />
        
        {/* Technical Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:80px:80px]" />
      </div>

      <Antigravity 
        count={160} 
        color="#2B2E7E" 
        particleSize={1.1} 
        ringRadius={11} 
        magnetRadius={14}
        autoAnimate={true}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-8 z-50">
        <div className="flex items-center gap-6">
          <a href="/" className="group flex items-center gap-4">
            <img
              src="/logos.png"
              alt="BISF Logo"
              className="w-28 md:w-36 h-auto object-contain brightness-0 invert"
            />
          </a>
        </div>
        <a
          href="/admin/login"
          className="group px-6 py-2 bg-[#2B2E7E]/10 backdrop-blur-xl border border-[#2B2E7E]/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-[#2B2E7E] transition-all duration-500 shadow-[0_0_20px_rgba(43,46,126,0.2)]"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-3 h-3 text-[#2B2E7E] group-hover:text-white transition-colors" />
            <span>Secure Access</span>
          </div>
        </a>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10 pt-24 pb-16">
        <div className="w-full max-w-5xl">
          
          {/* STEP 0: LANDING PAGE */}
          {step === 0 && (
            <div className="text-center space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="flex flex-col items-center gap-6">
                <div className="px-5 py-2 rounded-full border border-[#2B2E7E]/20 bg-[#2B2E7E]/5 text-[10px] font-black tracking-[0.3em] uppercase text-[#2B2E7E] mb-4">
                  A Venture by iQue Global
                </div>
                
                <div className="space-y-4 max-w-4xl">
                  <h1 className="text-5xl md:text-[7.5rem] font-black tracking-[-0.05em] leading-[0.85] text-white">
                    Bharat Innovation <br />
                    <span className="text-[#2B2E7E]">& Startup Facilitator</span>
                  </h1>
                  <p className="text-lg md:text-2xl text-white/40 font-medium tracking-tight mt-10 uppercase tracking-[0.15em]">
                    Empowering Founders. Enabling Investors. <br className="hidden md:block" />
                    <span className="text-white border-b-2 border-[#2B2E7E] pb-1">Building the Future.</span>
                  </p>
                </div>
              </div>

              <div className="pt-12 flex flex-col items-center gap-10">
                <button
                  onClick={handleNext}
                  className="group relative flex items-center justify-center gap-6 px-16 py-8 bg-[#2B2E7E] text-white rounded-none transition-all duration-700 hover:scale-[1.03] active:scale-95 overflow-hidden shadow-[0_25px_50px_-12px_rgba(43,46,126,0.5)]"
                >
                  <span className="relative z-10 font-black text-xl uppercase tracking-tighter italic">Initiate Sequence</span>
                  <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </button>
                
                <div className="flex items-center gap-10 opacity-30">
                  <Circle className="w-1.5 h-1.5 fill-[#2B2E7E]" />
                  <Circle className="w-1.5 h-1.5 fill-[#2B2E7E]" />
                  <Circle className="w-1.5 h-1.5 fill-[#2B2E7E]" />
                </div>
              </div>
            </div>
          )}

          {/* FORM STEPS CONTAINER */}
          {step > 0 && step < 5 && (
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-[#0A0A0D] border border-white/5 p-10 md:p-20 shadow-2xl transition-all duration-700">
                {/* Brand Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2B2E7E] to-transparent" />
                
                {/* Step Progress */}
                <div className="flex gap-2 mb-20">
                  {[1, 2, 3, 4].map((s) => (
                    <div 
                      key={s}
                      className={`h-1 flex-grow transition-all duration-700 ${
                        s <= step ? "bg-[#2B2E7E]" : "bg-white/5"
                      }`}
                    />
                  ))}
                </div>

                {/* STEP 1: ARE YOU READY */}
                {step === 1 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-white">
                        Are you ready to be part of <br />
                        <span className="text-[#2B2E7E] not-italic opacity-80">something bigger?</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      <button
                        onClick={() => { updateData("is_interested", true); handleNext(); }}
                        className="group flex items-center justify-between p-10 border border-white/5 bg-white/[0.02] hover:border-[#2B2E7E]/50 hover:bg-[#2B2E7E]/5 transition-all duration-500"
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2B2E7E]">Path_01</span>
                          <span className="text-2xl font-black uppercase italic">Yes, tell me more</span>
                        </div>
                        <ArrowRight className="w-8 h-8 text-[#2B2E7E] opacity-0 group-hover:opacity-100 transition-all -translate-x-6 group-hover:translate-x-0" />
                      </button>
                      <button
                        onClick={() => { updateData("is_interested", false); handleNext(); }}
                        className="group flex items-center justify-between p-10 border border-white/5 bg-white/[0.02] hover:border-[#2B2E7E]/50 hover:bg-[#2B2E7E]/5 transition-all duration-500"
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2B2E7E]">Path_02</span>
                          <span className="text-2xl font-black uppercase italic">I&apos;m just exploring</span>
                        </div>
                        <ArrowRight className="w-8 h-8 text-[#2B2E7E] opacity-0 group-hover:opacity-100 transition-all -translate-x-6 group-hover:translate-x-0" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: ECOSYSTEM */}
                {step === 2 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/30 hover:text-[#2B2E7E] transition-all text-[10px] font-black uppercase tracking-widest">
                      <ChevronLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                        Ready to take <br />
                        <span className="text-[#2B2E7E] not-italic opacity-80">the next step?</span>
                      </h2>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Are you excited to join our ecosystem?</p>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      <button
                        onClick={() => { updateData("ecosystem", true); handleNext(); }}
                        className="group flex items-center justify-between p-10 border border-white/5 bg-white/[0.02] hover:border-[#2B2E7E]/50 hover:bg-[#2B2E7E]/5 transition-all duration-500"
                      >
                        <span className="text-2xl font-black uppercase italic">Yes, I&apos;m in!</span>
                        <ArrowRight className="w-8 h-8 text-[#2B2E7E] opacity-0 group-hover:opacity-100 transition-all -translate-x-6 group-hover:translate-x-0" />
                      </button>
                      <button
                        onClick={() => { updateData("ecosystem", false); handleNext(); }}
                        className="group flex items-center justify-between p-10 border border-white/5 bg-white/[0.02] hover:border-[#2B2E7E]/50 hover:bg-[#2B2E7E]/5 transition-all duration-500"
                      >
                        <span className="text-2xl font-black uppercase italic">Not right now</span>
                        <ArrowRight className="w-8 h-8 text-[#2B2E7E] opacity-0 group-hover:opacity-100 transition-all -translate-x-6 group-hover:translate-x-0" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PERSONAL DETAILS */}
                {step === 3 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/30 hover:text-[#2B2E7E] transition-all text-[10px] font-black uppercase tracking-widest">
                      <ChevronLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                        Identity
                      </h2>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Provide your credentials for verification:</p>
                    </div>

                    <div className="space-y-8">
                      {[
                        { label: "Full Name", field: "name", icon: User, type: "text", ph: "Your full name" },
                        { label: "Phone Number", field: "phone", icon: Phone, type: "tel", ph: "Primary contact" },
                        { label: "Email Address", field: "email", icon: Mail, type: "email", ph: "Email address" }
                      ].map((inp, i) => (
                        <div key={i} className="group border-b-2 border-white/5 focus-within:border-[#2B2E7E] transition-all pb-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#2B2E7E] group-focus-within:opacity-100 transition-opacity opacity-40">{inp.label}</label>
                          <div className="relative mt-3">
                            <inp.icon className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-[#2B2E7E] transition-colors" />
                            <input
                              type={inp.type}
                              placeholder={inp.ph}
                              value={(formData as any)[inp.field]}
                              onChange={(e) => updateData(inp.field as any, e.target.value)}
                              className="w-full pl-10 py-3 bg-transparent outline-none font-bold text-lg placeholder:text-white/5"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-6">
                      <button
                        onClick={handleNext}
                        disabled={!formData.name || !formData.phone}
                        className="group flex items-center gap-4 px-12 py-6 bg-[#2B2E7E] text-white font-black uppercase tracking-tighter italic hover:bg-[#1f2263] disabled:opacity-10 transition-all shadow-[0_15px_30px_-10px_rgba(43,46,126,0.4)]"
                      >
                        Next Phase <ArrowRight className="w-6 h-6 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: LOCATION */}
                {step === 4 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/30 hover:text-[#2B2E7E] transition-all text-[10px] font-black uppercase tracking-widest">
                      <ChevronLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                        Base Ops
                      </h2>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Define your geographic node:</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {[
                        { label: "Place", field: "place", icon: MapPin, ph: "Location/Area" },
                        { label: "City", field: "city", icon: Building2, ph: "Primary City" }
                      ].map((inp, i) => (
                        <div key={i} className="group border-b-2 border-white/5 focus-within:border-[#2B2E7E] transition-all pb-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#2B2E7E] opacity-40 group-focus-within:opacity-100">{inp.label}</label>
                          <div className="relative mt-3">
                            <inp.icon className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-[#2B2E7E] transition-colors" />
                            <input
                              type="text"
                              placeholder={inp.ph}
                              value={(formData as any)[inp.field]}
                              onChange={(e) => updateData(inp.field as any, e.target.value)}
                              className="w-full pl-10 py-3 bg-transparent outline-none font-bold text-lg placeholder:text-white/5"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-8 bg-[#2B2E7E]/5 border-l-4 border-[#2B2E7E]">
                      <p className="text-xs text-white/40 leading-relaxed font-black uppercase tracking-[0.2em]">
                        Localization enables targeted opportunities within our decentralized nodes.
                      </p>
                    </div>

                    <div className="flex justify-end pt-6">
                      <button
                        onClick={submitToSupabase}
                        disabled={isSubmitting}
                        className="group flex items-center gap-4 px-14 py-7 bg-[#2B2E7E] text-white font-black uppercase tracking-tighter italic hover:bg-[#1f2263] disabled:opacity-50 transition-all shadow-[0_20px_40px_-10px_rgba(43,46,126,0.5)]"
                      >
                        {isSubmitting ? "SYNCING DATA..." : "Finalize Sequence"}
                        {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-1" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <div className="max-w-3xl mx-auto text-center space-y-12 animate-in zoom-in-95 duration-1000">
              <div className="w-28 h-28 bg-[#2B2E7E] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(43,46,126,0.6)] animate-pulse">
                <CheckCircle className="w-14 h-14" />
              </div>
              <div className="space-y-6">
                <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
                  Sequence <br />
                  <span className="text-[#2B2E7E] not-italic">Complete</span>
                </h2>
                <p className="text-white/40 text-xl font-medium max-w-lg mx-auto leading-relaxed uppercase tracking-widest">
                  Authentication successful. Welcome to the <span className="text-white">BISF</span> Network.
                </p>
              </div>
              <button
                onClick={() => { setStep(0); setFormData({ ecosystem: null, is_interested: null, name: "", phone: "", email: "", place: "", city: "" }); }}
                className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-[#2B2E7E] hover:text-white transition-all shadow-xl"
              >
                Return to Core
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-10 border-t border-white/5 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] font-black tracking-[0.5em] uppercase text-center md:text-left">
            © 2026 Bharat Innovation & Startup Facilitator · <span className="text-[#2B2E7E]">BISF_NODE_01</span>
          </p>
          <div className="flex gap-8 font-mono text-[8px] text-white/10 uppercase tracking-[0.3em]">
            <span>Status: <span className="text-[#2B2E7E]">Ready</span></span>
            <span>Security: <span className="text-[#2B2E7E]">Encrypted</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
