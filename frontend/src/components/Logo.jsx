import React from "react";

export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="MediTrack logo"
    >
  
      <rect x="4" y="16" width="40" height="16" rx="8" fill="#2A1854" />
      <path
        d="M24 16H36C40.4183 16 44 19.5817 44 24C44 28.4183 40.4183 32 36 32H24V16Z"
        fill="#FF6F4F"
      />
      <path
        d="M24 16H12C7.58172 16 4 19.5817 4 24C4 28.4183 7.58172 32 12 32H24V16Z"
        fill="#6EE7B7"
      />
    
      <path
        d="M6 24H15L18 17L22 31L26 20L29 24H42"
        stroke="#150C2E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
