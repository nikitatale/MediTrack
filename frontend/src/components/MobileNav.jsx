import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function MobileNav({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lavender transition-colors hover:border-mint/40"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 border-b border-white/10 bg-plum2 px-6 py-5 shadow-xl shadow-black/40">
          <div
            className="flex flex-col gap-4"
            onClick={() => setOpen(false)}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
