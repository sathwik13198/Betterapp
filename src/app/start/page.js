"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const actions = [
  {
    label: "Buying a home",
    desc: "Start Purchase",
    color: "bg-[#1a73e8] hover:bg-[#155ab6] text-white dark:bg-[#2563eb] dark:hover:bg-[#1e40af] dark:text-white",
    value: "buy",
  },
  {
    label: "Refinancing my mortgage",
    desc: "Start Refinance",
    color: "bg-[#f7f8fa] hover:bg-[#e0e7ef] text-[#171717] border border-[#e0e7ef] dark:bg-[#222] dark:hover:bg-[#333] dark:text-white dark:border-[#333]",
    value: "refi",
  },
  {
    label: "Get cash from my home",
    desc: "Start Heloc",
    color: "bg-[#f7f8fa] hover:bg-[#e0e7ef] text-[#171717] border border-[#e0e7ef] dark:bg-[#222] dark:hover:bg-[#333] dark:text-white dark:border-[#333]",
    value: "heloc",
  },
];

export default function Start() {
  const [dark, setDark] = useState(false);

  // On mount, check localStorage and set dark mode
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDark(true);
  }, []);

  // Apply dark class to html element
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#60a5fa] dark:from-[#1e3a8a] dark:via-[#2563eb] dark:to-[#1e40af] transition-colors duration-300">
      {/* Header */}
      <header className="w-full bg-white dark:bg-[#222] shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
          <Link href="/" className="text-2xl font-bold text-[#171717] dark:text-white hover:text-[#1a73e8] transition-colors">Better</Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-[#1a73e8] dark:text-[#60a5fa] font-medium">Need help? Call <a href="tel:4155238837" className="underline">415-523-8837</a></div>
            <button
              aria-label="Toggle dark mode"
              className="ml-2 p-2 rounded-full border border-[#e0e7ef] dark:border-[#333] bg-[#f7f8fa] dark:bg-[#222] text-[#171717] dark:text-white text-xl transition-colors"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero/Intro Section */}
      <section className="w-full flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-b from-white to-[#f7f8fa] dark:from-[#18181b] dark:to-[#222] transition-colors duration-300">
        <div className="w-24 h-24 rounded-full bg-[#e0e7ef] dark:bg-[#333] flex items-center justify-center text-4xl text-[#b0b8c1] mb-4">🤖</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#171717] dark:text-white mb-2">Hi, I&apos;m Betsy!</h1>
        <p className="text-lg text-center text-[#444] dark:text-[#d1d5db] mb-8">What can I help you with?</p>
        <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {actions.map((action) => (
            <button
              key={action.value}
              className={`rounded-xl px-6 py-6 font-bold text-lg shadow transition-colors duration-200 focus:outline-none ${action.color}`}
              onClick={() => alert(`You selected: ${action.label}`)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="w-full max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 py-8 px-4">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#1a73e8] dark:text-[#60a5fa]">$100B</div>
          <div className="text-[#444] dark:text-[#d1d5db] text-sm">home loans funded entirely online</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#1a73e8] dark:text-[#60a5fa]">400K</div>
          <div className="text-[#444] dark:text-[#d1d5db] text-sm">Customers who chose a Better Mortgage</div>
        </div>
      </section>

      {/* Unlock Section */}
      <section className="w-full max-w-xl mx-auto py-8 px-4">
        <h2 className="text-xl font-bold text-center text-[#171717] dark:text-white mb-4">After a few questions, you&apos;ll unlock:</h2>
        <ul className="list-disc list-inside text-[#444] dark:text-[#d1d5db] text-lg space-y-2">
          <li>Custom mortgage rates</li>
          <li>Exclusive offers</li>
          <li>A personalized dashboard</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[#888] dark:text-[#bbb] bg-white dark:bg-[#222] border-t mt-16 transition-colors duration-300">
        © 2025 Better Home & Finance Holding Company. NMLS #330511
      </footer>
    </main>
  );
} 