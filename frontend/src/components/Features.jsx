import React from 'react'


const IconScan = (props) => (
 <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.6"
  strokeLinecap="round"
  strokeLinejoin="round"
  width="24"
  height="24"
  {...props}
>
  <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
  <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
  <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
  <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
  <path d="M4 12h16" strokeDasharray="1 3.2" />
  <rect x="9" y="9" width="6" height="6" rx="1" />
</svg>
);

const IconBell = (props) => (
  <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.6"
  strokeLinecap="round"
  strokeLinejoin="round"
  {...props}
>
  <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" />
  <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0" />
  <circle cx="17.5" cy="6" r="1.4" fill="currentColor" stroke="none" />
</svg>
);

const IconChart = (props) => (
  <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.6"
  strokeLinecap="round"
  strokeLinejoin="round"
  {...props}
>
  <path d="M4 20V10" />
  <path d="M10 20V4" />
  <path d="M16 20v-7" />
  <path d="M20 20v-3.5" />
  <path d="M3 20h18" />
</svg>
);

const IconTruck = (props) => (
  <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.6"
  strokeLinecap="round"
  strokeLinejoin="round"
  {...props}
>
  <path d="M3 7h10v9H3z" />
  <path d="M13 11h4l3 3v2h-7z" />
  <circle cx="7" cy="18.5" r="1.6" />
  <circle cx="17" cy="18.5" r="1.6" />
</svg>
);

const Features = () => {
  return (
          <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="mb-14 max-w-xl">
          
          <p className="font-mono text-xs uppercase tracking-widest text-mint">Inside the app</p>
          
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Built around the moments care actually happens
          </h2>
        
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {[
            { icon: IconScan, tone: "coral", title: "Prescription scan", desc: "OCR turns a photo into a structured dose schedule in seconds." },
            { icon: IconBell, tone: "mint", title: "Smart reminders", desc: "Timed nudges that adapt to each medicine's own schedule." },
            { icon: IconChart, tone: "coral", title: "Adherence insights", desc: "Streaks and trends that show your consistency at a glance." },
            { icon: IconTruck, tone: "mint", title: "Auto-delivery", desc: "Refills ordered and shipped before your supply hits zero." },
          ].map(({ icon: Icon, tone, title, desc }) => (
           
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-plum/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-plum/60"
            >

              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                  tone === "coral" ? "bg-coral/15 text-coral" : "bg-mint/15 text-mint"
                }`}
              >

                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 font-display text-base font-semibold text-lavender">{title}</h3>
             
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

  )
}

export default Features