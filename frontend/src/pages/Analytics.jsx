import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Logo from "../components/Logo.jsx";
import { getAdherenceStats } from "../api/adherence.js";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getAdherenceStats();
      setStats(data);
    } catch (err) {
      setError("Could not load analytics. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const dailyData = React.useMemo(() => {
    if (!stats?.logs) return [];
    const grouped = {};
    stats.logs.forEach((log) => {
      const dateKey = new Date(log.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      if (!grouped[dateKey]) grouped[dateKey] = { date: dateKey, taken: 0, missed: 0 };
      if (log.status === "taken") grouped[dateKey].taken += 1;
      if (log.status === "missed") grouped[dateKey].missed += 1;
    });
    return Object.values(grouped).reverse();
  }, [stats]);

  const pieData = stats
    ? [
        { name: "Taken", value: stats.takenCount, color: "#6EE7B7" },
        { name: "Missed", value: stats.totalLogs - stats.takenCount, color: "#FF6F4F" },
      ]
    : [];

  return (
    <div className="min-h-screen w-full bg-ink text-lavender font-body">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-coral/20 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-mint/10 blur-3xl animate-blob [animation-delay:-6s]" />
      </div>

      <header className="relative z-10 border-b border-white/10">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-base font-semibold">
              Medi<span className="text-coral">Track</span>
            </span>
          </Link>
          <Link to="/dashboard" className="text-sm text-muted hover:text-lavender transition-colors">
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Adherence analytics
        </h1>
        <p className="mt-1 text-sm text-muted">Last 30 days of your dose-taking history.</p>

        {error && (
          <div className="mt-6 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral2">
            {error}
          </div>
        )}

        {loading ? (
          <p className="mt-10 text-sm text-muted">Loading…</p>
        ) : !stats || stats.totalLogs === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-plum/40 p-10 text-center">
            <p className="text-sm text-muted">
              No dose history yet. Mark some doses as taken/missed from your{" "}
              <Link to="/dashboard" className="font-semibold text-mint hover:underline">
                dashboard
              </Link>{" "}
              to see trends here.
            </p>
          </div>
        ) : (
          <>
          
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Adherence" value={`${stats.adherencePercent}%`} tone="coral" />
              <StatCard label="Current streak" value={`${stats.streak} days`} tone="mint" />
              <StatCard label="Doses taken" value={stats.takenCount} tone="mint" />
              <StatCard label="Doses logged" value={stats.totalLogs} tone="coral" />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
            
              <div className="rounded-2xl border border-white/10 bg-plum/40 p-6 lg:col-span-2">
                <h2 className="font-display text-base font-semibold">Daily trend</h2>
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyData}>
                      <defs>
                        <linearGradient id="takenGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6EE7B7" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#6EE7B7" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="missedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF6F4F" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#FF6F4F" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="date" stroke="#9C8FC4" fontSize={11} tickLine={false} />
                      <YAxis stroke="#9C8FC4" fontSize={11} tickLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          background: "#1F1240",
                          border: "1px solid #ffffff20",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      />
                      <Area type="monotone" dataKey="taken" stroke="#6EE7B7" fill="url(#takenGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="missed" stroke="#FF6F4F" fill="url(#missedGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex gap-5 text-xs">
                  <span className="flex items-center gap-1.5 text-muted">
                    <span className="h-2 w-2 rounded-full bg-mint" /> Taken
                  </span>
                  <span className="flex items-center gap-1.5 text-muted">
                    <span className="h-2 w-2 rounded-full bg-coral" /> Missed
                  </span>
                </div>
              </div>

          
              <div className="rounded-2xl border border-white/10 bg-plum/40 p-6">
                <h2 className="font-display text-base font-semibold">Taken vs missed</h2>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "#1F1240",
                          border: "1px solid #ffffff20",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex justify-center gap-5 text-xs">
                  <span className="flex items-center gap-1.5 text-muted">
                    <span className="h-2 w-2 rounded-full bg-mint" /> Taken
                  </span>
                  <span className="flex items-center gap-1.5 text-muted">
                    <span className="h-2 w-2 rounded-full bg-coral" /> Missed
                  </span>
                </div>
              </div>
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