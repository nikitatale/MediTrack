
import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/Logo.jsx";

import { useAuth } from "../context/AuthContext.jsx";

import { getMedicines } from "../api/medicine.js";

import { markDose, getAdherenceStats } from "../api/adherence.js";

import { HeartPlus, HousePlus, MoveRight, Sparkle } from "lucide-react";
import MobileNav from "../components/MobileNav.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [markedDoses, setMarkedDoses] = useState({}); 
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

const loadData = async () => {
  try {
    setLoading(true);
    const [medsData, statsData] = await Promise.all([
      getMedicines(),
      getAdherenceStats(),
    ]);
    setMedicines(medsData);
    setStats(statsData);

   
    const todayStr = new Date().toDateString();
    const todaysMarks = {};
    (statsData.logs || []).forEach((log) => {
      const logDateStr = new Date(log.date).toDateString();
      if (logDateStr === todayStr && log.status !== "pending") {
        const key = `${log.medicineId}-${log.scheduledTime}`;
        todaysMarks[key] = log.status;
      }
    });
    setMarkedDoses(todaysMarks);
  } catch (err) {
    setError("Could not load dashboard. Is the backend running?");
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

 
  const todaysDoses = medicines
    .flatMap((med) =>
      (med.timings || []).map((time) => ({
        key: `${med._id}-${time}`,
        medicineId: med._id,
        name: med.name,
        dosage: med.dosage,
        time,
      }))
    )
    .sort((a, b) => a.time.localeCompare(b.time));

  const handleMark = async (dose, status) => {
    try {
      await markDose({
        medicineId: dose.medicineId,
        scheduledTime: dose.time,
        status,
      });
      setMarkedDoses((prev) => ({ ...prev, [dose.key]: status }));
     
      getAdherenceStats().then(setStats).catch(() => {});
    } catch (err) {
      setError("Failed to log dose. Try again.");
    }
  };

  const lowStockMeds = medicines.filter((m) => m.stockCount <= m.refillThreshold);

  return (
    <div className="min-h-screen w-full bg-ink text-lavender font-body">
    
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-coral/20 blur-3xl animate-blob" />
        
        <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-mint/10 blur-3xl animate-blob [animation-delay:-6s]" />
      </div>

 
      <header className="relative z-30 border-b border-white/10">
        
        <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-base font-semibold">
              Medi<span className="text-coral">Track</span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 md:flex">

             <Link to="/" className="text-sm text-muted hover:text-lavender transition-colors">
            <HousePlus className="h-4 w-4"/>
            </Link>
         
            <Link to="/medicines" className="text-sm text-muted hover:text-lavender transition-colors">
              My medicines
            </Link>
         
            <Link to="/scan" className="text-sm text-muted hover:text-lavender transition-colors">
             Scan prescription
           </Link>
           <Link to="/orders" className="text-sm text-muted hover:text-lavender transition-colors">
           Orders
           </Link>

           <Link to="/analytics" className="text-sm text-muted hover:text-lavender transition-colors">
           Analytics
           </Link>

           <Link to="/caregivers" className="text-sm text-muted hover:text-lavender transition-colors">
           Caregivers
          </Link>

            <span className="text-sm text-muted">{user?.name}</span>

            <button
              onClick={handleLogout}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-muted hover:text-coral hover:border-coral/40 transition-colors"
            >
              Log out
            </button>
          </div>

          <MobileNav>
            <Link to="/" className="text-sm text-muted hover:text-lavender transition-colors">
              Home
            </Link>
            <Link to="/medicines" className="text-sm text-muted hover:text-lavender transition-colors">
              My medicines
            </Link>
            <Link to="/scan" className="text-sm text-muted hover:text-lavender transition-colors">
              Scan prescription
            </Link>
            <Link to="/orders" className="text-sm text-muted hover:text-lavender transition-colors">
              Orders
            </Link>
            <Link to="/analytics" className="text-sm text-muted hover:text-lavender transition-colors">
              Analytics
            </Link>
            <Link to="/caregivers" className="text-sm text-muted hover:text-lavender transition-colors">
              Caregivers
            </Link>
            <span className="text-sm text-muted">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="w-fit rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-muted hover:text-coral hover:border-coral/40 transition-colors"
            >
              Log out
            </button>
          </MobileNav>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-display flex text-2xl font-semibold tracking-tight sm:text-3xl">
         Welcome back, {user?.name?.split(" ")[0] || "there"} <HeartPlus className="h-5 w-5 hover:text-red-500 transition-colors duration-200" />
        </h1>
        <p className="mt-1 text-sm text-muted">Here's where things stand today.</p>

        {error && (
          <div className="mt-6 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral2">
            {error}
          </div>
        )}

        {loading ? (
          <p className="mt-10 text-sm text-muted">Loading…</p>
        ) : (
          <>
          
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Adherence" value={`${stats?.adherencePercent ?? 0}%`} tone="coral" />
              <StatCard label="Current streak" value={`${stats?.streak ?? 0} days`} tone="mint" />
              <StatCard label="Active medicines" value={medicines.length} tone="coral" />
              <StatCard label="Low stock" value={lowStockMeds.length} tone="mint" />
            </div>

         
            {lowStockMeds.length > 0 && (
              <div className="mt-6 rounded-2xl border border-coral/30 bg-coral/10 px-5 py-4">
                <p className="text-sm font-semibold text-coral2">
                  ⚠ Running low: {lowStockMeds.map((m) => m.name).join(", ")}
                </p>
                <p className="mt-1 text-xs text-muted">
                  A refill order will be created automatically before you run out.
                </p>
              </div>
            )}

           
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold">Today's schedule</h2>

              {todaysDoses.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-plum/40 p-8 text-center">
                  <p className="text-sm text-muted">No medicines scheduled yet.</p>
                
                    <Link
                   to="/medicines"
                  className="mt-6 flex items-center justify-center gap-2 text-sm  text-mint hover:underline transition-colors duration-200"
                   >
  <span>Add your first medicine</span> <MoveRight className="h-5 w-5" />
</Link>

                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {todaysDoses.map((dose) => {
                    const marked = markedDoses[dose.key];
                    return (
                      <div
                        key={dose.key}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-plum/40 px-5 py-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm text-mint">{dose.time}</span>
                          <div>
                            <p className="text-sm font-medium">{dose.name}</p>
                            <p className="text-xs text-muted">{dose.dosage}</p>
                          </div>
                        </div>

                        {marked ? (
                          <span
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                              marked === "taken"
                                ? "bg-mint/15 text-mint"
                                : "bg-coral/15 text-coral"
                            }`}
                          >
                            {marked === "taken" ? "Taken ✓" : "Missed"}
                          </span>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMark(dose, "taken")}
                              className="rounded-full bg-mint px-4 py-1.5 text-xs font-semibold text-ink hover:scale-105 transition-transform"
                            >
                              Mark taken
                            </button>
                            <button
                              onClick={() => handleMark(dose, "missed")}
                              className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-muted hover:text-coral hover:border-coral/40 transition-colors"
                            >
                              Missed
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, tone }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-plum/40 p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className={`mt-2 font-display text-2xl font-semibold ${tone === "coral" ? "text-coral" : "text-mint"}`}>
        {value}
      </p>
    </div>
  );
}