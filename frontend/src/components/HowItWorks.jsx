import React from 'react'

const HowItWorks = () => {
  return (
         <section id="how-it-works" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="mb-14 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-coral">The loop</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps keep the whole cycle moving
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Scan your prescription",
              desc: "Snap a photo. MediTrack reads the dosage, timing, and duration for you — no manual typing.",
            },
            {
              n: "02",
              title: "Get reminded, right on time",
              desc: "Gentle nudges land exactly when each dose is due, and log whether you took it.",
            },
            {
              n: "03",
              title: "Auto-refill before you run out",
              desc: "When your supply runs low, a refill order is placed and delivered — no last-minute scramble.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="group rounded-2xl border border-white/10 bg-plum/40 p-7 transition-colors duration-300 hover:border-coral/30"
            >
              <span className="font-display text-4xl font-semibold text-white/10 transition-colors duration-300 group-hover:text-coral/40">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-lavender">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
  )
}

export default HowItWorks