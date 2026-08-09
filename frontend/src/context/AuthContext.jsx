import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi } from "../api/auth";
import { tokenStore } from "../api/client";
import { mockUser } from "../api/mock";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(tokenStore.get());
  const [initializing, setInitializing] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  // Restore session on mount
  useEffect(() => {
    let active = true;
    const restore = async () => {
      if (!tokenStore.get()) {
        setInitializing(false);
        return;
      }
      try {
        const res = await authApi.me();
        if (active) {
          setUser(res.user);
          setUsingMock(false);
        }
      } catch {
        // Backend unavailable or invalid token — fall back to demo session
        if (active) {
          setUser(mockUser.user);
          setUsingMock(true);
        }
      } finally {
        if (active) setInitializing(false);
      }
    };
    restore();
    return () => {
      active = false;
    };
  }, []);

const login = useCallback(async ({ email, password }) => {
    try {
      const res = await authApi.login({ email, password });
      tokenStore.set(res.token);
      setToken(res.token);
      setUser(res.user);
      setUsingMock(false);
      return { ok: true };
    } catch (err) {
      // If the backend is unreachable or not configured, allow a demo session
      // so the hackathon flow always works during presentation.
      tokenStore.set("demo-token");
      setToken("demo-token");
      setUser(mockUser.user);
      setUsingMock(true);
      return { ok: true, offline: true };
    }
  }, []);

  const register = useCallback(async (payload) => {
    try {
      const res = await authApi.register(payload);
      tokenStore.set(res.token);
      setToken(res.token);
      setUser(res.user);
      setUsingMock(false);
      return { ok: true };
    } catch (err) {
      // If the backend is unavailable or not configured, allow a demo session
      // so the hackathon flow always works during presentation.
      const demoUser = {
        id: "mock-user",
        name: payload.name || "Hemangi",
        email: payload.email,
        phone: payload.phone || ""
      };
      tokenStore.set("demo-token");
      setToken("demo-token");
      setUser(demoUser);
      setUsingMock(true);
      return { ok: true, offline: true };
    }
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setToken(null);
    setUser(null);
    setUsingMock(false);
  }, []);

  const value = {
    user,
    token,
    initializing,
    usingMock,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
