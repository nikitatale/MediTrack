
import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";

import Logo from "../components/Logo.jsx";

import { useAuth } from "../context/AuthContext.jsx";

import { uploadPrescription, reviewPrescription } from "../api/prescription.js";

import { Camera, HousePlus } from "lucide-react";

export default function PrescriptionUpload() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
 
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null); // prescription doc returned from backend
 
  const [editedText, setEditedText] = useState("");
  const [saving, setSaving] = useState(false);
 
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError("");
    setSaved(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError("");
    try {
     
      const data = await uploadPrescription(selectedFile);
      setResult(data);
      setEditedText(data.extractedText || "");
    } catch (err) {
      setError(err?.response?.data?.message || "OCR failed. Try a clearer image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveReview = async () => {
    if (!result) return;
    setSaving(true);
    setError("");
    try {
      await reviewPrescription(result._id, editedText);
      setSaved(true);
    } catch (err) {
      setError("Could not save your review.");
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    
    setSelectedFile(null);
    
    setPreviewUrl(null);
    
    setResult(null);
    
    setEditedText("");
    
    setSaved(false);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen w-full bg-ink text-lavender font-body">
     
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
     
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-coral/20 blur-3xl animate-blob" />
     
        <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-mint/10 blur-3xl animate-blob [animation-delay:-6s]" />
     
      </div>

      <header className="relative z-10 border-b border-white/10">
  <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">

    <Link to="/dashboard" className="flex items-center gap-2.5">
      <Logo className="h-8 w-8" />
      <span className="font-display text-base font-semibold">
        Medi<span className="text-coral">Track</span>
      </span>
    </Link>

    
    <div className="flex items-center gap-6">
      <Link
        to="/"
        className="text-sm text-muted hover:text-lavender transition-colors"
      >
        <HousePlus className="h-5 w-5" />
      </Link>

      <Link
        to="/dashboard"
        className="text-sm text-muted hover:text-lavender transition-colors"
      >
        Dashboard
      </Link>

      <span className="text-sm text-muted">{user?.name}</span>
    </div>
  </nav>
</header>

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-10">
      
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
      
          Scan a prescription
      
        </h1>
        <p className="mt-1 text-sm text-muted">
          Upload a clear photo and we'll pull out the text automatically.
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral2">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
       
          <div className="rounded-2xl border border-white/10 bg-plum/40 p-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileSelect}
              className="hidden"
              id="prescription-file"
            />

            {!previewUrl ? (
              <label
                htmlFor="prescription-file"
                className="flex h-64 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/15 text-center hover:border-mint/40 transition-colors"
              >
                <span className="text-3xl"><Camera/></span>
               
                <span className="text-sm font-semibold text-lavender">
                  Click to upload prescription
                </span>
                <span className="text-xs text-muted">JPG or PNG, up to 5MB</span>
              </label>
            ) : (
              <div>
                <img
                  src={previewUrl}
                  alt="Prescription preview"
                  className="h-64 w-full rounded-xl object-cover"
                />
                <div className="mt-4 flex gap-3">
                  
                  <button
                    onClick={handleUpload}
                    disabled={uploading || result}
                    className="flex-1 rounded-full bg-coral py-3 text-sm font-semibold text-ink disabled:opacity-50"
                  >
                    {uploading ? "Reading text…" : result ? "Scanned ✓" : "Scan this image"}
                  </button>
                  <button
                    onClick={reset}
                    className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-muted hover:text-lavender"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>

         
          <div className="rounded-2xl border border-white/10 bg-plum/40 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Extracted text
            </p>

            {!result ? (
              <div className="mt-4 flex h-56 items-center justify-center text-center text-sm text-muted">
                Upload and scan an image to see the extracted text here.
              </div>
            ) : (
              <>
                <p className="mt-2 text-xs text-muted">
                  OCR isn't always perfect - please review and correct before saving.
                </p>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  rows={9}
                  className="mt-3 w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-lavender outline-none focus:border-mint/50"
                />
                <button
                  onClick={handleSaveReview}
                  disabled={saving}
                  className="mt-4 w-full rounded-full bg-mint py-3 text-sm font-semibold text-ink disabled:opacity-50"
                >
                  {saving ? "Saving…" : saved ? "Saved ✓" : "Save reviewed text"}
                </button>

                {saved && (
                  <p className="mt-4 text-center text-xs text-muted">
                    Now add the medicines you see here on the{" "}
                    <Link to="/medicines" className="font-semibold text-mint hover:underline">
                      medicines page
                    </Link>
                    .
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}