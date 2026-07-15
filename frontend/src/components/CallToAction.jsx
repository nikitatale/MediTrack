
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

import React from 'react'

const CallToAction = () => {

  const { user } = useAuth();

  return (
       <section id="cta" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-10">
        
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-plum2 via-plum to-ink px-8 py-16 text-center sm:px-16">
        
          <div className="pointer-events-none absolute -top-10 right-10 h-56 w-56 rounded-full bg-coral/20 blur-3xl" />
        
          <div className="pointer-events-none absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-mint/20 blur-3xl" />

          <h2 className="relative font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        
            Your next dose is already &nbsp;
        
             <span className="bg-gradient-to-r from-coral to-mint bg-clip-text text-transparent">
          
             taken care of.
            </span>
          </h2>

          <p className="relative mx-auto mt-4 max-w-md text-muted">
            Set up your first prescription in under two minutes - free, no card required.
          </p>

        <Link
  to={user ? "/dashboard" : "/auth"}
  className="relative mt-8 inline-block rounded-full bg-lavender px-8 py-3.5 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-105 hover:bg-white"
>
  {user ? "Go to dashboard" : "Create your account"}
</Link>
          
        </div>
      </section>
  )
}

export default CallToAction