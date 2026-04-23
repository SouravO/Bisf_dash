import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ShieldCheck, Zap, Users, BarChart3, Mail, Phone, MapPin, ArrowRight, ChevronDown, BookOpen } from "lucide-react";

// --- Components ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
  >
    {children}
  </motion.div>
);

export default function AppleLandingPage({ onStartJourney }: { onStartJourney: () => void }) {
  const containerRef = useRef(null);
  const bookSectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Hero Transforms
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Book Animation Transforms
  const { scrollYProgress: bookScroll } = useScroll({
    target: bookSectionRef,
    offset: ["start end", "end start"]
  });

  // Rotates the page from 0 to -150 degrees to "open" the book
  const bookRotate = useTransform(bookScroll, [0.3, 0.6], [0, -155]);
  const bookScale = useTransform(bookScroll, [0.2, 0.4], [0.8, 1]);

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-blue-600 font-sans antialiased">
      
      {/* 1. PREMIUM NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] backdrop-blur-2xl bg-gradient-to-b from-black/60 to-black/40 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-24 flex items-center justify-between">
          <img src="/logos.png" alt="BISF" className="h-12 lg:h-24 transition-transform hover:scale-110 drop-shadow-lg" />
          <div className="hidden lg:flex gap-12 text-base font-semibold tracking-wide text-white/70">
            <a href="#vision" className="hover:text-white transition-colors duration-200">Vision</a>
            <a href="#services" className="hover:text-white transition-colors duration-200">Services</a>
            <a href="#contact" className="hover:text-white transition-colors duration-200">Connect</a>
          </div>
          <button 
            onClick={onStartJourney}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 lg:px-7 lg:py-3 rounded-xl font-bold transition-all hover:shadow-blue-500/50 hover:shadow-2xl text-sm lg:text-base"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-16 lg:pt-0">
        <motion.div style={{ y: textY, opacity: heroOpacity }} className="z-10 px-4 sm:px-6 lg:px-6">
          <h1 className="text-[clamp(2.5rem,12vw,8rem)] lg:text-[clamp(3rem,10vw,8rem)] font-bold tracking-tighter leading-none mb-4 lg:mb-6">
            Bharat Innovations.
          </h1>
          <p className="text-lg sm:text-xl lg:text-xl text-white/50 max-w-2xl mx-auto font-medium px-4">
            Bridging groundbreaking ideas with strategic capital.
          </p>
        </motion.div>

        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
            alt="Abstract Tech"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute bottom-10 animate-bounce text-white/20"><ChevronDown size={32} /></div>
      </section>

      {/* 3. VISION & MISSION: THE OPENING BOOK */}
      <section id="vision" ref={bookSectionRef} className="relative h-[150vh] lg:h-[200vh] bg-black">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ scale: bookScale, perspective: "2000px" }}
            className="relative w-[95%] max-w-4xl lg:w-[90%] lg:max-w-5xl aspect-[16/9] flex scale-90 lg:scale-100"
          >
            {/* LEFT PAGE (VISION) - Static inside */}
            <div className="flex-1 bg-[#1D1D1F] border border-white/10 rounded-l-3xl p-8 md:p-16 flex flex-col justify-center shadow-2xl">
              <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-6">The Vision</h2>
              <p className="text-2xl md:text-5xl font-bold leading-tight tracking-tight">
                To be the <span className="text-white/40">catalyst</span> that transforms India into a global innovation powerhouse.
              </p>
            </div>

            {/* RIGHT PAGE (REVEALED MISSION) - Static inside */}
            <div className="flex-1 bg-[#1D1D1F] border border-white/10 rounded-r-3xl p-8 md:p-16 flex flex-col justify-center shadow-inner">
              <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-6">The Mission</h2>
              <p className="text-xl md:text-3xl font-medium text-white/80 leading-relaxed">
                Empowering founders with strategic capital and mentorship to scale solutions for the next billion.
              </p>
            </div>

            {/* THE COVER / FLIPPING PAGE */}
            <motion.div
              style={{ 
                rotateY: bookRotate,
                transformOrigin: "left",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d"
              }}
              className="absolute right-0 w-1/2 h-full z-50 origin-left"
            >
              {/* Front Side (Cover) */}
              <div 
                className="absolute inset-0 bg-blue-600 rounded-r-3xl flex flex-col items-center justify-center p-10 shadow-2xl border-l border-white/20"
                style={{ backfaceVisibility: "hidden" }}
              >
                <BookOpen size={80} className="mb-8 opacity-50" />
                <h3 className="text-5xl font-black italic tracking-tighter">OUR STORY</h3>
                <p className="mt-4 text-white/60 font-medium">Scroll to open</p>
              </div>

              {/* Back Side (The inside of the cover, mirrored) */}
              <div 
                className="absolute inset-0 bg-[#2C2C2E] rounded-l-3xl flex items-center justify-center p-10 border-r border-white/10"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <div className="text-center opacity-20">
                  <h4 className="text-2xl font-bold">BISF STRATEGY</h4>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. THE "BENTO" STORY (ABOUT) */}
      <section id="about" className="py-20 lg:py-32 px-4 lg:px-6 max-w-[1200px] mx-auto">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl xl:text-6xl font-bold tracking-tight mb-12 lg:mb-20 text-center">
            Building the Infrastructure for <br/> <span className="text-blue-500">Tomorrow's Unicorns.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
          <motion.div whileHover={{ scale: 0.98 }} className="sm:col-span-2 lg:col-span-8 bg-[#1D1D1F] rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <Users className="text-blue-500 mb-4 lg:mb-6" size={32} />
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Visionary Network</h3>
              <p className="text-white/40 max-w-sm text-sm lg:text-lg">Access a curated network through iQue Global.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" className="absolute bottom-0 right-0 w-2/3 lg:w-2/3 opacity-20 group-hover:opacity-40 transition-opacity" alt="Cyber" />
          </motion.div>

          <motion.div whileHover={{ scale: 0.98 }} className="sm:col-span-2 lg:col-span-4 bg-[#1D1D1F] rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-10 flex flex-col justify-end border border-white/5">
            <Zap className="text-orange-500 mb-4 lg:mb-6" size={28} />
            <h3 className="text-xl lg:text-2xl font-bold mb-2">Strategic Capital</h3>
            <p className="text-white/40 text-xs lg:text-sm">Smart money that brings mentorship.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 0.98 }} className="sm:col-span-2 lg:col-span-4 bg-blue-600 rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-10 text-white">
            <BarChart3 className="mb-4 lg:mb-6" size={28} />
            <h3 className="text-xl lg:text-2xl font-bold mb-2">Local Impact</h3>
            <p className="text-white/80 text-xs lg:text-sm">Driving innovation across Bharat.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 0.98 }} onClick={onStartJourney} className="sm:col-span-2 lg:col-span-8 bg-white text-black rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-10 flex flex-col sm:flex-row items-center justify-between cursor-pointer group">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-2xl lg:text-3xl font-bold">Ready to Scale?</h3>
              <p className="text-black/50">Join the ecosystem today.</p>
            </div>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight className="text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section id="services" className="bg-[#f5f5f7] text-black py-20 lg:py-32 rounded-2xl lg:rounded-[4rem] mx-4 lg:mx-0">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Services</span>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mt-4 lg:mt-6 mb-6 lg:mb-8">Comprehensive Support.</h2>
            </div>
            <div className="space-y-8 lg:space-y-12">
              {["Fundraising facilitation", "Strategic mentorship", "Investor relations", "Ecosystem networking", "Go-to-market strategy"].map((service, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-4 lg:gap-6 border-b border-black/5 pb-6 lg:pb-8">
                    <ShieldCheck className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <p className="text-lg lg:text-xl font-medium text-black/80">{service}</p>
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
            <h2 className="text-3xl lg:text-5xl xl:text-7xl font-bold tracking-tighter mb-6 lg:mb-8">Let's build <br/> the future.</h2>
            <div className="space-y-3 lg:space-y-4 text-white/50 text-sm lg:text-base">
              <p className="flex items-center justify-center lg:justify-start gap-3"><Mail size={16} className="lg:w-5 lg:h-5"/> hello@bisf.co</p>
              <p className="flex items-center justify-center lg:justify-start gap-3"><Phone size={16} className="lg:w-5 lg:h-5"/> +91 (800) 123-4567</p>
              <p className="flex items-center justify-center lg:justify-start gap-3"><MapPin size={16} className="lg:w-5 lg:h-5"/> Ahmedabad, India</p>
            </div>
          </div>
          <div className="flex-1 w-full space-y-4">
            <input type="text" placeholder="Name" className="w-full bg-black/40 border border-white/10 p-4 lg:p-5 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm lg:text-base" />
            <input type="email" placeholder="Email" className="w-full bg-black/40 border border-white/10 p-4 lg:p-5 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm lg:text-base" />
            <textarea placeholder="Tell us about your venture" rows={4} className="w-full bg-black/40 border border-white/10 p-4 lg:p-5 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm lg:text-base"></textarea>
            <button className="w-full py-4 lg:py-5 bg-white text-black font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all text-sm lg:text-base">Send Inquiry</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-b from-black to-[#0a0a0a] border-t border-white/5 pt-20 pb-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* Brand */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <img src="/logos.png" alt="BISF" className="h-20 lg:h-30 mb-4 lg:mb-6 hover:scale-110 transition-transform" />
              <p className="text-white/50 text-sm leading-relaxed">Bridging groundbreaking ideas with strategic capital for India's next generation of unicorns.</p>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-4 lg:mb-6 text-sm uppercase tracking-widest">Explore</h4>
              <ul className="space-y-3">
                {["Vision", "Services", "Connect"].map((item, i) => (
                  <li key={i}>
                    <a href={`#${item.toLowerCase()}`} className="text-white/50 hover:text-blue-400 transition-colors text-sm group inline-flex items-center gap-2">
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
              <h4 className="text-white font-bold mb-4 lg:mb-6 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-white/50 hover:text-blue-400 transition-colors text-sm group inline-flex items-center gap-2">
                      <span className="w-0 h-px bg-blue-400 group-hover:w-3 transition-all"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-4 lg:mb-6 text-sm uppercase tracking-widest">Connect</h4>
              <div className="flex gap-3 lg:gap-4">
                {[
                  {
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/company/bisf-ventures/",
                    icon: (
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8.5H4.8V24H.2V8.5zM7.8 8.5H12.2V10.7H12.26C12.98 9.44 14.74 8.2 17.06 8.2 21.54 8.2 24 10.82 24 15.6V24H19.4V16.5C19.4 13.9 18.9 12.1 16.6 12.1 14.26 12.1 13.8 13.9 13.8 16.3V24H9.2V8.5H7.8z" />
                      </svg>
                    )
                  },
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/bisf.ventures?igsh=MWtvb242OXlzNWFxeg%3D%3D&utm_source=qr",
                    icon: (
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                      </svg>
                    )
                  },
                  {
                    name: "Facebook",
                    href: "https://www.facebook.com/share/1FV3hKDa2c/?mibextid=wwXIfr",
                    icon: (
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.462.098 2.794.142v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.312h3.588l-.467 3.696h-3.121V24h6.116C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
                      </svg>
                    )
                  }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-blue-400 hover:text-blue-400 transition-colors"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between gap-4 lg:gap-6"
          >
            <p className="text-white/40 text-xs tracking-widest uppercase text-center">
              © 2026 Bharat Innovations & Startups Facilitator
            </p>
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 text-xs text-white/40">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
            <p className="text-white/40 text-xs text-center">A Venture by iQue Global</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}