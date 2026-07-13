import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const readUserFromStorage = () => {
  try {
    const stored = localStorage.getItem("meditrack_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUserFromStorage);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "meditrack_user" || e.key === "meditrack_token") {
        setUser(readUserFromStorage());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (data) => {
    const { token, ...userData } = data;
    localStorage.setItem("meditrack_token", token);
    localStorage.setItem("meditrack_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("meditrack_token");
    localStorage.removeItem("meditrack_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}