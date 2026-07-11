

import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-ink px-6 text-center font-body text-lavender">
      <Logo className="h-12 w-12" />
      <div>
        <h1 className="font-display text-2xl font-semibold">
          Welcome, {user?.name || "there"} 👋
        </h1>
        <p className="mt-2 text-sm text-muted">
          You're logged in. The full dashboard (schedule, adherence charts, orders) is next up.
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-lavender transition-colors duration-200 hover:border-coral/50 hover:text-coral"
      >
        Log out
      </button>
    </div>
  );
}
