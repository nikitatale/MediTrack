

import React from "react";

import { Link } from "react-router-dom";

import Logo from "../components/Logo.jsx";

import {  Ghost, HousePlus } from "lucide-react";


export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-ink px-6 text-center font-body text-lavender">
      
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-coral/20 blur-3xl animate-blob" />
        <div className="absolute bottom-0 -right-24 h-[26rem] w-[26rem] rounded-full bg-mint/10 blur-3xl animate-blob [animation-delay:-6s]" />
      </div>

      <div className="flex items-center gap-7">
       <Link to="/">
        <Logo className="relative z-10 h-12 w-12" />
       </Link>

  <Link
    to="/"
    className="text-sm text-muted transition-colors hover:text-lavender"
  >
    <HousePlus className="h-5 w-5" />
  </Link>
</div>

      <div className="relative z-10">
        <p className="flex items-center justify-center gap-3 font-display text-6xl font-semibold bg-gradient-to-r from-coral to-mint bg-clip-text text-transparent">
  <span>404</span>
  <Ghost className="h-16 w-16 text-[#6EE7B7]" />
</p>
        <h1 className="mt-3 font-display text-xl font-semibold">
          This page missed its dose.
        </h1>
        <p className="mt-2 text-sm text-muted">
          The page you're looking for doesn't exist.
        </p>
      </div>

      <Link
        to="/"
        className="relative z-10 rounded-full bg-coral px-6 py-2.5 text-sm font-semibold text-ink hover:scale-105 transition-transform"
      >
        Back to home
      </Link>
    </div>
  );
}