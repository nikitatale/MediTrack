



import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { getPatientOverview } from "../api/caregiver.js";

export default function PatientOverview() {
  const { patientId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOverview();
  }, [patientId]);

  const loadOverview = async () => {
    try {
      setLoading(true);
      const result = await getPatientOverview(patientId);
      setData(result);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load this patient's data.");
    } finally {
      setLoading(false);
    }
  };

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
          <Link to="/caregivers" className="text-sm text-muted hover:text-lavender transition-colors">
             Back to caregivers
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        {error && (
          <div className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral2">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          data && (
            <>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-mint">
                Read-only caregiver view
              </div>
              <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {data.patient.name}'s schedule
              </h1>
              <p className="mt-1 text-sm text-muted">{data.patient.email}</p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <StatCard label="Adherence" value={`${data.adherencePercent}%`} tone="coral" />
                <StatCard label="Doses taken" value={data.takenCount} tone="mint" />
                <StatCard label="Active medicines" value={data.medicines.length} tone="coral" />
              </div>

              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold">Medicines</h2>
                {data.medicines.length === 0 ? (
                  <p className="mt-3 text-sm text-muted">No active medicines.</p>
                ) : (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {data.medicines.map((med) => (
                      <div key={med._id} className="rounded-2xl border border-white/10 bg-plum/40 p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-display text-base font-semibold">{med.name}</h3>
                            <p className="text-xs text-muted">{med.dosage} · {med.frequency}</p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-mono ${
                              med.stockCount <= med.refillThreshold
                                ? "bg-coral/15 text-coral"
                                : "bg-mint/15 text-mint"
                            }`}
                          >
                            {med.stockCount} left
                          </span>
                        </div>
                        <p className="mt-3 font-mono text-xs text-muted">
                          Timings: {med.timings.join(", ") || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )
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