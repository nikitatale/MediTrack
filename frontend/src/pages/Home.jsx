

import React from "react";

import Logo from "../components/Logo.jsx";

import Footer from "../components/Footer.jsx";

import CallToAction from "../components/CallToAction.jsx";
import Features from "../components/Features.jsx";

import { useAuth } from "../context/AuthContext.jsx";

import HowItWorks from "../components/HowItWorks.jsx";
import { Link } from "react-router-dom";

const Pill = ({ tone = "coral", className = "" }) => {
  const tones = {
    coral: "from-coral to-coral2",
    mint: "from-mint to-mint2",
  };
  return (
    <div
      className={`h-9 w-16 rounded-full bg-gradient-to-r ${tones[tone]} shadow-lg shadow-black/30 ring-1 ring-white/10 ${className}`}
    />
  );
};

const NavLink = ({ children, href = "#" }) => (
  <a
    href={href}
    className="text-sm text-muted hover:text-lavender transition-colors duration-200"
  >
    {children}
  </a>
);



export default function Home() {

  const { user } = useAuth();

  const marqueeItems = [
    "Prescription OCR Scan",
    "Smart Dose Reminders",
    "Adherence Insights",
    "Automatic Refill & Delivery",
  ];

  return (
    <div className="min-h-screen w-full bg-ink text-lavender font-body overflow-x-hidden selection:bg-coral selection:text-ink">
     
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-coral/20 blur-3xl animate-blob" />
        
        <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-mint/10 blur-3xl animate-blob [animation-delay:-6s]" />
        
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-plum2/60 blur-3xl animate-blob [animation-delay:-3s]" />
      </div>

    
      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        
          <Link to="/" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9 shrink-0" />
            <span className="font-display text-lg font-semibold tracking-tight">
              Medi<span className="text-coral">Track</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
        
            <NavLink href="#features">Features</NavLink>
        
            <NavLink href="#how-it-works">How it works</NavLink>
        
            <NavLink href={`${user ? "#cta" : "/auth"}`}>
            {user ? "Explore" : "Get started"}
            </NavLink>
          </div>
 
          <Link
  to={user ? "/dashboard" : "/auth"}
  className="rounded-full bg-lavender px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-105 hover:bg-white"
>
  {user ? "Go to dashboard" : "Sign up free"}
</Link>
        </nav>
      </header>

   
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-10 sm:px-10 sm:pt-16 lg:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
         
          <div className="animate-fade-in-up">
          
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-mint">
          
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" />
              Adherence, on autopilot
            </div>

            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[3.4rem] xl:text-6xl">
              Never miss a{" "}
          
              <span className="bg-gradient-to-r from-coral to-coral2 bg-clip-text text-transparent">
                dose.
              </span>
              <br />
              Never run{" "}
              <span className="bg-gradient-to-r from-mint to-mint2 bg-clip-text text-transparent">
                out.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Scan a prescription, and MediTrack builds your dose schedule,
              reminds you at the right minute, and reorders before the
              bottle runs empty - delivered to your door.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
             <Link
  to={user ? "/dashboard" : "/auth"}
  className="group relative overflow-hidden rounded-full bg-coral px-7 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-coral/30 transition-transform duration-200 hover:scale-105"
>
  {user ? "Go to dashboard" : "Start tracking free"}
</Link>
              <a
                href="#how-it-works"
                className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-lavender transition-colors duration-200 hover:border-mint/50 hover:text-mint"
              >
                See how it works
              </a>
            </div>

            
            <div className="mt-14 max-w-lg overflow-hidden border-y border-white/10 py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            
              <div className="flex w-max animate-marquee gap-10 font-mono text-xs uppercase tracking-widest text-muted">
                {[...marqueeItems, ...marqueeItems].map((item, i) => (
                  <span key={i} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="text-coral">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          
          <div className="relative flex h-[420px] items-center justify-center lg:h-[480px]">
            <Pill tone="coral" className="absolute left-2 top-6 rotate-[20deg] animate-float" />
            <Pill tone="mint" className="absolute right-4 top-16 -rotate-[15deg] animate-float-slow" />
            <Pill tone="mint" className="absolute bottom-10 left-8 rotate-[8deg] animate-float-slower" />
            <Pill tone="coral" className="absolute bottom-24 right-2 -rotate-[10deg] animate-float" />

            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-plum/60 p-8 backdrop-blur-sm shadow-2xl shadow-black/40">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Today's rhythm
              </p>

              <svg viewBox="0 0 400 140" className="mt-4 w-full">
                <path
                  d="M0 70 H70 L90 20 L110 120 L130 40 L150 90 L170 70 H230 L250 20 L270 120 L290 40 L310 90 L330 70 H400"
                  fill="none"
                  stroke="url(#pulseGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1400"
                  className="animate-draw-line"
                />
                <defs>
                  <linearGradient id="pulseGrad" x1="0" y1="0" x2="400" y2="0">
                    <stop offset="0%" stopColor="#FF6F4F" />
                    <stop offset="50%" stopColor="#6EE7B7" />
                    <stop offset="100%" stopColor="#FF9166" />
                  </linearGradient>
                </defs>
                {[90, 250].map((x, i) => (
                  <circle key={i} cx={x} cy="20" r="5" fill="#6EE7B7" className="animate-pulse-dot" />
                ))}
              </svg>

              <div className="mt-2 flex justify-between font-mono text-[11px] text-muted">
                <span>8:00 AM</span>
                <span>2:00 PM</span>
                <span>8:00 PM</span>
                <span>10:00 PM</span>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl border border-mint/20 bg-mint/5 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-lavender">Metformin · 500mg</p>
                  <p className="font-mono text-[11px] text-muted">next dose in 42 min</p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-mint animate-pulse-dot" />
              </div>
            </div>
          </div>
        </div>
      </section>



     <HowItWorks/>
  

      <Features/>

      
      <CallToAction/>
      
  
      <Footer/>
      
    </div>
  );
}
