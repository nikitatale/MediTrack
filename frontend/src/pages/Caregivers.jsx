


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import {
  inviteCaregiver,
  getMyCaregivers,
  removeCaregiver,
  getMyPatients,
} from "../api/caregiver.js";

export default function Caregivers() {
  const [caregivers, setCaregivers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [caregiversData, patientsData] = await Promise.all([
        getMyCaregivers(),
        getMyPatients(),
      ]);
      setCaregivers(caregiversData);
      setPatients(patientsData);
    } catch (err) {
      setError("Could not load caregiver data.");
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    setError("");
    setSuccess("");
    try {
      await inviteCaregiver(email);
      setSuccess(`Invite sent to ${email}`);
      setEmail("");
      loadData();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send invite.");
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (linkId) => {
    if (!window.confirm("Remove this caregiver's access?")) return;
    try {
      await removeCaregiver(linkId);
      loadData();
    } catch (err) {
      setError("Failed to remove caregiver.");
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
          <Link to="/dashboard" className="text-sm text-muted hover:text-lavender transition-colors">
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Caregivers & family
        </h1>
        <p className="mt-1 text-sm text-muted">
          Let someone you trust keep an eye on your medicine schedule.
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral2">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-6 rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-sm text-mint">
            {success}
          </div>
        )}

        {loading ? (
          <p className="mt-10 text-sm text-muted">Loading…</p>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-plum/40 p-4 sm:p-6">
              <h2 className="font-display text-lg font-semibold">People watching my schedule</h2>

              <form onSubmit={handleInvite} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="caregiver's email"
                  required
                  className="flex-1 rounded-xl border border-white/10 bg-ink/60 px-4 py-2.5 text-sm outline-none focus:border-mint/50"
                />
                <button
                  type="submit"
                  disabled={inviting}
                  className="rounded-xl bg-coral px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-50"
                >
                  {inviting ? "…" : "Invite"}
                </button>
              </form>
              <p className="mt-2 text-[11px] text-muted">
                They need a MediTrack account with this email to see your data.
              </p>

              <div className="mt-5 space-y-3">
                {caregivers.length === 0 ? (
                  <p className="text-sm text-muted">No caregivers added yet.</p>
                ) : (
                  caregivers.map((c) => (
                    <div
                      key={c._id}
                      className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{c.caregiverEmail}</p>
                        <span
                          className={`text-xs font-mono ${
                            c.status === "accepted" ? "text-mint" : "text-muted"
                          }`}
                        >
                          {c.status === "accepted" ? "Active" : "Waiting for them to sign up"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemove(c._id)}
                        className="text-xs font-semibold text-muted hover:text-coral"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-plum/40 p-4 sm:p-6">
              <h2 className="font-display text-lg font-semibold">People I'm watching over</h2>

              <div className="mt-4 space-y-3">
                {patients.length === 0 ? (
                  <p className="text-sm text-muted">
                    No one has added you as a caregiver yet.
                  </p>
                ) : (
                  patients.map((p) => (
                    <Link
                      key={p._id}
                      to={`/caregivers/patient/${p.patientId._id}`}
                      className="block rounded-xl border border-white/10 px-4 py-3 hover:border-mint/30 transition-colors"
                    >
                      <p className="text-sm font-medium">{p.patientId.name}</p>
                      <p className="text-xs text-muted">{p.patientId.email}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}