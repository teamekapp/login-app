"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  user: string | null;
  login: (
    username: string,
    password: string
  ) => boolean;
  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<string | null>(null);

  const login = (
    username: string,
    password: string
  ) => {
    console.log("LOGIN:", username);
console.log("PASSWORD:", password);
    if (
      username === "admin" &&
      password === "haslo123"
    ) {
      setUser(username);
      localStorage.setItem("user", username);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}