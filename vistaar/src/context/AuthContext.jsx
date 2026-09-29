import { createContext, useContext, useEffect, useState } from "react";
import { demoAccounts } from "../data/users";

const AuthContext = createContext(null);
const KEY = "cc.user";
const stores = () => [localStorage, sessionStorage];

function readSaved() {
  try {
    const raw = localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    // Re-hydrate from the demo account so the shape is always complete.
    const base = demoAccounts[saved.role];
    return base ? { ...base, ...saved.patch } : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSaved);
  const [patch, setPatch] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || sessionStorage.getItem(KEY))?.patch || {}; } catch { return {}; }
  });
  const [remember, setRemember] = useState(() => !!localStorage.getItem(KEY) || !sessionStorage.getItem(KEY));

  useEffect(() => {
    try {
      const [local, session] = stores();
      local.removeItem(KEY);
      session.removeItem(KEY);
      if (user) (remember ? local : session).setItem(KEY, JSON.stringify({ role: user.role, patch }));
    } catch { /* storage unavailable — session simply won't persist */ }
  }, [user, patch, remember]);

  const login = (role = "trainee", keep = true) => {
    setPatch({});
    setRemember(keep);
    setUser(demoAccounts[role] || demoAccounts.trainee);
  };
  const logout = () => { setPatch({}); setUser(null); };
  const updateUser = (p) => {
    setPatch((prev) => ({ ...prev, ...p }));
    setUser((prev) => ({ ...prev, ...p }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
