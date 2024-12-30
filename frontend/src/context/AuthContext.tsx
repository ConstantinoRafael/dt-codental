"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verifique a URL atual
    const path = window.location.pathname;

    // Verifica se a rota é "/login"
    if (path === "/login") {
      const storedToken = localStorage.getItem("token");

      // Se o token existir, redireciona para /admin
      if (storedToken) {
        router.push("/admin");
      }
    }

    // Verifica se a rota começa com "/admin"
    if (path.startsWith("/admin")) {
      const storedToken = localStorage.getItem("token");

      // Se o token não existir, redireciona para /login
      if (!storedToken) {
        router.push("/login");
      } else {
        setToken(storedToken); // Armazena o token no estado
      }
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
