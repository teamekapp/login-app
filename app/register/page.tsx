"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Hasła nie są takie same");
      return;
    }

    try {
      const response = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Błąd rejestracji"
        );
        return;
      }

      setSuccess(
        "Konto utworzone poprawnie"
      );

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Błąd serwera");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">
        Rejestracja
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

      <input
        type="password"
        className="w-full border p-2 mb-3"
        placeholder="Powtórz hasło"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
      />

      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Zarejestruj
      </button>

      {error && (
        <p className="text-red-500 mt-3">
          {error}
        </p>
      )}

      {success && (
        <p className="text-green-600 mt-3">
          {success}
        </p>
      )}
    </div>
  );
}