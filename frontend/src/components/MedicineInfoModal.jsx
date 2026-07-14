


import React, { useState, useEffect } from "react";
import { getMedicineInfo } from "../api/llm.js";

export default function MedicineInfoModal({ medicineName, onClose }) {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInfo();
  }, [medicineName]);

  const fetchInfo = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMedicineInfo(medicineName);
      setInfo(data.info);
    } catch (err) {
      setError("Could not fetch info right now. Check your LLM API key in backend .env.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-md flex-col rounded-3xl border border-white/10 bg-plum2 shadow-2xl">
     
        <div className="flex items-start justify-between border-b border-white/10 p-6 pb-4">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-widest text-mint">Know more</p>
            <h2 className="mt-1 truncate font-display text-lg font-semibold">{medicineName}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-muted hover:border-coral/40 hover:text-coral transition-colors"
          >
            ✕
          </button>
        </div>

       
        <div className="overflow-y-auto p-6">
          {loading ? (
            <p className="text-sm text-muted">Fetching information…</p>
          ) : error ? (
            <p className="text-sm text-coral2">{error}</p>
          ) : (
            <p className="whitespace-pre-line text-sm leading-relaxed text-lavender">{info}</p>
          )}
        </div>

        <p className="border-t border-white/10 px-6 py-4 text-[11px] text-muted">
          This is general information, not medical advice. Consult your doctor for guidance specific to you.
        </p>
      </div>
    </div>
  );
}