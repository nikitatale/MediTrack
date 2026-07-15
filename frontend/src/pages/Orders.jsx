

import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Logo from "../components/Logo.jsx";

import { useAuth } from "../context/AuthContext.jsx";

import { getMedicines } from "../api/medicine.js";

import { placeOrder, getMyOrders } from "../api/order.js";
import { HousePlus } from "lucide-react";
import MobileNav from "../components/MobileNav.jsx";

const statusMeta = {
  placed: { label: "Placed", tone: "text-muted" },
  packed: { label: "Packed", tone: "text-mint" },
  out_for_delivery: { label: "Out for delivery", tone: "text-coral" },
  delivered: { label: "Delivered", tone: "text-mint" },
  cancelled: { label: "Cancelled", tone: "text-muted" },
};

export default function Orders() {

  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);

  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState({});

  const [address, setAddress] = useState(user?.address || "");
  const [loading, setLoading] = useState(true);

  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [medsData, ordersData] = await Promise.all([getMedicines(), getMyOrders()]);

      setMedicines(medsData);

      setOrders(ordersData);

    } catch (err) {

      setError("Could not load orders. Is the backend running?");
    } finally {

      setLoading(false);
    }
  };

  const toggleSelect = (med) => {
    setSelected((prev) => {
      const next = { ...prev };
    
      if (next[med._id]) {
        delete next[med._id];
    
    } else {
        next[med._id] = 1;
      }
      return next;
    });
  };

  const updateQty = (medId, qty) => {
    setSelected((prev) => ({ ...prev, [medId]: Math.max(1, Number(qty)) }));
  };

  const handlePlaceOrder = async () => {
    const chosenIds = Object.keys(selected);
    if (chosenIds.length === 0) {
      setError("Select at least one medicine to order.");
      return;
    }
    if (!address.trim()) {
      setError("Please enter a delivery address.");
      return;
    }

    setPlacing(true);
    setError("");
    setSuccess(false);
    try {
      const orderMedicines = chosenIds.map((id) => {
        const med = medicines.find((m) => m._id === id);
        return { medicineId: id, name: med.name, quantity: selected[id] };
      });

      await placeOrder({ medicines: orderMedicines, deliveryAddress: address });
     
      setSelected({});
     
      setSuccess(true);
      loadData();
    } catch (err) {
    
        setError(err?.response?.data?.message || "Failed to place order.");
    
    } finally {
    
        setPlacing(false);
    }
  };

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
     
            <Link to="/medicines" className="text-sm text-muted hover:text-lavender transition-colors">
     
              My medicines
     
            </Link>
          </div>

          <MobileNav>
            <Link to="/" className="text-sm text-muted hover:text-lavender transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm text-muted hover:text-lavender transition-colors">
              Dashboard
            </Link>
            <Link to="/medicines" className="text-sm text-muted hover:text-lavender transition-colors">
              My medicines
            </Link>
          </MobileNav>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
     
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
     
          Orders & refills
     
        </h1>
     
        <p className="mt-1 text-sm text-muted">
     
          Order a refill manually, or let auto-reorder handle it when stock runs low.
     
        </p>

        {error && (
     
     <div className="mt-6 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral2">
     
            {error}
     
          </div>
     
     )}
     
        {success && (
     
     <div className="mt-6 rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-sm text-mint">
     
            Order placed successfully!
     
          </div>
        )}

        {loading ? (
     
     <p className="mt-10 text-sm text-muted">Loading…</p>
        ) : (
     
     <div className="mt-8 grid gap-8 lg:grid-cols-2">
            
            <div className="rounded-2xl border border-white/10 bg-plum/40 p-6">
              <h2 className="font-display text-lg font-semibold">Place a refill order</h2>

              {medicines.length === 0 ? (
                <p className="mt-4 text-sm text-muted">
                  No medicines yet.{" "}
                  <Link to="/medicines" className="font-semibold text-mint hover:underline">
                    Add one first →
                  </Link>
                </p>
              ) : (
                <>
                
                  <div className="mt-4 space-y-3">
                    {medicines.map((med) => {
                      const isChecked = !!selected[med._id];
                      return (
                        <div
                          key={med._id}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                            isChecked ? "border-mint/40 bg-mint/5" : "border-white/10"
                          }`}
                        >
                        
                        
                          <label className="flex flex-1 items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleSelect(med)}
                              className="h-4 w-4 accent-coral"
                            />
                           
                            <div>
                           
                              <p className="text-sm font-medium">{med.name}</p>
                           
                              <p className="text-xs text-muted">{med.dosage} · {med.stockCount} left</p>
                           
                            </div>
                          </label>

                          {isChecked && (
                           
                           
                           <input
                              type="number"
                              min="1"
                              value={selected[med._id]}
                              onChange={(e) => updateQty(med._id, e.target.value)}
                              className="w-16 rounded-lg border border-white/10 bg-ink/60 px-2 py-1.5 text-center text-sm outline-none focus:border-mint/50"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <label className="mt-5 block">
                  
                    <span className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-muted">
                  
                      Delivery address
                  
                    </span>
                  
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House no, street, city"
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-2.5 text-sm outline-none focus:border-mint/50"
                    />
                  </label>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="mt-5 w-full rounded-full bg-coral py-3 text-sm font-semibold text-ink shadow-lg shadow-coral/30 disabled:opacity-50"
                  >
                    {placing ? "Placing order…" : "Place order"}
                  </button>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-plum/40 p-6">
              <h2 className="font-display text-lg font-semibold">Order history</h2>

              {orders.length === 0 ? (
                <p className="mt-4 text-sm text-muted">No orders yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {orders.map((order) => (
                  
                  <div key={order._id} className="rounded-xl border border-white/10 px-4 py-3">
                  
                      <div className="flex items-center justify-between">
                  
                        <p className="text-sm font-medium">
                  
                          {order.medicines.map((m) => m.name).join(", ")}
                  
                        </p>
                        <span className={`text-xs font-semibold ${statusMeta[order.status]?.tone}`}>
                          {statusMeta[order.status]?.label}
                 
                        </span>
                 
                      </div>
                 
                      <p className="mt-1 font-mono text-[11px] text-muted">
                 
                        {order.autoGenerated ? "Auto-reorder" : "Manual order"} ·{" "}
                 
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}