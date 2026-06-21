"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";



export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

    const handleLogin = async () => {
      setError("");
    
      const success = await login(
        username,
        password
      );
    
      if (success) {
        router.push("/dashboard");
      } else {
        setError(
          "Nieprawidłowy login lub hasło"
        );
      }
    };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">

  <div className="flex justify-center mb-4">
    <Image
      src="/logo.png"
      alt="Logo"
      width={180}
      height={180}
      style={{
        width: "180px",
        height: "auto",
      }}
      priority
    />
  </div>
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

      <div className="mt-4 text-center">
  <Link
    href="/register"
    className="text-blue-600 hover:underline"
  >
    Nie masz konta? Zarejestruj się
  </Link>
</div>

      {error && (
        <p className="text-red-500 mt-3">
          {error}
        </p>
      )}
    </div>
  );
}