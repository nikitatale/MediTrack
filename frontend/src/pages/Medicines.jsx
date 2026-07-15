
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Logo from "../components/Logo.jsx";

import { useAuth } from "../context/AuthContext.jsx";

import MedicineInfoModal from "../components/MedicineInfoModal.jsx";

import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} from "../api/medicine.js";
import { HousePlus, PlusCircle } from "lucide-react";
import MobileNav from "../components/MobileNav.jsx";

const emptyForm = {
  name: "",
  dosage: "",
  frequency: "",
  timings: "",
  durationDays: 7,
  stockCount: 0,
  refillThreshold: 3,
};

export default function Medicines() {
 
  const { user, logout } = useAuth();
  const [medicines, setMedicines] = useState([]);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
 
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [infoMedicine, setInfoMedicine] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const data = await getMedicines();
      setMedicines(data);
    } catch (err) {
      setError("Could not load medicines. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (med) => {
    setForm({
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      timings: med.timings.join(", "),
      durationDays: med.durationDays,
      stockCount: med.stockCount,
      refillThreshold: med.refillThreshold,
    });
    setEditingId(med._id);

    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        timings: form.timings.split(",").map((t) => t.trim()).filter(Boolean),
        durationDays: Number(form.durationDays),
        stockCount: Number(form.stockCount),
        refillThreshold: Number(form.refillThreshold),
      };

      if (editingId) {
        await updateMedicine(editingId, payload);
      } else {
        await addMedicine(payload);
      }

      setShowForm(false);
      fetchMedicines();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save medicine.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this medicine?")) return;
    try {
      await deleteMedicine(id);
      fetchMedicines();
    } catch (err) {
      setError("Failed to delete medicine.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-ink text-lavender font-body">
 
      <header className="relative z-30 border-b border-white/10">
      
        <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
      
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-base font-semibold">
              Medi<span className="text-coral">Track</span>
            </span>
          </Link>
      
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/" className="text-sm text-muted hover:text-lavender transition-colors">
            <HousePlus className="h-4 w-4"/>
            </Link>

            <Link to="/dashboard" className="text-sm text-muted hover:text-lavender transition-colors">
             Dashboard            
            </Link>

                <Link
                    to="/orders"
                    className="text-sm text-muted hover:text-lavender transition-colors"
                  >
                    Orders
                  </Link>

            <span className="text-sm text-muted">
              {user?.name}
            </span>
    
            <button
    onClick={logout}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-muted hover:text-coral hover:border-coral/40 transition-colors"
            >
              Log out
            </button>
          </div>

          <MobileNav>
            <Link to="/" className="text-sm text-muted hover:text-lavender transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm text-muted hover:text-lavender transition-colors">
              Dashboard
            </Link>
            <Link to="/orders" className="text-sm text-muted hover:text-lavender transition-colors">
              Orders
            </Link>
            <span className="text-sm text-muted">{user?.name}</span>
            <button
              onClick={logout}
              className="w-fit rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-muted hover:text-coral hover:border-coral/40 transition-colors"
            >
              Log out
            </button>
          </MobileNav>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
      
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
           
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Your medicines
           
            </h1>
           
            <p className="mt-1 text-sm text-muted">
              Add what you're taking so MediTrack can remind and refill for you.
            </p>
          </div>
        
          <button
  onClick={openAddForm}
  className="flex items-center gap-2 rounded-full bg-coral px-6 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-coral/30 transition-transform hover:scale-105"
>
  <PlusCircle className="h-5 w-5" />
  <span>Add Medicine</span>
</button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral2">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : medicines.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-plum/40 p-10 text-center">
            <p className="text-muted">No medicines added yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {medicines.map((med) => (
              <div
                key={med._id}
                className="rounded-2xl border border-white/10 bg-plum/40 p-6 hover:border-mint/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{med.name}</h3>
                    <p className="text-sm text-muted">{med.dosage} · {med.frequency}</p>
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

                <div className="mt-5 flex gap-3">
               <button
                onClick={() => setInfoMedicine(med.name)}
                className="text-xs font-semibold text-coral hover:underline"
                >
                Know more
               </button>

               <button
                onClick={() => openEditForm(med)}
                className="text-xs font-semibold text-mint hover:underline"
                >
                 Edit
              </button>


                  <button
                  onClick={() => handleDelete(med._id)}
                  className="text-xs font-semibold text-muted hover:text-coral"
                  >
                  Remove
                  </button>
                  </div>

              </div>
            ))}
          </div>
        )}
      </main>

     
    {showForm && (
  <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-6 py-8 backdrop-blur-sm sm:items-center">
  
    <div className="my-auto max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-plum2 p-7">
        
            <h2 className="font-display text-lg font-semibold">
              {editingId ? "Edit medicine" : "Add medicine"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              
              <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
              
              <Field label="Dosage (e.g. 500mg)" name="dosage" value={form.dosage} onChange={handleChange} required />
              
              <Field label="Frequency (e.g. twice a day)" name="frequency" value={form.frequency} onChange={handleChange} required />
              
              <Field label="Timings (comma separated, e.g. 09:00, 21:00)" name="timings" value={form.timings} onChange={handleChange} />
              
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              
                <Field label="Duration (days)" name="durationDays" type="number" value={form.durationDays} onChange={handleChange} />
              
                <Field label="Stock" name="stockCount" type="number" value={form.stockCount} onChange={handleChange} />
              
                <Field label="Refill at" name="refillThreshold" type="number" value={form.refillThreshold} onChange={handleChange} />
              
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-full border border-white/15 py-3 text-sm font-semibold text-muted hover:text-lavender"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-full bg-coral py-3 text-sm font-semibold text-ink disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        {infoMedicine && (
        <MedicineInfoModal
          medicineName={infoMedicine}
          onClose={() => setInfoMedicine(null)}
        />
      )}
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <label className="block">
     
      <span className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-muted">
        {label}
      </span>
     
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-2.5 text-sm text-lavender outline-none focus:border-mint/50"
      />
    </label>
  );
}