
import Logo from "../components/Logo.jsx";

import React from 'react'

const Footer = () => {
  return (
          <footer className="relative z-10 mx-auto max-w-7xl px-6 py-10 sm:px-10">
            <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
              <a href="#" className="flex items-center gap-2.5">
                <Logo className="h-7 w-7" />
                <span className="font-display text-sm font-semibold">
                  Medi<span className="text-coral">Track</span>
                </span>
              </a>
              <p className="font-mono text-xs text-muted">
                © {new Date().getFullYear()} MediTrack. Built for staying on schedule.
              </p>
            </div>
          </footer>
  )
}

export default Footer