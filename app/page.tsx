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

// --- SUPABASE CONFIGURATION ---
// Replace these with your actual Supabase Project URL and Anon Key
const SUPABASE_URL = "https://pszgnnbpyqvbdndcoelb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzemdubmJweXF2YmRuZGNvZWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTc3MTIsImV4cCI6MjA5MDc3MzcxMn0.SZfNKtY_r59lm5OzyDgWrueILpT5zyMKy51di8tkEZE";

export default function App() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ecosystem: null,
    is_interested: null,
    name: "",
    phone: "",
    email: "",
    place: "",
    city: "",
  });

  const handleNext = () => setStep((prev) => prev + 1);

  const updateData = (field, value) => {
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
          place: formData.place || null,
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
      <header className="p-6 md:p-10 flex justify-between items-center w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-blue-600 tracking-tight">
            Bsfi
          </span>
        </div>
        {step > 0 && step < 5 && (
          <div className="text-sm font-medium text-slate-400">
            Step {step} of 5
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* STEP 0: LANDING PAGE */}
          {step === 0 && (
            <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
                ✨ The future of data
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
                Join the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Ecosystem
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                Bsfi is building the next generation of interconnected
                platforms. Enter your details to get early access and join our
                growing network.
              </p>
              <button
                onClick={handleNext}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* STEP 1: ARE YOU READY (First Question) */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                Are you ready to be part of something bigger than just an
                investment?
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-8 bg-[#eef2ff] p-2 rounded-2xl border border-blue-100 shadow-sm">
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
                    Awesome, let's continue!
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
                    <span>👀</span> I'm just exploring
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
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                Ready to take the next step?
              </h2>
              <p className="text-slate-500">
                Are you excited to join our ecosystem?
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-8 bg-[#eef2ff] p-2 rounded-2xl border border-blue-100 shadow-sm">
                <button
                  onClick={() => {
                    updateData("ecosystem", true);
                    handleNext();
                  }}
                  className="flex flex-col text-left p-6 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="font-semibold text-slate-800 text-lg mb-1 flex items-center gap-2">
                    <span>🎉</span> Yes, I'm in!
                  </div>
                  <div className="text-sm text-slate-500 group-hover:text-slate-600 italic">
                    Awesome, let's continue!
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
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                Tell us about you
              </h2>
              <p className="text-slate-500">
                We'd love to know you better. Please share the following details
                with us:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {/* Full Name Input Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
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
                      placeholder="What's your full name?"
                      value={formData.name}
                      onChange={(e) => updateData("name", e.target.value)}
                      className="w-full text-sm text-slate-600 placeholder-slate-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Phone Input Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
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
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
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
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: LOCATION (Screenshot 3) */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                Where Are You Based?
              </h2>
              <p className="text-slate-500">
                We'd love to know you better — a couple more details to complete
                your profile:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {/* Place Input Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                  <div className="bg-[#dce4ff] py-3 flex justify-center border-b border-slate-100">
                    <MapPin
                      className="w-6 h-6 text-slate-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="p-4">
                    <label className="block font-semibold text-slate-800 mb-1">
                      Place
                    </label>
                    <input
                      type="text"
                      placeholder="Where are you based (Place)?"
                      value={formData.place}
                      onChange={(e) => updateData("place", e.target.value)}
                      className="w-full text-sm text-slate-600 placeholder-slate-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* City Input Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                  <div className="bg-[#dce4ff] py-3 flex justify-center border-b border-slate-100">
                    <Building2
                      className="w-6 h-6 text-slate-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="p-4">
                    <label className="block font-semibold text-slate-800 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="City?"
                      value={formData.city}
                      onChange={(e) => updateData("city", e.target.value)}
                      className="w-full text-sm text-slate-600 placeholder-slate-400 outline-none bg-transparent"
                    />
                  </div>
                </div>
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
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-blue-200"
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
                You're All Set!
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
                    place: "",
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
