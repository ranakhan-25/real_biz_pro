"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { getSession, login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (getSession()) router.replace("/dashboard");
  }, [router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid email and a password of at least 4 characters.");
      return;
    }
    login(email);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 text-zinc-900">
      {/* Main Container - Flat, Clean, White Theme, No Harsh Shadows */}
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm lg:grid lg:grid-cols-2">
        
        {/* Left Side: Professional RealBiz Editorial Panel (Light Theme) */}
        <div className="relative hidden bg-zinc-100/70 p-10 lg:flex lg:flex-col lg:justify-between border-r border-zinc-200">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,0,0,0.03),rgba(255,255,255,0))] pointer-events-none" />

          {/* Header with Back Button */}
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 border border-zinc-200 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                RealBiz OS v3.4
              </span>
            </div>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950 shadow-2xs"
            >
              ← Back
            </button>
          </div>

          {/* Central Professional Copy & Visual Preview */}
          <div className="space-y-6 z-10 my-auto py-8">
            <div>
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900">
                Command center for high-performance teams.
              </h2>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                Streamline your pipeline, analyze operational metrics, and scale growth securely from a unified workspace.
              </p>
            </div>

            {/* Showcase Image Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="group relative h-28 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                  alt="Collaboration"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div className="group relative h-28 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
                  alt="Strategy"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div className="group relative h-28 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
                  alt="Analytics"
                  className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-zinc-500 z-10 pt-4 border-t border-zinc-200">
            <span>Enterprise Grade Security</span>
            <span>SOC2 Type II Certified</span>
          </div>
        </div>

        {/* Right Side: Clean Modern Login Form (White Theme) */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto">
            
            {/* Form Header */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                Welcome back
              </h1>
              <p className="text-sm text-zinc-600">
                Enter your credentials to access your organization deck.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={submit} className="mt-8 space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-500"
                >
                  Work Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                  placeholder="name@company.com"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-500"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                  placeholder="••••••••"
                />
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99]"
              >
                <span>Sign In to Workspace</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </button>
            </form>

            {/* Bottom Links */}
            <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-6">
              <Link
                href="/"
                className="text-xs font-medium text-zinc-600 transition hover:text-zinc-950"
              >
                ← Return to main site
              </Link>
              <span className="text-xs text-zinc-400">Demo mode active</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}