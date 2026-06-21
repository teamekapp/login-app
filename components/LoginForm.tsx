"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">
        Logowanie
      </h1>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Login"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="password"
        className="w-full border p-2 mb-3"
        placeholder="Hasło"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Zaloguj
      </button>

      {error && (
        <p className="text-red-500 mt-3">
          {error}
        </p>
      )}
    </div>
  );
}