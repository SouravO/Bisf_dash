"use client";

import React, { useState } from "react";
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

export default function App() {
  const [step, setStep] = useState(0);
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

      if (!response.ok) {
        if (SUPABASE_URL.includes("YOUR_PROJECT_ID")) {
          console.log("Mocking submission since Supabase keys are not set.");
          await new Promise((r) => setTimeout(r, 1500));
        } else {
          throw new Error("Failed to submit to Supabase");
        }
      }

      setStep(5);
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Something went wrong saving your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic side panel content based on step
  const getSidePanelContent = () => {
    switch (step) {
      case 0:
        return {
          title: "Building the Future.",
          subtitle: "Empowering Founders. Enabling Investors.",
        };
      case 1:
        return {
          title: "Beyond Investment.",
          subtitle: "Discover opportunities that shape tomorrow's landscape.",
        };
      case 2:
        return {
          title: "Join the Ecosystem.",
          subtitle: "Connect, collaborate, and scale with visionary leaders.",
        };
      case 3:
        return {
          title: "Let's Connect.",
          subtitle: "We're excited to learn more about your journey.",
        };
      case 4:
        return {
          title: "Find Your Network.",
          subtitle: "Unlock hyper-local opportunities tailored for you.",
        };
      case 5:
        return {
          title: "Welcome Aboard.",
          subtitle: "The future of innovation starts right here.",
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans text-slate-800 selection:bg-[#2B2E7E]/20">
      
      {/* Mobile Header (Visible only on smaller screens) */}
      <header className="lg:hidden flex items-center justify-between p-6 bg-white shadow-sm z-10">
        {/* <img src="/logos.png" alt="BISF Logo" className="w-28 h-auto object-contain" /> */}
        <a href="/admin/login" className="text-[#2B2E7E] hover:text-[#1f2263]">
          <ShieldCheck className="w-6 h-6" />
        </a>
      </header>

      {/* LEFT PANEL: Premium Branding (Hidden on Mobile, Sticky on Desktop) */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#2B2E7E] relative overflow-hidden flex-col justify-between p-16 text-white shadow-2xl z-10">
        {/* Abstract Background Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex justify-between items-start">
          <a href="/" className="inline-block p-4 rounded-2xl backdrop-blur-md w-auto border-white/10 hover:bg-white/20 transition-all">
            <img src="/logos.png" alt="BISF Logo" className="w-60 h-auto object-contain brightness-0 invert" />
          </a>
        </div>

        <div className="relative z-10 mb-20 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-blue-300" />
            A Venture by iQue Global
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            {getSidePanelContent().title}
          </h2>
          <p className="text-xl text-blue-100 max-w-md font-light leading-relaxed">
            {getSidePanelContent().subtitle}
          </p>
        </div>

        {/* Decorative Progress Dots */}
        <div className="relative z-10 flex gap-3">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                step === idx ? "w-8 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: Dynamic Forms */}
      <main className="flex-grow flex flex-col relative bg-slate-50/50">
        
        {/* Desktop Admin Login Button */}
        <div className="hidden lg:flex absolute top-8 right-12 z-20">
          <a
            href="/admin/login"
            className="group px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:border-[#2B2E7E] hover:text-[#2B2E7E] shadow-sm transition-all flex items-center gap-2 text-sm"
          >
            <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Admin Login
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
          <div className="w-full max-w-2xl">
            
            {/* STEP 0: LANDING PAGE */}
            {step === 0 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Bharat Innovation &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B2E7E] to-blue-500">
                    Startup Facilitator
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed">
                  Join India's most dynamic network of visionaries. We bridge the gap between groundbreaking ideas and the capital needed to scale them.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleNext}
                    className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#2B2E7E] text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-[#1a1c4b] shadow-[0_15px_40px_-10px_rgba(43,46,126,0.6)] hover:-translate-y-1"
                  >
                    <span>Start Your Journey</span>
                    <div className="bg-white/20 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: ARE YOU READY */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div>
                  <div className="text-[#2B2E7E] font-semibold tracking-wider text-sm mb-3 uppercase">Step 01</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    Are you ready to be part of something bigger than just an investment?
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-8">
                  <button
                    onClick={() => { updateData("is_interested", true); handleNext(); }}
                    className="flex flex-col text-left p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#2B2E7E] hover:shadow-[0_8px_30px_rgb(43,46,126,0.12)] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                    <span className="text-4xl mb-4 relative z-10">🚀</span>
                    <div className="font-bold text-slate-900 text-xl mb-2 relative z-10">Yes, tell me more</div>
                    <div className="text-slate-500 relative z-10">Awesome, let's dive into the details!</div>
                  </button>
                  
                  <button
                    onClick={() => { updateData("is_interested", false); handleNext(); }}
                    className="flex flex-col text-left p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-md transition-all group"
                  >
                    <span className="text-4xl mb-4">👀</span>
                    <div className="font-bold text-slate-900 text-xl mb-2">I'm just exploring</div>
                    <div className="text-slate-500">No pressure. Take your time to look around.</div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ECOSYSTEM */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div>
                  <div className="text-[#2B2E7E] font-semibold tracking-wider text-sm mb-3 uppercase">Step 02</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    Ready to take the next step?
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg">Are you excited to join our ecosystem?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-8">
                  <button
                    onClick={() => { updateData("ecosystem", true); handleNext(); }}
                    className="flex flex-col text-left p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#2B2E7E] hover:shadow-[0_8px_30px_rgb(43,46,126,0.12)] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                    <span className="text-4xl mb-4 relative z-10">🎉</span>
                    <div className="font-bold text-slate-900 text-xl mb-2 relative z-10">Yes, I'm in!</div>
                    <div className="text-slate-500 relative z-10">Let's build something great together.</div>
                  </button>
                  
                  <button
                    onClick={() => { updateData("ecosystem", false); handleNext(); }}
                    className="flex flex-col text-left p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-md transition-all group"
                  >
                    <span className="text-4xl mb-4">⏳</span>
                    <div className="font-bold text-slate-900 text-xl mb-2">Not right now</div>
                    <div className="text-slate-500">Thanks for considering. Our doors are open.</div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PERSONAL DETAILS */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div>
                  <div className="text-[#2B2E7E] font-semibold tracking-wider text-sm mb-3 uppercase">Step 03</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    Tell us about you
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg">
                    We'd love to know you better. Please share your basic details:
                  </p>
                </div>

                <div className="space-y-5 mt-8">
                  {/* Name Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#2B2E7E] transition-colors" />
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => updateData("name", e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B2E7E]/20 focus:border-[#2B2E7E] transition-all shadow-sm text-lg"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-[#2B2E7E] transition-colors" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => updateData("phone", e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B2E7E]/20 focus:border-[#2B2E7E] transition-all shadow-sm text-lg"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#2B2E7E] transition-colors" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => updateData("email", e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B2E7E]/20 focus:border-[#2B2E7E] transition-all shadow-sm text-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleNext}
                    disabled={!formData.name || !formData.phone}
                    className="group px-8 py-4 bg-[#2B2E7E] text-white rounded-xl font-semibold hover:bg-[#1a1c4b] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center gap-3 shadow-[0_8px_20px_-6px_rgba(43,46,126,0.5)] hover:-translate-y-1"
                  >
                    Continue <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: LOCATION */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div>
                  <div className="text-[#2B2E7E] font-semibold tracking-wider text-sm mb-3 uppercase">Step 04</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    Where Are You Based?
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg">
                    Knowing your location helps us connect you with local opportunities and events.
                  </p>
                </div>

                <div className="grid gap-6 mt-8 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <SearchableSelect
                    label="State"
                    placeholder="Select your State"
                    value={formData.state}
                    onChange={(val) => updateData("state", val)}
                    icon={<MapPin className="w-5 h-5 text-slate-400" />}
                    options={uniqueIndianStates}
                  />

                  <SearchableSelect
                    label="City"
                    placeholder="Select your City"
                    value={formData.city}
                    onChange={(val) => updateData("city", val)}
                    icon={<Building2 className="w-5 h-5 text-slate-400" />}
                    options={uniqueIndianCities}
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6">
                  <button
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto px-6 py-4 text-slate-500 font-medium hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={submitToSupabase}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 bg-[#2B2E7E] text-white rounded-xl font-bold hover:bg-[#1a1c4b] transition-all disabled:opacity-70 flex items-center justify-center gap-3 shadow-[0_8px_20px_-6px_rgba(43,46,126,0.5)] hover:-translate-y-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Finalizing...
                      </>
                    ) : (
                      "Submit Profile"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SUCCESS */}
            {step === 5 && (
              <div className="text-center space-y-8 animate-in zoom-in-95 duration-700 bg-white p-12 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2B2E7E] to-blue-400"></div>
                
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <div className="absolute inset-0 border-4 border-green-100 rounded-full animate-ping opacity-20"></div>
                  <CheckCircle className="w-12 h-12 text-green-500 relative z-10" />
                </div>
                
                <div>
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                    You're All Set!
                  </h2>
                  <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
                    Thank you for sharing your details. Your profile has been securely crafted. Welcome to the elite BISF ecosystem.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setStep(0);
                    setFormData({
                      ecosystem: null,
                      is_interested: null,
                      name: "",
                      phone: "",
                      email: "",
                      state: "",
                      city: "",
                    });
                  }}
                  className="mt-4 inline-flex items-center justify-center px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Return Home
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}