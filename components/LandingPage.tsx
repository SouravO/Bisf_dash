import React from "react";
import StartJourneyButton from "./StartJourneyButton";
import { ShieldCheck, Zap, Users, BarChart3, Mail, Phone, MapPin, Sparkles } from "lucide-react";

interface LandingPageProps {
  onStartJourney: () => void;
}

export default function LandingPage({ onStartJourney }: LandingPageProps) {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logos.png" alt="BISF Logo" className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-slate-600 hover:text-[#2B2E7E] transition-colors">Home</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-[#2B2E7E] transition-colors">About</a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-[#2B2E7E] transition-colors">Services</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-[#2B2E7E] transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
             <a href="/admin/login" className="text-slate-600 hover:text-[#2B2E7E] p-2">
                <ShieldCheck className="w-6 h-6" />
             </a>
             <button 
               onClick={onStartJourney}
               className="bg-[#2B2E7E] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1a1c4b] transition-all"
             >
               Get Started
             </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Home) */}
      <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#2B2E7E]/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2B2E7E] text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Empowering India's Startup Ecosystem
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Bharat Innovations &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B2E7E] to-blue-500">
                Startups Facilitator
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
              We bridge the gap between groundbreaking ideas and the capital needed to scale them. Join the elite network of founders and investors.
            </p>
            <div className="pt-4">
              <StartJourneyButton onClick={onStartJourney} />
            </div>
          </div>
          <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000">
            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
               <img src="/logos.png" alt="BISF Branding" className="w-full h-auto rounded-2xl" />
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-[#2B2E7E] uppercase tracking-widest mb-4">About Us</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Building the Infrastructure for Tomorrow's Unicorns</h3>
            <p className="text-lg text-slate-600">
              BISF is a venture by iQue Global, dedicated to fostering innovation across India. We provide a platform where visionary founders meet strategic investors to create lasting value.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Visionary Network", desc: "Access to a curated group of founders and industry leaders.", icon: <Users className="w-6 h-6" /> },
              { title: "Strategic Capital", desc: "Smart money that brings mentorship and market access.", icon: <Zap className="w-6 h-6" /> },
              { title: "Local Impact", desc: "Driving innovation in every corner of the Bharat ecosystem.", icon: <BarChart3 className="w-6 h-6" /> }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#2B2E7E] mb-6 group-hover:bg-[#2B2E7E] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Our Services</h2>
              <h3 className="text-4xl font-bold mb-8 leading-tight">Comprehensive Support for the Startup Lifecycle</h3>
              <div className="space-y-6">
                {[
                  "Fundraising facilitation for early-stage startups",
                  "Strategic mentorship and business advisory",
                  "Investor relation management and reporting",
                  "Ecosystem networking and partnership building",
                  "Go-to-market strategy for diverse Indian markets"
                ].map((service, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-500/20 p-1 rounded-full text-blue-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p className="text-slate-300 text-lg">{service}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl">
              <h4 className="text-2xl font-bold mb-6">Ready to scale your innovation?</h4>
              <p className="text-slate-400 mb-8">Join the BISF ecosystem today and gain access to the resources you need to build the next big thing.</p>
              <button 
                onClick={onStartJourney}
                className="w-full py-4 bg-white text-[#2B2E7E] rounded-xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#2B2E7E] rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
                <p className="text-blue-100 text-lg mb-12 max-w-md">
                  Have questions about how we can help you? Our team is ready to support your journey.
                </p>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-blue-200 text-sm">Email Us</div>
                      <div className="text-xl font-medium">hello@bisf.co</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-blue-200 text-sm">Call Us</div>
                      <div className="text-xl font-medium">+91 (800) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-blue-200 text-sm">Location</div>
                      <div className="text-xl font-medium">Ahmedabad, Gujarat, India</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 lg:p-10 text-slate-900">
                <h4 className="text-2xl font-bold mb-6">Quick Inquiry</h4>
                <div className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B2E7E]" />
                  <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B2E7E]" />
                  <textarea placeholder="Message" rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#2B2E7E]"></textarea>
                  <button className="w-full py-4 bg-[#2B2E7E] text-white rounded-xl font-bold hover:bg-[#1a1c4b] transition-all">Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-8">
          <img src="/logos.png" alt="BISF Logo" className="h-8 w-auto opacity-50 grayscale" />
          <div className="text-slate-500 text-sm">
            © 2026 Bharat Innovations & Startups Facilitator. A Venture by iQue Global.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-[#2B2E7E]">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-[#2B2E7E]">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-[#2B2E7E]">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
