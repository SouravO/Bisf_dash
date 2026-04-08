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
    <div className="min-h-screen bg-[#08080A] flex flex-col font-sans text-white relative overflow-hidden selection:bg-white/10 selection:text-white">
      {/* --- DESIGN BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
        {/* Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <Antigravity 
        count={150} 
        color="#ffffff" 
        particleSize={0.8} 
        ringRadius={12} 
        magnetRadius={15}
        autoAnimate={true}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-8 z-50 transition-all">
        <div className="flex items-center">
          <a href="/" className="group flex items-center gap-4">
            <img
              src="/logos.png"
              alt="BISF Logo"
              className="w-28 md:w-36 h-auto object-contain transition-all duration-500 group-hover:opacity-80"
            />
            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hidden md:block group-hover:text-white/60 transition-colors">Innovating Bharat</span>
          </a>
        </div>
        <a
          href="/admin/login"
          className="group px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            <span>Admin Portal</span>
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
                <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-4 animate-pulse">
                  A Venture by iQue Global
                </div>
                
                <div className="space-y-4 max-w-4xl">
                  <h1 className="text-5xl md:text-8xl font-black tracking-[-0.04em] leading-[0.95] text-white">
                    Bharat Innovation & <br />
                    <span className="italic font-light text-white/40">Startup Facilitator</span>
                  </h1>
                  <p className="text-lg md:text-2xl text-white/40 font-medium tracking-tight mt-8 uppercase tracking-[0.1em]">
                    Empowering Founders. Enabling Investors. <br className="hidden md:block" />
                    <span className="text-white">Building the Future.</span>
                  </p>
                </div>
              </div>

              <div className="pt-12 flex flex-col items-center gap-8">
                <button
                  onClick={handleNext}
                  className="group relative flex items-center justify-center gap-6 px-14 py-7 bg-white text-black rounded-none transition-all duration-500 hover:bg-white/90 hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 font-black text-xl uppercase tracking-tighter italic">Get Started</span>
                  <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </button>
                
                <div className="flex items-center gap-8 opacity-20">
                  <Circle className="w-1.5 h-1.5 fill-white" />
                  <Circle className="w-1.5 h-1.5 fill-white" />
                  <Circle className="w-1.5 h-1.5 fill-white" />
                </div>
              </div>
            </div>
          )}

          {/* FORM STEPS CONTAINER */}
          {step > 0 && step < 5 && (
            <div className="max-w-2xl mx-auto">
              <div className="relative bg-[#0F0F12] border border-white/5 p-8 md:p-16 transition-all duration-700">
                {/* Decorative UI elements */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[8px] text-white/10 uppercase tracking-widest">BISF_SEQUENCE // 0{step}</div>
                
                {/* Step Progress */}
                <div className="flex gap-1.5 mb-16">
                  {[1, 2, 3, 4].map((s) => (
                    <div 
                      key={s}
                      className={`h-0.5 flex-grow transition-all duration-700 ${
                        s <= step ? "bg-white" : "bg-white/5"
                      }`}
                    />
                  ))}
                </div>

                {/* STEP 1: ARE YOU READY */}
                {step === 1 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                        Are you ready to be part of <br />
                        <span className="text-white/30 not-italic">something bigger than just an investment?</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() => { updateData("is_interested", true); handleNext(); }}
                        className="group flex items-center justify-between p-8 border border-white/5 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500"
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Option_01</span>
                          <span className="text-xl font-black uppercase italic">Yes, tell me more</span>
                        </div>
                        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </button>
                      <button
                        onClick={() => { updateData("is_interested", false); handleNext(); }}
                        className="group flex items-center justify-between p-8 border border-white/5 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500"
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Option_02</span>
                          <span className="text-xl font-black uppercase italic">I'm just exploring</span>
                        </div>
                        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: ECOSYSTEM */}
                {step === 2 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/30 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                      <ChevronLeft className="w-3 h-3" /> Previous_Phase
                    </button>
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                        Ready to take <br />
                        <span className="text-white/30 not-italic">the next step?</span>
                      </h2>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Are you excited to join our ecosystem?</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() => { updateData("ecosystem", true); handleNext(); }}
                        className="group flex items-center justify-between p-8 border border-white/5 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500"
                      >
                        <span className="text-xl font-black uppercase italic">Yes, I'm in!</span>
                        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </button>
                      <button
                        onClick={() => { updateData("ecosystem", false); handleNext(); }}
                        className="group flex items-center justify-between p-8 border border-white/5 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500"
                      >
                        <span className="text-xl font-black uppercase italic">Not right now</span>
                        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PERSONAL DETAILS */}
                {step === 3 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/30 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                      <ChevronLeft className="w-3 h-3" /> Previous_Phase
                    </button>
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                        Identity
                      </h2>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">We'd love to know you better. Please share your details:</p>
                    </div>

                    <div className="space-y-6">
                      {[
                        { label: "Full Name", field: "name", icon: User, type: "text", ph: "Your full name" },
                        { label: "Phone Number", field: "phone", icon: Phone, type: "tel", ph: "Primary contact" },
                        { label: "Email Address", field: "email", icon: Mail, type: "email", ph: "Email address" }
                      ].map((inp, i) => (
                        <div key={i} className="group border-b border-white/5 focus-within:border-white transition-all pb-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/20 group-focus-within:text-white/60 transition-colors">{inp.label}</label>
                          <div className="relative mt-2">
                            <inp.icon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-white transition-colors" />
                            <input
                              type={inp.type}
                              placeholder={inp.ph}
                              value={(formData as any)[inp.field]}
                              onChange={(e) => updateData(inp.field as any, e.target.value)}
                              className="w-full pl-8 py-3 bg-transparent outline-none font-medium placeholder:text-white/5"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNext}
                        disabled={!formData.name || !formData.phone}
                        className="group flex items-center gap-4 px-10 py-5 bg-white text-black font-black uppercase tracking-tighter italic hover:bg-white/90 disabled:opacity-10 transition-all"
                      >
                        Next Phase <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: LOCATION */}
                {step === 4 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/30 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                      <ChevronLeft className="w-3 h-3" /> Previous_Phase
                    </button>
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                        Base of Operations
                      </h2>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Where are you building your legacy?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { label: "Place", field: "place", icon: MapPin, ph: "Location/Area" },
                        { label: "City", field: "city", icon: Building2, ph: "Primary City" }
                      ].map((inp, i) => (
                        <div key={i} className="group border-b border-white/5 focus-within:border-white transition-all pb-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/20 group-focus-within:text-white/60 transition-colors">{inp.label}</label>
                          <div className="relative mt-2">
                            <inp.icon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-white transition-colors" />
                            <input
                              type="text"
                              placeholder={inp.ph}
                              value={(formData as any)[inp.field]}
                              onChange={(e) => updateData(inp.field as any, e.target.value)}
                              className="w-full pl-8 py-3 bg-transparent outline-none font-medium placeholder:text-white/5"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 bg-white/[0.02] border-l border-white/10">
                      <p className="text-xs text-white/30 leading-relaxed uppercase tracking-widest">
                        Localization enables targeted opportunities within our decentralized nodes.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={submitToSupabase}
                        disabled={isSubmitting}
                        className="group flex items-center gap-4 px-12 py-6 bg-white text-black font-black uppercase tracking-tighter italic hover:bg-white/90 disabled:opacity-50 transition-all"
                      >
                        {isSubmitting ? "Syncing..." : "Finalize Registration"}
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
            <div className="max-w-2xl mx-auto text-center space-y-12 animate-in zoom-in-95 duration-1000">
              <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>
              <div className="space-y-6">
                <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                  Sequence <br />
                  <span className="text-white/30 not-italic">Complete</span>
                </h2>
                <p className="text-white/40 text-xl font-medium max-w-md mx-auto leading-relaxed">
                  Thank you for your details. Your data has been securely logged. Welcome to the <span className="text-white">BISF</span> ecosystem.
                </p>
              </div>
              <button
                onClick={() => { setStep(0); setFormData({ ecosystem: null, is_interested: null, name: "", phone: "", email: "", place: "", city: "" }); }}
                className="inline-flex items-center gap-4 px-10 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
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
            © 2026 Bharat Innovation & Startup Facilitator · BISF_NODE_01
          </p>
          <div className="flex gap-8 font-mono text-[8px] text-white/10 uppercase tracking-[0.3em]">
            <span>Status: Verified</span>
            <span>Security: SSL_ENCRYPTED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
