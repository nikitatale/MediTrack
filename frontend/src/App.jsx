

import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

import Home from "./pages/Home.jsx";

import Auth from "./pages/Auth.jsx";

import NotFound from "./pages/NotFound.jsx";

import Dashboard from "./pages/Dashboard.jsx";

import HowItWorks from "./components/HowItWorks.jsx";

import Medicines from "./pages/Medicines.jsx";

import PrescriptionUpload from "./pages/PrescriptionUpload.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/auth" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
          path="/medicines"
          element={
          <ProtectedRoute>
          <Medicines />
          </ProtectedRoute>
           }
          />
          <Route
          path="/scan"
          element={
          <ProtectedRoute>
          <PrescriptionUpload />
          </ProtectedRoute>
          }
          />



          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
