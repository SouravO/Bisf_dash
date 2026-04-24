"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  Eye,
  Clock,
  Zap
} from "lucide-react";
import SearchableSelect from "@/components/SearchableSelect";
import { uniqueIndianCities, stateToCities } from "@/lib/cities";
import { uniqueIndianStates } from "@/lib/places";
import confetti from "canvas-confetti";

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
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<FormData>({
    ecosystem: null,
    is_interested: null,
    name: "",
    phone: "",
    email: "",
    state: "",
    city: "",
  });

  // Filter cities based on selected state
  const availableCities = useMemo(() => {
    if (formData.state && stateToCities[formData.state]) {
      return stateToCities[formData.state];
    }
    return uniqueIndianCities;
  }, [formData.state]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 0.5,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNext = () => setStep((prev) => prev + 1);

  const updateData = (field: keyof FormData, value: string | boolean | null) => {
    setFormData((prev) => ({ 
      ...prev, 
      [field]: value,
      // Clear city when state changes
      ...(field === 'state' && value !== prev.state ? { city: "" } : {})
    }));
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
      
      // Trigger confetti animation on success
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899']
      });
      
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
    <div className="min-h-screen bg-[#020617] flex flex-col lg:flex-row font-sans text-white animate-in fade-in duration-500 relative overflow-hidden">
      
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.speed * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Geometric floating shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-cyan-400/20 rotate-45"
          animate={{
            rotate: [45, 135, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 border border-blue-400/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rotate-12"
          animate={{
            rotate: [12, 72, 12],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Subtle floating sparkles */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Additional elegant sparkles */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`sparkle-extra-${i}`}
            className="absolute w-0.5 h-0.5 bg-blue-300/50 rounded-full"
            style={{
              left: `${60 + (i * 3)}%`,
              top: `${30 + (i * 4)}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + (i * 0.4),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-slate-950/95 border-b border-slate-800 shadow-xl z-10">
        <button onClick={onBackToHome}>
          <img src="/logos.png" alt="BISF Logo" className="w-20 h-auto object-contain" />
        </button>
        <a href="/admin/login" className="text-slate-200 hover:text-white"><ShieldCheck className="w-5 h-5" /></a>
      </header>

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-5/12 bg-slate-950 relative overflow-hidden flex-col justify-between p-16 text-white shadow-2xl z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 space-y-10">
          <button onClick={onBackToHome} className="inline-block p-4 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
            <img src="/logos.png" alt="BISF Logo" className="w-60 h-auto object-contain brightness-0 invert" />
          </button>

          <div className="flex flex-col items-center gap-8">
            <div className="relative w-44 h-44">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="3d-step1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-44 h-44 flex items-center justify-center"
                  >
                    <motion.div
                      className="absolute w-28 h-28 border-2 border-cyan-400/30 rounded"
                      animate={{
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      style={{ perspective: "1000px" }}
                    />
                    <motion.div
                      className="absolute w-20 h-20 border-2 border-blue-400/40 rounded"
                      animate={{
                        rotateX: [360, 0],
                        rotateY: [360, 0],
                        scale: [1.2, 1, 1.2],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{ perspective: "1000px" }}
                    />
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 10px rgba(6, 182, 212, 0.5)",
                          "0 0 30px rgba(6, 182, 212, 1)",
                          "0 0 10px rgba(6, 182, 212, 0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="3d-step2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-44 h-44 flex items-center justify-center relative"
                  >
                    <motion.div
                      className="absolute w-36 h-36 border-2 border-cyan-400/20 rounded-full"
                      animate={{ rotateZ: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-28 h-28 border-2 border-blue-400/30 rounded-full"
                      animate={{ rotateZ: [360, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-cyan-400 rounded-full"
                        animate={{
                          rotate: [0, 360],
                          x: [Math.cos((i * Math.PI) / 2) * 52, Math.cos((i * Math.PI) / 2 + 2 * Math.PI) * 52],
                          y: [Math.sin((i * Math.PI) / 2) * 52, Math.sin((i * Math.PI) / 2 + 2 * Math.PI) * 52],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    ))}
                    <motion.div
                      className="w-7 h-7 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 15px rgba(59, 130, 246, 0.5)",
                          "0 0 30px rgba(6, 182, 212, 1)",
                          "0 0 15px rgba(59, 130, 246, 0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="3d-step3"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-44 h-44 flex items-center justify-center relative"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-24 h-32 bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-400/40 rounded-lg shadow-lg"
                        animate={{
                          rotateY: [0, 360],
                          rotateZ: [i * 20 - 20, i * 20 + 340],
                          y: [Math.sin((i * Math.PI) / 1.5) * 26, Math.sin((i * Math.PI) / 1.5 + 2 * Math.PI) * 26],
                        }}
                        transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ perspective: "1000px" }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          {i === 0 ? "👤" : i === 1 ? "📧" : "📱"}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div
                    key="3d-step4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-44 h-44 flex items-center justify-center"
                  >
                    <motion.div
                      className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 opacity-20"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.3, 0.15],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute w-32 h-32 rounded-full border-2 border-cyan-400/40"
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ perspective: "1000px" }}
                    />
                    <motion.div
                      className="absolute w-24 h-24 rounded-full border border-blue-400/60"
                      animate={{ rotateX: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      style={{ perspective: "1000px" }}
                    />
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{
                          rotate: [i * 120, i * 120 + 360],
                          x: [Math.cos((i * Math.PI) / 1.5) * 44, Math.cos((i * Math.PI) / 1.5 + 2 * Math.PI) * 44],
                          y: [Math.sin((i * Math.PI) / 1.5) * 44, Math.sin((i * Math.PI) / 1.5 + 2 * Math.PI) * 44],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      />
                    ))}
                  </motion.div>
                )}
                {step === 5 && (
                  <motion.div
                    key="3d-step5"
                    initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0, rotateY: 90 }}
                    transition={{ duration: 0.8 }}
                    className="w-44 h-44 flex items-center justify-center"
                  >
                    <motion.div
                      className="absolute bottom-4 w-18 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                      animate={{ scaleX: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-2xl"
                      animate={{ rotateZ: [0, 5, -5, 0], y: [-10, -20, -10] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ perspective: "1000px" }}
                    />
                    <motion.div
                      className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-200 to-transparent opacity-60"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {Array.from({ length: 8 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        animate={{
                          x: [0, Math.cos((i * Math.PI) / 4) * 60],
                          y: [0, Math.sin((i * Math.PI) / 4) * 60],
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-5 max-w-xl text-center">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-blue-300" /> A Venture by iQue Global
              </div>
              <h2 className="text-5xl font-bold tracking-tight leading-tight">{getSidePanelContent().title}</h2>
              <p className="text-xl text-blue-100 max-w-lg font-light">{getSidePanelContent().subtitle}</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-3">
          {[1, 2, 3, 4, 5].map((idx) => (
            <motion.div 
              key={idx} 
              className={`relative rounded-full transition-all duration-500 ${
                step === idx 
                  ? "w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30" 
                  : "w-2 h-8 bg-white/30"
              }`}
              animate={step === idx ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0px rgba(6, 182, 212, 0)",
                  "0 0 20px rgba(6, 182, 212, 0.6)",
                  "0 0 0px rgba(6, 182, 212, 0)"
                ]
              } : {}}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {step === idx && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ background: 'conic-gradient(from 0deg, transparent, rgba(6, 182, 212, 0.3), transparent)' }}
                />
              )}
              {step > idx && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400 flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: Forms */}
      <main className="flex-grow flex flex-col relative bg-[#020617]">
        <div className="hidden lg:flex absolute top-8 right-12 z-20">
          <a href="/admin/login" className="px-5 py-2.5 bg-slate-900/90 border border-slate-700 text-slate-100 rounded-xl font-medium hover:text-white shadow-lg shadow-slate-950/50 flex items-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4" /> Admin Login
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
          <div className="w-full max-w-2xl">
            
            {step === 1 && (
              <AnimatePresence mode="wait">
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: 15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <motion.div 
                    className="text-cyan-300 font-bold text-sm uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Step 01
                  </motion.div>
                  <motion.h2 
                    className="text-2xl lg:text-3xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Are you ready to be part of something bigger?
                  </motion.h2>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mt-6 lg:mt-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button 
                      onClick={() => { updateData("is_interested", true); handleNext(); }} 
                      className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-700 bg-slate-900/95 hover:border-cyan-400 transition-all text-left shadow-xl shadow-slate-950/20 relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5,
                        z: 50,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        perspective: "1000px",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                          background: [
                            "radial-gradient(400px at 0% 0%, rgba(6, 182, 212, 0) 0%, transparent 100%)",
                            "radial-gradient(400px at 100% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 100%)",
                            "radial-gradient(400px at 0% 0%, rgba(6, 182, 212, 0) 0%, transparent 100%)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.span 
                        className="text-4xl block mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Zap className="w-8 h-8 text-cyan-400" />
                      </motion.span>
                      <div className="font-bold text-xl mb-2 text-white">Yes, tell me more</div>
                      <div className="text-slate-400">Awesome, let's dive into details!</div>
                    </motion.button>
                    <motion.button 
                      onClick={() => { updateData("is_interested", false); handleNext(); }} 
                      className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-700 bg-slate-900/95 hover:border-slate-600 transition-all text-left shadow-xl shadow-slate-950/20 relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: -5,
                        z: 50,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        perspective: "1000px",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                          background: [
                            "radial-gradient(400px at 100% 0%, rgba(100, 100, 120, 0) 0%, transparent 100%)",
                            "radial-gradient(400px at 0% 100%, rgba(100, 100, 120, 0.1) 0%, transparent 100%)",
                            "radial-gradient(400px at 100% 0%, rgba(100, 100, 120, 0) 0%, transparent 100%)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.span 
                        className="text-4xl block mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Eye className="w-8 h-8 text-slate-400" />
                      </motion.span>
                      <div className="font-bold text-xl mb-2 text-white">I&apos;m just exploring</div>
                      <div className="text-slate-400">No pressure. Take your time.</div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}

            {step === 2 && (
              <AnimatePresence mode="wait">
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: 15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <motion.div 
                    className="text-cyan-300 font-bold text-sm uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Step 02
                  </motion.div>
                  <motion.h2 
                    className="text-2xl lg:text-3xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Ready to join our ecosystem?
                  </motion.h2>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mt-6 lg:mt-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button 
                      onClick={() => { updateData("ecosystem", true); handleNext(); }} 
                      className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-700 bg-slate-900/95 hover:border-cyan-400 transition-all text-left shadow-xl shadow-slate-950/20 relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5,
                        z: 50,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        perspective: "1000px",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                          background: [
                            "radial-gradient(400px at 30% 20%, rgba(6, 182, 212, 0) 0%, transparent 100%)",
                            "radial-gradient(400px at 70% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 100%)",
                            "radial-gradient(400px at 30% 20%, rgba(6, 182, 212, 0) 0%, transparent 100%)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.span 
                        className="text-4xl block mb-4"
                        animate={{ 
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles className="w-8 h-8 text-cyan-400" />
                      </motion.span>
                      <div className="font-bold text-xl mb-2 text-white">Yes, I&apos;m in!</div>
                      <div className="text-slate-400">Let's build together.</div>
                    </motion.button>
                    <motion.button 
                      onClick={() => { updateData("ecosystem", false); handleNext(); }} 
                      className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-700 bg-slate-900/95 hover:border-slate-600 transition-all text-left shadow-xl shadow-slate-950/20 relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: -5,
                        z: 50,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        perspective: "1000px",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                          background: [
                            "radial-gradient(400px at 70% 30%, rgba(100, 100, 120, 0) 0%, transparent 100%)",
                            "radial-gradient(400px at 20% 70%, rgba(100, 100, 120, 0.1) 0%, transparent 100%)",
                            "radial-gradient(400px at 70% 30%, rgba(100, 100, 120, 0) 0%, transparent 100%)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.span 
                        className="text-4xl block mb-4"
                      >
                        <Clock className="w-8 h-8 text-slate-400" />
                      </motion.span>
                      <div className="font-bold text-xl mb-2 text-white">Not right now</div>
                      <div className="text-slate-400">Our doors are always open.</div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}

            {step === 3 && (
              <AnimatePresence mode="wait">
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: 15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <motion.div 
                    className="text-cyan-300 font-bold text-sm uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Step 03
                  </motion.div>
                  <motion.h2 
                    className="text-2xl lg:text-3xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Tell us about you
                  </motion.h2>
                  <motion.div 
                    className="space-y-4 lg:space-y-5 mt-6 lg:mt-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <User className="h-5 w-5 text-slate-400" />
                      </motion.div>
                      <motion.input 
                        type="text" 
                        placeholder="Full Name" 
                        value={formData.name} 
                        onChange={(e) => updateData("name", e.target.value)} 
                        className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 text-white rounded-2xl outline-none focus:border-cyan-400 transition-all duration-300 relative z-10"
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 pointer-events-none"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Phone className="h-5 w-5 text-slate-400" />
                      </motion.div>
                      <motion.input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={formData.phone} 
                        onChange={(e) => updateData("phone", e.target.value)} 
                        className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 text-white rounded-2xl outline-none focus:border-cyan-400 transition-all duration-300 relative z-10"
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 pointer-events-none"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                      />
                    </motion.div>
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Mail className="h-5 w-5 text-slate-400" />
                      </motion.div>
                      <motion.input 
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={(e) => updateData("email", e.target.value)} 
                        className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 text-white rounded-2xl outline-none focus:border-cyan-400 transition-all duration-300 relative z-10"
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 pointer-events-none"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="flex justify-end pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.button 
                      onClick={handleNext} 
                      disabled={!formData.name || !formData.phone} 
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-semibold flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/10"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(6, 182, 212, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      Continue 
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}

            {step === 4 && (
              <AnimatePresence mode="wait">
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: 15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <motion.div 
                    className="text-cyan-300 font-bold text-sm uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Step 04
                  </motion.div>
                  <motion.h2 
                    className="text-2xl lg:text-3xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Where Are You Based?
                  </motion.h2>
                  <motion.div 
                    className="grid gap-4 lg:gap-6 mt-6 lg:mt-8 p-6 lg:p-8 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/80 border border-slate-700/50 rounded-2xl lg:rounded-[2rem] shadow-2xl shadow-slate-950/20 relative overflow-visible"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Background Wrapper for overflow clipping of decorative elements only */}
                    <div className="absolute inset-0 rounded-2xl lg:rounded-[2rem] overflow-hidden pointer-events-none">
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: [
                            "radial-gradient(600px at 0% 0%, rgba(6, 182, 212, 0.05) 0%, transparent 100%)",
                            "radial-gradient(600px at 100% 100%, rgba(59, 130, 246, 0.05) 0%, transparent 100%)",
                            "radial-gradient(600px at 0% 0%, rgba(6, 182, 212, 0.05) 0%, transparent 100%)"
                          ]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      {/* Floating accent elements */}
                      <motion.div
                        className="absolute -top-10 -right-10 w-32 h-32 border border-cyan-400/20 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute -bottom-10 -left-10 w-40 h-40 border border-blue-400/20 rounded-full"
                        animate={{
                          scale: [1.2, 1, 1.2],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-cyan-300 mb-3 uppercase tracking-wider">📍 Select Your State</label>
                        <SearchableSelect label="State" placeholder="Search and select state..." value={formData.state} onChange={(val) => updateData("state", val)} icon={<MapPin className="w-5 h-5 text-cyan-400" />} options={uniqueIndianStates} />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-blue-300 mb-3 uppercase tracking-wider">🏙️ Select Your City</label>
                        <SearchableSelect label="City" placeholder="Search and select city..." value={formData.city} onChange={(val) => updateData("city", val)} icon={<Building2 className="w-5 h-5 text-blue-400" />} options={availableCities} />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex justify-between items-center gap-4 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.button 
                      onClick={() => setStep(3)}
                      className="px-6 py-4 text-slate-300 font-medium hover:text-white hover:border-slate-600 border border-slate-700/50 rounded-2xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Back
                    </motion.button>
                    <motion.button 
                      onClick={submitToSupabase} 
                      disabled={isSubmitting || !formData.state || !formData.city} 
                      className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-cyan-500/10 relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(6, 182, 212, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity"
                      />
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Profile"}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}

            {step === 5 && (
              <AnimatePresence mode="wait">
                <motion.div 
                  key="step5"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.2, rotateY: 90 }}
                  transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 100 }}
                  className="text-center space-y-8 bg-slate-950/95 p-12 rounded-[2rem] shadow-2xl border border-slate-800 relative overflow-hidden"
                >
                  {/* Animated background particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 15 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                  
                  <motion.div 
                    className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -360],
                      }}
                      transition={{ 
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 6, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      <CheckCircle className="w-12 h-12 text-cyan-400" />
                    </motion.div>
                    
                    {/* Sparkle effects */}
                    {Array.from({ length: 6 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transformOrigin: '0 0',
                        }}
                        animate={{
                          rotate: [0, 360],
                          x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                          y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                  
                  <motion.h2 
                    className="text-4xl font-extrabold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    You&apos;re All Set!
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg text-slate-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Welcome to the elite BISF ecosystem.
                  </motion.p>
                  
                  <motion.button 
                    onClick={onBackToHome} 
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-semibold hover:shadow-lg shadow-cyan-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(6, 182, 212, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(6, 182, 212, 0)",
                          "0 0 10px rgba(6, 182, 212, 0.5)",
                          "0 0 0px rgba(6, 182, 212, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Return Home
                    </motion.span>
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
