"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/app/config/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // prevent double submit
  const isSubmitting = useRef(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting.current) return;

    setError("");
    setLoading(true);
    isSubmitting.current = true;

    try {
      const controller = new AbortController();

      // ⏱️ timeout safety (12s for Render)
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 12000);

      const res = await fetch(API.auth.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      /**
       * ✅ SUCCESS CONDITIONS (important)
       * - token present = success
       * - success true = success
       */
      if (data?.token) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin");
        return;
      }

      if (data?.success === true) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin");
        return;
      }

      // ❌ real failure
      setError(
        data?.message ||
          "Invalid email or password"
      );
    } catch (err) {
      if (err.name === "AbortError") {
        setError(
          "Server is waking up. Please try again."
        );
      } else {
        setError(
          "Network error. Please try again."
        );
      }
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {loading && (
          <p className="text-xs text-gray-400 text-center mt-3">
            server may be waking up, please wait...
          </p>
        )}
      </form>
    </div>
  );
}
