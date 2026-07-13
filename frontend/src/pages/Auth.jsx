
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/Logo.jsx";

import { loginRequest, signupRequest } from "../api/auth.js";

import { useAuth } from "../context/AuthContext.jsx";

import { HousePlus, MoveLeft } from "lucide-react";

const initialSignup = { name: "", email: "", password: "", address: "", phone: "" };
const initialLogin = { email: "", password: "" };

export default function Auth() {
  const [mode, setMode] = useState("login"); 

  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const isLogin = mode === "login";

  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleSignupChange = (e) =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = isLogin ? await loginRequest(loginForm) : await signupRequest(signupForm);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Check that the backend is running.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setError("");
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink px-6 py-12 font-body text-lavender">
     
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-coral/20 blur-3xl animate-blob" />
        
        <div className="absolute bottom-0 -right-24 h-[26rem] w-[26rem] rounded-full bg-mint/10 blur-3xl animate-blob [animation-delay:-6s]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
       
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <Logo className="h-9 w-9" />
          
          <span className="font-display text-lg font-semibold tracking-tight">
            Medi<span className="text-coral">Track</span>
          
          </span>
        </Link>

        <div className="rounded-3xl border border-white/10 bg-plum/60 p-8 backdrop-blur-sm shadow-2xl shadow-black/40 animate-fade-in-up">
      
          <div className="mb-7 flex rounded-full border border-white/10 bg-ink/50 p-1">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  mode === m
                    ? "bg-coral text-ink"
                    : "text-muted hover:text-lavender"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Start your first dose"}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {isLogin
              ? "Log in to keep your schedule on track."
              : "Set up your account in under a minute."}
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {!isLogin && (
              <Field
                label="Full name"
                name="name"
                type="text"
                value={signupForm.name}
                onChange={handleSignupChange}
                placeholder="Ananya Sharma"
                required
              />
            )}

            <Field
              label="Email"
              name="email"
              type="email"
              value={isLogin ? loginForm.email : signupForm.email}
              onChange={isLogin ? handleLoginChange : handleSignupChange}
              placeholder="you@example.com"
              required
            />

            <Field
              label="Password"
              name="password"
              type="password"
              value={isLogin ? loginForm.password : signupForm.password}
              onChange={isLogin ? handleLoginChange : handleSignupChange}
              placeholder="********"
              required
              minLength={6}
            />

            {!isLogin && (
              <>
                <Field
                  label="Delivery address"
                  name="address"
                  type="text"
                  value={signupForm.address}
                  onChange={handleSignupChange}
                  placeholder="House no, street, city"
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={signupForm.phone}
                  onChange={handleSignupChange}
                  placeholder="+91 98765 43210"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-coral py-3.5 text-sm font-semibold text-ink shadow-lg shadow-coral/30 transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait…" : isLogin ? "Log in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {isLogin ? "New to MediTrack?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isLogin ? "signup" : "login")}
              className="font-semibold text-mint hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>


        <Link
         to="/"
         className="mt-6 flex items-center justify-center gap-2 text-sm text-muted hover:text-lavender transition-colors duration-200"
>
 
   <HousePlus className="h-4 w-4"/>
  <span>Back to home</span>
</Link>
      </div>
    </div>
  );
}

function Field({ label, name, type, value, onChange, placeholder, required, minLength }) {
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
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-lavender placeholder:text-muted/60 outline-none transition-colors duration-200 focus:border-mint/50"
      />
    </label>
  );
}
