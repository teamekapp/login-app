"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-20">
      <h1 className="text-3xl font-bold">
        Panel użytkownika
      </h1>

      <p className="mt-4">
        Witaj {user || "admin"} 👋
      </p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Wyloguj
      </button>
    </div>
  );
}