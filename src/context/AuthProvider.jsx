import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./auth-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")) || null; }
    catch { return null; }
  });
  const [token, setToken] = useState(() => Cookies.get("token") || null);

  useEffect(() => {
    if (token) Cookies.set("token", token, { expires: 7, secure: true, sameSite: "Strict" });
    else Cookies.remove("token");
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user, token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("token");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
