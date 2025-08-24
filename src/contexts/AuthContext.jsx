import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/apiClient";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = () => logout();
    window.addEventListener("auth:unauthorized", handler);
    return () => window.removeEventListener("auth:unauthorized", handler);
  }, []);

  useEffect(() => {
    if (!token) return;
    // refresca perfil por si el token cambió
    (async () => {
      try {
        const me = await api("/me");
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
      } catch { /* token inválido */ }
    })();
  }, [token]);

  async function login(email, password) {
    setLoading(true);
    try {
      const { token: t, user: u } = await api("/auth/login", {
        method: "POST",
        body: { email, password },
        auth: false,
      });
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));
      setToken(t);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({
    user, token, loading, login, logout, isAuthenticated: !!token,
    hasRole: (roles) => !!user && roles.includes(user.role),
  }), [user, token, loading]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
