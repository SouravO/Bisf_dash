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
} from "lucide-react";
import SearchableSelect from "@/components/SearchableSelect";
import { uniqueIndianCities } from "@/lib/cities";
import { uniqueIndianStates } from "@/lib/places";

// --- SUPABASE CONFIGURATION ---
// Replace these with your actual Supabase Project URL and Anon Key
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
      // We use the Supabase REST API directly so no extra dependencies are needed
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal", // Don't return the inserted row to save bandwidth
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          place: formData.state || null, // Mapping frontend 'state' to database 'place'
          city: formData.city || null,
          is_interested: formData.is_interested,
          ecosystem: formData.ecosystem,
          status: "new",
        }),
      });

      if (!response.ok) {
        // If you haven't put your keys in yet, this will fail.
        // We will mock the success for the sake of the UI preview if keys are missing.
        if (SUPABASE_URL.includes("YOUR_PROJECT_ID")) {
          console.log("Mocking submission since Supabase keys are not set.");
          await new Promise((r) => setTimeout(r, 1500));
        } else {
          throw new Error("Failed to submit to Supabase");
        }
      }

      setStep(5); // Success step
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Something went wrong saving your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className=" flex items-center justify-between p-6 border-b bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <a href="/" className="inline-block">
            <img
              src="/logos.png"
              alt="BISF Logo"
              className="w-36 h-auto object-contain hover:opacity-80 transition-opacity"
            />
          </a>
          <div></div>
        </div>
        <a
          href="/admin/login"
          className="px-5 py-2.5 bg-[#2B2E7E] text-white rounded-xl font-medium hover:bg-[#1f2263] transition-colors flex items-center gap-2 text-sm"
        >
          <ShieldCheck className="w-4 h-4" />
          Admin Login
        </a>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* STEP 0: LANDING PAGE */}
          {step === 0 && (
            <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2B2E7E]/10 text-[#2B2E7E] font-medium text-sm mb-4">
                A Venture by iQue Global
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
                Bharat Innovation &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B2E7E] to-[#3d41a8]">
                  Startup Facilitator
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                Empowering Founders. Enabling Investors. Building the Future.
              </p>
              <button
                onClick={handleNext}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2B2E7E] text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:bg-[#1f2263] hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(43,46,126,0.5)]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* STEP 1: ARE YOU READY (First Question) */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E7E]">
                Are you ready to be part of something bigger than just an
                investment?
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-8 bg-[#2B2E7E]/5 p-2 rounded-2xl border border-[#2B2E7E]/10 shadow-sm">
                <button
                  onClick={() => {
                    updateData("is_interested", true);
                    handleNext();
                  }}
                  className="flex flex-col text-left p-6 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="font-semibold text-slate-800 text-lg mb-1 flex items-center gap-2">
                    <span>🚀</span> Yes, tell me more
                  </div>
                  <div className="text-sm text-slate-500 group-hover:text-slate-600 italic">
                    Awesome, let&apos;s continue!
                  </div>
                </button>
                <button
                  onClick={() => {
                    updateData("is_interested", false);
                    handleNext();
                  }}
                  className="flex flex-col text-left p-6 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="font-semibold text-slate-800 text-lg mb-1 flex items-center gap-2">
                    <span>👀</span> I&apos;m just exploring
                  </div>
                  <div className="text-sm text-slate-500 group-hover:text-slate-600 italic">
                    No worries! Take your time.
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ECOSYSTEM */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E7E]">
                Ready to take the next step?
              </h2>
              <p className="text-slate-500">
                Are you excited to join our ecosystem?
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-8 bg-[#2B2E7E]/5 p-2 rounded-2xl border border-[#2B2E7E]/10 shadow-sm">
                <button
                  onClick={() => {
                    updateData("ecosystem", true);
                    handleNext();
                  }}
                  className="flex flex-col text-left p-6 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="font-semibold text-slate-800 text-lg mb-1 flex items-center gap-2">
                    <span>🎉</span> Yes, I&apos;m in!
                  </div>
                  <div className="text-sm text-slate-500 group-hover:text-slate-600 italic">
                    Awesome, let&apos;s continue!
                  </div>
                </button>
                <button
                  onClick={() => {
                    updateData("ecosystem", false);
                    handleNext();
                  }}
                  className="flex flex-col text-left p-6 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="font-semibold text-slate-800 text-lg mb-1 flex items-center gap-2">
                    <span>⏳</span> Not right now
                  </div>
                  <div className="text-sm text-slate-500 group-hover:text-slate-600 italic">
                    No worries! Thank you for considering us.
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PERSONAL DETAILS */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E7E]">
                Tell us about you
              </h2>
              <p className="text-slate-500">
                We&apos;d love to know you better. Please share the following details
                with us:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {/* Full Name Input Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-[#2B2E7E] focus-within:ring-1 focus-within:ring-[#2B2E7E]">
                  <div className="bg-[#dce4ff] py-3 flex justify-center border-b border-slate-100">
                    <User
                      className="w-6 h-6 text-slate-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="p-4">
                    <label className="block font-semibold text-slate-800 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="What&apos;s your full name?"
                      value={formData.name}
                      onChange={(e) => updateData("name", e.target.value)}
                      className="w-full text-sm text-slate-600 placeholder-slate-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Phone Input Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-[#2B2E7E] focus-within:ring-1 focus-within:ring-[#2B2E7E]">
                  <div className="bg-[#dce4ff] py-3 flex justify-center border-b border-slate-100">
                    <Phone
                      className="w-6 h-6 text-slate-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="p-4">
                    <label className="block font-semibold text-slate-800 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Your phone number?"
                      value={formData.phone}
                      onChange={(e) => updateData("phone", e.target.value)}
                      className="w-full text-sm text-slate-600 placeholder-slate-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Email Input Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-[#2B2E7E] focus-within:ring-1 focus-within:ring-[#2B2E7E]">
                  <div className="bg-[#dce4ff] py-3 flex justify-center border-b border-slate-100">
                    <Mail
                      className="w-6 h-6 text-slate-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="p-4">
                    <label className="block font-semibold text-slate-800 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Your email address?"
                      value={formData.email}
                      onChange={(e) => updateData("email", e.target.value)}
                      className="w-full text-sm text-slate-600 placeholder-slate-400 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.phone}
                  className="px-8 py-3 bg-[#2B2E7E] text-white rounded-xl font-medium hover:bg-[#1f2263] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: LOCATION (Screenshot 3) */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E7E]">
                Where Are You Based?
              </h2>
              <p className="text-slate-500">
                We&apos;d love to know you better — a couple more details to complete
                your profile:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {/* State Search Dropdown */}
                <SearchableSelect
                  label="State"
                  placeholder="Select State"
                  value={formData.state}
                  onChange={(val) => updateData("state", val)}
                  icon={<MapPin className="w-6 h-6 text-slate-700" strokeWidth={1.5} />}
                  options={uniqueIndianStates}
                />

                {/* City Search Dropdown */}
                <SearchableSelect
                  label="City"
                  placeholder="Select City"
                  value={formData.city}
                  onChange={(val) => updateData("city", val)}
                  icon={<Building2 className="w-6 h-6 text-slate-700" strokeWidth={1.5} />}
                  options={uniqueIndianCities}
                />
              </div>

              <p className="text-xs text-slate-400 pt-2">
                Knowing your location helps us connect you with the right people
                and opportunities within our ecosystem closest to you.
              </p>

              <div className="flex justify-between pt-4 items-center">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 text-slate-500 font-medium hover:text-slate-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={submitToSupabase}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#2B2E7E] text-white rounded-xl font-medium hover:bg-[#1f2263] transition-colors disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-[#2B2E7E]/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Details"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                You&apos;re All Set!
              </h2>
              <p className="text-slate-500 max-w-md mx-auto">
                Thank you for taking the time to share your details. Your
                information has been securely saved. Welcome to the Bsfi
                ecosystem!
              </p>
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
                className="mt-8 px-6 py-2 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
