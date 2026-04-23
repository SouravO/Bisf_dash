import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronDown,
  BookOpen,
  Globe,
  Menu,
  X,
} from "lucide-react";
import MoneyLoader from "./MoneyLoader";

// --- Components ---

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
  >
    {children}
  </motion.div>
);

export default function AppleLandingPage({
  onStartJourney,
}: {
  onStartJourney: () => void;
}) {
  const containerRef = useRef(null);
  const bookSectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });

  // Hero Transforms
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Book Animation Transforms
  const { scrollYProgress: bookScroll } = useScroll({
    target: bookSectionRef,
    offset: ["start end", "end start"],
  });

  const bookRotate = useTransform(bookScroll, [0.3, 0.6], [0, -155]);
  const bookScale = useTransform(bookScroll, [0.2, 0.4], [0.8, 1]);

  return (
    <>
      {/* 1. PREMIUM NAVBAR */}
      <nav 
        className="fixed top-0 left-0 right-0 w-full z-[10000] bg-[#050505]/90 backdrop-blur-md border-b border-white/10 h-16 lg:h-24 flex items-center"
      >
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center flex-shrink-0">
            <img
              src="/logos.png"
              alt="BISF"
              className="h-10 lg:h-20 w-auto transition-transform hover:scale-105"
            />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-12 text-base font-semibold tracking-wide text-white/70">
            <a
              href="#vision"
              className="hover:text-white transition-colors duration-200"
            >
              Vision
            </a>
            <a
              href="#services"
              className="hover:text-white transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors duration-200"
            >
              Connect
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Get Started Button */}
            <div className="hidden lg:block">
              <button
                onClick={onStartJourney}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 lg:px-7 lg:py-3 rounded-xl font-bold transition-all hover:shadow-blue-500/50 hover:shadow-2xl text-xs lg:text-base whitespace-nowrap"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 overflow-hidden lg:hidden"
            >
              <div className="px-4 py-8 flex flex-col gap-6 items-center">
                <a
                  href="#vision"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                >
                  Vision
                </a>
                <a
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                >
                  Services
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                >
                  Connect
                </a>
                <button
                  onClick={() => {
                    onStartJourney();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold text-center"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {isLoading && <MoneyLoader />}

      <div
        ref={containerRef}
        className="bg-black text-white selection:bg-blue-600 font-sans antialiased"
      >
        {/* 2. HERO */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-16 lg:pt-0">
          <motion.div
            style={{ y: textY, opacity: heroOpacity }}
            className="z-10 px-4 sm:px-6 lg:px-6"
          >
            <h1 className="text-[clamp(2.5rem,12vw,8rem)] lg:text-[clamp(3rem,10vw,8rem)] font-bold tracking-tighter leading-none mb-4 lg:mb-6">
              Bharat Innovations & Startups Facilitator
            </h1>
            <p className="text-lg sm:text-xl lg:text-xl text-white/50 max-w-3xl mx-auto font-medium px-4">
              A Full-Stack Startup Facilitator – Building India’s Next
              Generation of Entrepreneurs.
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <span className="text-xs tracking-[0.3em] uppercase text-blue-500 font-bold">
                Led by CEO Jirlo Jayan
              </span>
              <span className="text-white/30 text-sm">
                Backed by iQue Ventures
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{ scale: heroScale }}
            className="absolute inset-0 z-0 opacity-40"
          >
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
              alt="Abstract Tech"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute bottom-10 animate-bounce text-white/20">
            <ChevronDown size={32} />
          </div>
        </section>

        {/* 3. VISION & MISSION: THE OPENING BOOK */}
        <section
          id="vision"
          ref={bookSectionRef}
          className="relative h-[150vh] lg:h-[200vh] bg-black"
        >
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <motion.div
              style={{ scale: bookScale, perspective: "2000px" }}
              className="relative w-[98%] md:w-[95%] max-w-4xl lg:w-[90%] lg:max-w-5xl aspect-[4/5] md:aspect-[16/9] flex"
            >
              {/* LEFT PAGE (VISION) */}
              <div className="flex-1 bg-[#1D1D1F] border border-white/10 rounded-l-2xl md:rounded-l-3xl p-4 md:p-16 flex flex-col justify-center shadow-2xl">
                <h2 className="text-blue-500 font-bold tracking-widest uppercase text-[10px] md:text-sm mb-2 md:mb-6">
                  The Vision
                </h2>
                <p className="text-lg md:text-4xl font-bold leading-tight tracking-tight">
                  To establish India as a{" "}
                  <span className="text-white/40">
                    dominant global startup hub
                  </span>{" "}
                  by providing knowledge, infrastructure, and capital.
                </p>
              </div>

              {/* RIGHT PAGE (REVEALED MISSION) */}
              <div className="flex-1 bg-[#1D1D1F] border border-white/10 rounded-r-2xl md:rounded-r-3xl p-4 md:p-16 flex flex-col justify-center shadow-inner">
                <h2 className="text-blue-500 font-bold tracking-widest uppercase text-[10px] md:text-sm mb-2 md:mb-6">
                  The Mission
                </h2>
                <p className="text-sm md:text-2xl font-medium text-white/80 leading-relaxed">
                  To identify, educate, build, and scale startups through a
                  practical, structured approach—transforming ideas into viable
                  businesses.
                </p>
              </div>

              {/* THE COVER / FLIPPING PAGE */}
              <motion.div
                style={{
                  rotateY: bookRotate,
                  transformOrigin: "left",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
                className="absolute right-0 w-1/2 h-full z-50 origin-left"
              >
                {/* Front Side (Cover) */}
                <div
                  className="absolute inset-0 bg-blue-600 rounded-r-2xl md:rounded-r-3xl flex flex-col items-center justify-center p-4 md:p-10 shadow-2xl border-l border-white/20"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <BookOpen className="mb-4 md:mb-8 opacity-50 w-12 h-12 md:w-20 md:h-20" />
                  <h3 className="text-2xl md:text-5xl font-black italic tracking-tighter">
                    THE CORE
                  </h3>
                  <p className="mt-2 md:mt-4 text-white/60 font-medium text-[10px] md:text-base text-center">
                    Scroll to reveal our roadmap
                  </p>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 bg-[#2C2C2E] rounded-l-2xl md:rounded-l-3xl flex items-center justify-center p-4 md:p-10 border-r border-white/10"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-center opacity-20">
                    <h4 className="text-xs md:text-2xl font-bold">
                      BISF STRATEGY
                    </h4>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4. THE "BENTO" STORY (ABOUT & CORE OBJECTIVES) */}
        <section
          id="about"
          className="py-20 lg:py-32 px-4 lg:px-6 max-w-[1200px] mx-auto"
        >
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl xl:text-6xl font-bold tracking-tight mb-12 lg:mb-20 text-center">
              Bridging the gap between <br />{" "}
              <span className="text-blue-500">
                raw ideas and global success.
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="sm:col-span-2 lg:col-span-8 bg-[#1D1D1F] rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-12 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <Users className="text-blue-500 mb-4 lg:mb-6" size={32} />
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
                  iQue Ventures Backbone
                </h3>
                <p className="text-white/40 max-w-sm text-sm lg:text-lg">
                  Leveraging the experience and network of iQue Ventures to
                  provide venture building and strategic consulting.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                className="absolute bottom-0 right-0 w-2/3 lg:w-2/3 opacity-20 group-hover:opacity-40 transition-opacity"
                alt="Cyber"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 0.98 }}
              className="sm:col-span-2 lg:col-span-4 bg-[#1D1D1F] rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-10 flex flex-col justify-end border border-white/5"
            >
              <Zap className="text-orange-500 mb-4 lg:mb-6" size={28} />
              <h3 className="text-xl lg:text-2xl font-bold mb-2">
                Educate & Empower
              </h3>
              <p className="text-white/40 text-xs lg:text-sm">
                Providing aspiring entrepreneurs with the knowledge to lead.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 0.98 }}
              className="sm:col-span-2 lg:col-span-4 bg-blue-600 rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-10 text-white"
            >
              <Globe className="mb-4 lg:mb-6" size={28} />
              <h3 className="text-xl lg:text-2xl font-bold mb-2">
                Global Expansion
              </h3>
              <p className="text-white/80 text-xs lg:text-sm">
                Enabling entry into international markets and attracting global
                capital.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 0.98 }}
              onClick={onStartJourney}
              className="sm:col-span-2 lg:col-span-8 bg-white text-black rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-10 flex flex-col sm:flex-row items-center justify-between cursor-pointer group"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="text-2xl lg:text-3xl font-bold">
                  Scaling India's Potential?
                </h3>
                <p className="text-black/50">
                  Join the full-stack ecosystem built for Bharat.
                </p>
              </div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="text-white" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. SERVICES (CORE OFFERINGS) */}
        <section
          id="services"
          className="bg-[#f5f5f7] text-black py-20 lg:py-32 rounded-2xl lg:rounded-[4rem] mx-4 lg:mx-0"
        >
          <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">
                  Core Offerings
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mt-4 lg:mt-6 mb-6 lg:mb-8">
                  Full-Stack Facilitation.
                </h2>
                <p className="text-black/60 text-lg">
                  Guided by a panel of industry experts and business strategists
                  to ensure market access and scale.
                </p>
              </div>
              <div className="space-y-8 lg:space-y-12">
                {[
                  {
                    title: "Entrepreneur Education",
                    desc: "Workshops for foundational startup knowledge.",
                  },
                  {
                    title: "Venture Building",
                    desc: "Support for idea validation and product development.",
                  },
                  {
                    title: "Startup Infrastructure",
                    desc: "Collaborative and physical innovation spaces.",
                  },
                  {
                    title: "Scaling & Consulting",
                    desc: "Guidance for sales, marketing, and expansion.",
                  },
                  {
                    title: "Capital Access",
                    desc: "Connecting founders with global funding networks.",
                  },
                  {
                    title: "Global Expansion",
                    desc: "Facilitating entry into international markets.",
                  },
                ].map((service, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="flex gap-4 lg:gap-6 border-b border-black/5 pb-6 lg:pb-8">
                      <ShieldCheck
                        className="text-blue-600 flex-shrink-0 mt-1"
                        size={20}
                      />
                      <div>
                        <p className="text-lg lg:text-xl font-bold text-black/90">
                          {service.title}
                        </p>
                        <p className="text-sm lg:text-base text-black/50">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="py-20 lg:py-32 px-4 lg:px-6">
          <div className="max-w-[1200px] mx-auto bg-[#1D1D1F] rounded-2xl lg:rounded-[3rem] p-6 lg:p-12 xl:p-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl xl:text-7xl font-bold tracking-tighter mb-6 lg:mb-8">
                Empower. <br /> Scale. Connect.
              </h2>
              <div className="space-y-3 lg:space-y-4 text-white/50 text-sm lg:text-base">
                <p className="flex items-center justify-center lg:justify-start gap-3">
                  <Mail size={16} className="lg:w-5 lg:h-5" />{" "}
                  info@bisf-india.com
                </p>
                <p className="flex items-center justify-center lg:justify-start gap-3">
                  <Phone size={16} className="lg:w-5 lg:h-5" /> +91 90361 54395
                </p>
                <p className="flex items-center justify-center lg:justify-start gap-3">
                  <MapPin size={16} className="lg:w-5 lg:h-5" /> Bangalore,
                  India
                </p>
                <p className="mt-6 text-blue-500 font-semibold italic">
                  “Connecting India to the World.”
                </p>
              </div>
            </div>
            <div className="flex-1 w-full space-y-4">
              <input
                type="text"
                placeholder="Startup Name"
                className="w-full bg-black/40 border border-white/10 p-4 lg:p-5 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-black/40 border border-white/10 p-4 lg:p-5 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"
              />
              <textarea
                placeholder="How can we help you scale?"
                rows={4}
                className="w-full bg-black/40 border border-white/10 p-4 lg:p-5 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"
              ></textarea>
              <button className="w-full py-4 lg:py-5 bg-white text-black font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all text-sm lg:text-base">
                Send Inquiry
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative bg-gradient-to-b from-black to-[#0a0a0a] border-t border-white/5 pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="sm:col-span-2 lg:col-span-1"
              >
                <img
                  src="/logos.png"
                  alt="BISF"
                  className="h-20 lg:h-30 mb-4 lg:mb-6 hover:scale-110 transition-transform"
                />
                <p className="text-white/50 text-sm leading-relaxed">
                  Bharat Innovations & Startups Facilitator LLP (BISF).
                  Strengthening India’s global position in the startup
                  ecosystem.
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-bold mb-4 lg:mb-6 text-sm uppercase tracking-widest">
                  Explore
                </h4>
                <ul className="space-y-3">
                  {["Vision", "Services", "Connect"].map((item, i) => (
                    <li key={i}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-white/50 hover:text-blue-400 transition-colors text-sm group inline-flex items-center gap-2"
                      >
                        <span className="w-0 h-px bg-blue-400 group-hover:w-3 transition-all"></span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-bold mb-4 lg:mb-6 text-sm uppercase tracking-widest">
                  Company
                </h4>
                <ul className="space-y-3">
                  {["About", "Advisory Board", "Global Presence"].map(
                    (item, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-white/50 hover:text-blue-400 transition-colors text-sm group inline-flex items-center gap-2"
                        >
                          <span className="w-0 h-px bg-blue-400 group-hover:w-3 transition-all"></span>
                          {item}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-bold mb-4 lg:mb-6 text-sm uppercase tracking-widest">
                  Connect
                </h4>
                <div className="flex gap-4 lg:gap-6">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/bisf.ventures?igsh=MWtvb242OXlzNWFxeg%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-pink-400 transition-colors duration-200 group"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/bisf-ventures/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-blue-400 transition-colors duration-200 group"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.736 0-9.643h3.554v1.364c.429-.66 1.191-1.603 2.926-1.603 2.144 0 3.748 1.404 3.748 4.423v5.459zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.704 0-.951.768-1.704 1.959-1.704 1.188 0 1.914.75 1.939 1.704 0 .946-.751 1.704-1.983 1.704zm1.586 11.019H3.756V9.809h3.167v10.643zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/1FV3hKDa2c/?mibextid=wwXIfr"
                    target="_blank"
                    threl="noopener noreferrer"
                    className="text-white/50 hover:text-blue-500 transition-colors duration-200 group"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-between gap-4 lg:gap-6"
            >
              <p className="text-white/40 text-xs tracking-widest uppercase text-center">
                © 2026 Bharat Innovations & Startups Facilitator LLP
              </p>
              <p className="text-white/40 text-xs text-center">
                A Venture Backed by iQue Ventures
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
}
